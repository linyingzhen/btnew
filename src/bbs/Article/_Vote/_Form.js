/* eslint-disable react/sort-comp */
/**
 * const prefixCls = 'style-305363';
 * const images = '/static/images/src/bbs/Article/_Vote';
 * @Author: czy0729
 * @Date: 2018-10-10 16:56:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-11 17:26:05
 * @Path m.benting.com.cn /src/bbs/Article/_Vote/_Form.js
 */
import React from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { observer } from '@';
import { Flex, Icon, Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { images, seriesDS, goodsDS } from '../ds';

const prefixCls = 'style-305363';
const limit = 10;

@observer
export default class _Form extends React.Component {
  state = {
    selected: [],
    fixed: false,
    active: seriesDS[0]
  };

  refRoot;
  refNav;
  refNavFixed;
  navTop = 0;
  navWidth = [0];
  navHeight = 0;
  tagHeight = [];

  componentDidMount() {
    this.refRoot.addEventListener('scroll', this.fixed);
  }

  componentWillUnmount() {
    this.refRoot.removeEventListener('scroll', this.fixed);
  }

  fixed = debounce(() => {
    const { fixed, active } = this.state;

    // 滚动高度超过了Nav
    if (this.refRoot.scrollTop > this.navTop + this.navHeight) {
      if (!fixed) {
        this.setState({
          fixed: true
        });
      }
    } else if (fixed) {
      this.setState({
        fixed: false
      });
    }

    const index = this.tagHeight.findIndex(
      item => item > this.refRoot.scrollTop + this.navHeight
    );

    let seriesIndex;
    switch (index) {
      case 0:
      case 1:
        seriesIndex = 0;
        break;

      case -1:
        seriesIndex = seriesDS.length - 1;
        break;

      default:
        seriesIndex = index - 1;
        break;
    }

    if (active !== seriesDS[seriesIndex]) {
      this.refNav.scrollLeft = this.navWidth[
        seriesIndex > 1 ? seriesIndex - 1 : 0
      ];

      if (this.refNavFixed) {
        this.refNavFixed.scrollLeft = this.navWidth[
          seriesIndex > 1 ? seriesIndex - 1 : 0
        ];
      }

      this.setState({
        active: seriesDS[seriesIndex]
      });
    }
  }, 80);

  scrollTo = (index, active) => {
    this.refRoot.scrollTop = this.tagHeight[index] - this.navHeight;

    this.setState({ active });
  };

  toggleSelect = ({ gid, title }) => {
    const { selected } = this.state;

    let _selected;
    const findIndex = selected.findIndex(item => item.gid === gid);
    if (findIndex === -1) {
      if (selected.length >= limit) {
        Utils.light(`最多选${limit}个产品`);
        return;
      }

      _selected = [
        ...selected,
        {
          gid,
          title
        }
      ];
    } else {
      _selected = [...selected];
      _selected.splice(findIndex, 1);
    }

    this.setState({
      selected: _selected
    });
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    const { selected } = this.state;

    if (selected.length !== limit) {
      Utils.light(`请选择${limit}个产品`);
      return;
    }

    Utils.onConfirm(
      `已选${selected.map(item => item.title).join('、')}，确认无误并提交？`,
      () => onSubmit(selected)
    );
  };

  render() {
    const { onHide } = this.props;
    const { selected, fixed, active } = this.state;

    return (
      <div>
        <div className={prefixCls} ref={ref => (this.refRoot = ref)}>
          <div className="header t-c">
            <Icon
              className={`${prefixCls}__icon-back t-32 l-44 t-void`}
              type="cross"
              onClick={onHide}
            />
            <span className="t-32 l-44 t-void">投票</span>
          </div>
          <div className="wrap-scroll">
            <div className="wrap-title">
              <p className="t-32 l-44 t-title t-c">
                请对你最心动的鱼竿进行投票
              </p>
              <p className="t-28 l-40 t-sub t-c mt-24">
                （可投
                {limit}
                票）
              </p>
            </div>
            <div className="wrap-nav-placeholder">
              <div
                className="wrap-nav"
                ref={ref => {
                  this.refNav = ref;

                  if (ref && !this.navHeight) {
                    this.navTop = ref.offsetTop;
                    this.navHeight = ref.clientHeight;
                  }
                }}
              >
                {goodsDS.map((item, index) => (
                  <span
                    key={item.label}
                    className={classNames('nav-item t-32 l-44', {
                      't-sub': active !== item.label,
                      't-theme t-b': active === item.label
                    })}
                    ref={ref => {
                      if (ref && this.navWidth.indexOf(ref.offsetLeft) === -1) {
                        this.navWidth.push(ref.offsetLeft);
                      }
                    }}
                    onClick={() => this.scrollTo(index, item.label)}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              {goodsDS.map(item => (
                <div
                  key={item.label}
                  className="wrap-series"
                  ref={ref => {
                    if (ref && this.tagHeight.indexOf(ref.offsetTop) === -1) {
                      this.tagHeight.push(ref.offsetTop);
                    }
                  }}
                >
                  <p className="t-c">
                    <span className="tag t-theme t-36 l-48 t-b">
                      {item.label}
                      系列
                    </span>
                  </p>
                  {item.child.map(i => (
                    <Flex
                      key={i.gid}
                      className="mt-32"
                      align="start"
                      onClick={() => this.toggleSelect(i)}
                    >
                      <img
                        className="img-check"
                        src={
                          selected.findIndex(({ gid }) => i.gid === gid) === -1
                            ? `${images}/check.png`
                            : `${images}/checked.png`
                        }
                        alt=""
                      />
                      <Flex.Item>
                        <p className="t-32 l-44">{i.title}</p>
                        {i.desc && (
                          <p className="t-26 l-44 t-sub mt-4">{i.desc}</p>
                        )}
                      </Flex.Item>
                      {i.minPrice === i.maxPrice ? (
                        <p className="t-sub ml-sm">
                          <span className="t-22 l-44">¥</span>
                          <span className="t-28 l-44">{i.minPrice}</span>
                        </p>
                      ) : (
                        <p className="t-sub ml-sm">
                          <span className="t-22 l-44">¥</span>
                          <span className="t-28 l-44">{i.minPrice}-</span>
                          <span className="t-22 l-44">¥</span>
                          <span className="t-28 l-44">{i.maxPrice}</span>
                        </p>
                      )}
                    </Flex>
                  ))}
                </div>
              ))}
              <p className="t-24 t-sub mt-32">
                本汀洪发山系列以及其他未罗列的作品主要为线下实体款，暂不在投票之列，谢谢！
              </p>
            </div>
          </div>
        </div>
        {fixed && (
          <div
            className="wrap-nav wrap-nav-fixed"
            ref={ref => (this.refNavFixed = ref)}
          >
            {goodsDS.map((item, index) => (
              <span
                key={item.label}
                className={classNames('nav-item t-32 l-44', {
                  't-sub': active !== item.label,
                  't-theme t-b': active === item.label
                })}
                onClick={() => this.scrollTo(index, item.label)}
              >
                {item.label}
              </span>
            ))}
          </div>
        )}
        <Button
          className={`${prefixCls}__btn`}
          type="danger"
          disabled={!selected.length}
          onClick={this.onSubmit}
        >
          <span>
            提交投票
            {!!selected.length &&
              `(已选
                ${selected.length}
                项)`}
          </span>
        </Button>
        <img src={`${images}/checked.png`} alt="" style={{ display: 'none' }} />

        <style jsx global>{`
          .style-305363 {
          }
          .${prefixCls}__icon-back {
            position: absolute;
            left: ${Styles.wind};
            top: 50%;
            transform: translateY(-50%);
          }
          .${prefixCls}__btn {
            position: fixed !important;
            z-index: 999;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateZ(0);
          }
        `}</style>
        <style jsx>{`
          .style-305363 {
            position: fixed !important;
            z-index: 998;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: ${Styles.color_bg};
            overflow-y: scroll;
            transform: translateZ(0);
          }
          .wrap-scroll {
            padding: 0.64rem ${Styles.wind} 1.6rem;
          }
          .wrap-title {
            padding-bottom: 0.24rem;
          }
          .wrap-nav-placeholder {
            min-height: 1.08rem;
          }
          .wrap-nav {
            padding: 0.32rem 0.4rem;
            background: #fff;
            border-radius: 0.12rem;
            box-shadow: 0 0.04rem 0.08rem 0 rgba(216, 219, 229, 1);
            overflow-x: scroll;
            overflow-y: hidden;
            white-space: nowrap;
          }
          .wrap-nav-fixed {
            position: fixed;
            z-index: 999;
            top: 0;
            left: ${Styles.wind};
            right: ${Styles.wind};
            transform: translateZ(0);
          }
          .wrap-series {
            padding: 0.32rem 0.16rem 0.56rem;
            border-bottom: 0.01rem solid ${Styles.color_border};
          }
          .wrap-series:last-child {
            border-bottom: 0;
          }

          .t-theme {
            color: #131768;
          }

          .header {
            position: relative;
            height: 0.96rem;
            line-height: 0.96rem;
            background: #0e1324;
          }
          .nav-item {
            display: inline-block;
            margin-right: 0.56rem;
          }
          .tag {
            position: relative;
            color: #131768;
          }
          .tag:before {
            content: '';
            position: absolute;
            z-index: -1;
            bottom: 0;
            left: 0;
            width: 1.44rem;
            height: 0.16rem;
            background: linear-gradient(90deg, #b1dcff, #80bbff);
            border-radius: 0.16rem;
          }
          .img-check {
            width: 0.56rem;
            height: 0.56rem;
            margin-top: -0.04rem;
          }
        `}</style>
      </div>
    );
  }
}
