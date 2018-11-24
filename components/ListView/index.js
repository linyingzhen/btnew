/**
 * const prefixCls = 'style-111195';
 * const images = '/static/images/components/ListView';
 * ListView 长列表
 * @Version 1.1 180823 加入下拉刷新
 * @Doc: https://mobile.ant.design/components/list-view-cn/
 * @Author: czy0729
 * @Date: 2018-06-21 21:37:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 11:45:00
 * @Path m.benting.com.cn /components/ListView/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PullToRefresh from 'pulltorefreshjs';
import { Flex, ListView } from 'antd-mobile';
import Const from '@const';
import Styles from '@styles';
import Empty from '../Empty';
import Icon from '../Icon';

const prefixCls = 'c-list-view';

class _ListView extends React.Component {
  static propsTypes = {
    hideFooter: PropTypes.bool,
    data: PropTypes.object,
    section: PropTypes.array,
    refresh: PropTypes.bool,
    scrollTop: PropTypes.Number,
    renderEmpty: PropTypes.any,
    onEndReached: PropTypes.func,
    onUnmount: PropTypes.func
  };

  static defaultProps = {
    hideFooter: false,
    data: Const.__EMPTY__,
    section: [],
    refresh: false,
    scrollTop: 0,
    renderEmpty: <Empty />,
    onEndReached: Function.prototype,
    onUnmount: Function.prototype // scrollTop => {}
  };

  hasInitPullToRefresh = false;

  constructor(props) {
    super(props);

    const { data, section } = props;

    // 构造有section的dataSource
    if (section.length) {
      this.getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
      this.getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
      this.dataSource = new ListView.DataSource({
        getRowData: this.getRowData,
        getSectionHeaderData: this.getSectionHeaderData,
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.createDS = (data, section) => {
        const dataBlob = {};
        const sectionIDs = [];
        const rowIDs = [];

        section.forEach((item, index) => {
          sectionIDs.push(item.title);
          dataBlob[item.title] = item.title;
          rowIDs[index] = [];
        });

        data.forEach((item, index) => {
          dataBlob[index] = item;

          section.forEach((i, idx) => {
            if (i.filter(item)) {
              rowIDs[idx].push(index);
              return false;
            }
            return true;
          });
        });

        return this.dataSource.cloneWithRowsAndSections(
          dataBlob,
          sectionIDs,
          rowIDs
        );
      };

      // 没有section，构造普通dataSource
    } else {
      this.dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      });
      this.createDS = data => this.dataSource.cloneWithRows(data);
    }

    this.state = {
      dataSource: section.length
        ? this.createDS(data.list.slice(), section)
        : this.createDS(data.list.slice()),

      hasMore: data.pageinfo.pagetotal > data.pageinfo.page, // 数据是否还有更多
      isLoading: false // 数据是否请求中
    };
  }

  componentDidMount() {
    const { refresh, scrollTop } = this.props;

    // 当props存在scrollTop，就设置初始滚动高度
    if (scrollTop) {
      this.ref.refs.listview.scrollTo(0, scrollTop);
    }

    if (refresh) {
      this.initPullToRefresh();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('data' in nextProps) {
      const { data, section } = nextProps;

      this.setState({
        dataSource: section.length
          ? this.createDS(data.list.slice(), section)
          : this.createDS(data.list.slice()),

        hasMore: data.pageinfo.pagetotal > data.pageinfo.page,
        isLoading: false
      });
    }
  }

  componentDidUpdate() {
    const { refresh } = this.props;

    if (refresh) {
      this.initPullToRefresh();
    }
  }

  componentWillUnmount() {
    const { refresh, onUnmount } = this.props;

    onUnmount(
      Math.floor(document.documentElement.scrollTop || document.body.scrollTop)
    );

    if (refresh) {
      PullToRefresh.destroyAll();
    }
  }

  onEndReached = () => {
    const { onEndReached } = this.props;
    const { hasMore, isLoading } = this.state;

    if (!hasMore || isLoading) {
      return;
    }

    this.setState(
      {
        isLoading: true
      },
      () => onEndReached()
    );
  };

  getSectionData;
  getRowData;

  initPullToRefresh = () => {
    if (!Const.__CLIENT__) {
      return;
    }

    const { refresh, onEndReached } = this.props;

    if (
      refresh &&
      !this.hasInitPullToRefresh &&
      document.querySelector(`.${prefixCls}_refresh`)
    ) {
      PullToRefresh.init({
        mainElement: `.${prefixCls}_refresh`,
        distThreshold: 80,
        distReload: 80,
        distMax: 120,
        passive: true,
        instructionsPullToRefresh: '下拉刷新',
        instructionsReleaseToRefresh: '释放立即刷新',
        instructionsRefreshing: '正在刷新',
        onRefresh: () => onEndReached(true)
      });

      this.hasInitPullToRefresh = true;
    }
  };

  dataSource;
  createDS;
  ref;

  renderFooter() {
    const { hasMore, isLoading } = this.state;

    let text = '往下加载更多';
    if (isLoading) {
      text = '内容加载中';
    } else if (!hasMore) {
      text = '已经没有更多内容啦';
    }

    return (
      <Flex className={`${prefixCls}__footer`} justify="center">
        <Icon
          className={classNames('t-24 t-sub', {
            'tool-animate-rotate': hasMore
          })}
          type={hasMore ? 'refresh' : 'smile'}
        />
        <span className="t-24 t-sub ml-xs">{text}</span>
      </Flex>
    );
  }

  renderListView() {
    const {
      hideFooter,
      data,
      section,
      refresh,
      renderBodyComponent,
      renderRow,
      renderSectionHeader
    } = this.props;
    const { dataSource } = this.state;

    // 170527 对ListView首次渲染表现进行优化
    // 假如初始数据少于8条，initialListSize和pageSize都为8
    let initialListSize;
    let pageSize;
    if (data.list.slice().length < Const.__LIMIT__ + 1 && !data._hasMore) {
      initialListSize = Const.__LIMIT__;
      pageSize = Const.__LIMIT__;
    } else {
      // 假如初始数据等于或多于8条，initialListSize应比pageSize小，不然会导致无限调用onEndReached
      initialListSize = data.list.slice().length - 1;
      pageSize = data.list.slice().length;
    }

    return (
      <React.Fragment>
        <ListView
          ref={ref => (this.ref = ref)}
          className={classNames({
            [`${prefixCls}_refresh`]: refresh,
            [`${prefixCls}_hide-footer`]: hideFooter,
            [`${prefixCls}_section`]: !!section.length
          })}
          dataSource={dataSource}
          initialListSize={initialListSize}
          pageSize={pageSize}
          scrollEventThrottle={50}
          scrollRenderAheadDistance={0}
          useBodyScroll
          renderBodyComponent={renderBodyComponent}
          renderFooter={() => this.renderFooter()}
          renderRow={renderRow}
          renderSectionHeader={section.length ? renderSectionHeader : undefined}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={200}
        />

        <style jsx global>{`
          .c-list-view {
          }
          .${prefixCls} .am-list-view-scrollview-content {
            width: 100vw;
          }
          .${prefixCls} .am-list-footer {
            padding: 0;
          }
          .${prefixCls} .am-refresh-control-ptr {
            transform: translateY(-40%);
          }
          .${prefixCls}__footer {
            padding: ${Styles.md} 0 0;
            text-align: center;
            font-size: ${Styles.font_xs};
            color: ${Styles.color_sub};
          }
          .${prefixCls}__footer.${prefixCls}__footer_refresh {
            margin-bottom: 1.4rem;
          }
          .${prefixCls}_hide-footer .c-list-view__footer {
            display: none;
          }
          .${prefixCls} .am-list-item:last-child .am-list-line {
            border-bottom: 0 !important;
          }

          /* has section */
          .${prefixCls}_section .am-list-body {
            background: transparent;
          }
          .${prefixCls}_section .list-view-section-body:not(:last-child) {
            margin-bottom: ${Styles.distance};
          }
          .${prefixCls}_section
            .list-view-section-body
            .am-list-item:last-child
            .am-list-line:after {
            display: none;
          }

          /* pull-to-refresh */
          .ptr--ptr {
            font-size: 0.24rem !important;
            font-weight: initial !important;
            color: ${Styles.color_sub} !important;
            box-shadow: initial !important;
          }
        `}</style>
      </React.Fragment>
    );
  }

  render() {
    const { data, renderEmpty, className } = this.props;

    let el;
    if (data.list.length === 0) {
      if (Const.__CLIENT__) {
        if (data._loaded) {
          el = renderEmpty;
        } else {
          el = <Empty>数据加载中...</Empty>;
        }
      } else {
        el = null;
      }
    } else {
      el = this.renderListView();
    }

    return <div className={classNames(prefixCls, className)}>{el}</div>;
  }
}

const More = ({ onClick = Function.prototype }) => (
  <Flex
    className={`${prefixCls}__list-view-more`}
    justify="center"
    onClick={onClick}
  >
    <Icon className="t-24 t-sub" type="refresh" />
    <span className="t-24 t-sub ml-xs">点击加载更多</span>

    <style jsx global>{`
      .c-list-view {
      }
      .${prefixCls}__list-view-more {
        padding: 0.32rem 0;
        background: ${Styles.color_bg};
      }
    `}</style>
  </Flex>
);

_ListView.More = More;

export default _ListView;
