/**
 * const prefixCls = 'style-968236';
 * const images = '/static/images/src/_/Rule';
 * @Author: czy0729
 * @Date: 2018-09-23 22:30:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-23 22:37:52
 * @Path m.benting.com.cn /src/_/Rule/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex, Icon } from '@components';
import Styles from '@styles';
import Header from '../Header';

const prefixCls = 'style-968236';

export default class Rule extends React.Component {
  state = {
    expand: false
  };

  componentDidMount() {
    const { open = false } = this.props;
    if (open) {
      this.setState({
        expand: true
      });
    }
  }

  render() {
    const {
      title,
      content = [],
      showNum = false,
      showEnd = true,
      check = true,
      className
    } = this.props;
    const { expand } = this.state;

    return (
      <div className={classNames(prefixCls, className)}>
        <Header
          title={title}
          extra={
            <Icon
              className="t-40 l-48 t-main"
              type={expand ? 'up' : 'down'}
              onClick={() =>
                this.setState({
                  expand: !expand
                })
              }
            />
          }
          isList={expand}
        />
        {expand && (
          <div className="content user-select">
            {content.map((item, index) => {
              let _item = item;
              if (typeof _item === 'string') {
                // 过滤并矫正不合法的输入
                if (check) {
                  _item = _item
                    .replace(/ /g, '')
                    .replace(/,/g, '，')
                    .replace(/\./g, '。')
                    .replace(/\(/g, '（')
                    .replace(/\)/g, '）');
                }

                if (showEnd && _item[_item.length - 1] !== '。') {
                  _item = `${_item}。`;
                }
              }

              if (!showNum) {
                return (
                  /* eslint-disable-next-line */
                  <div key={index} className={`${prefixCls}__line t-sm`}>
                    {_item}
                  </div>
                );
              }

              return (
                <Flex
                  /* eslint-disable-next-line */
                  key={index}
                  className={`${prefixCls}__line t-sm`}
                  align="start"
                >
                  <span>{index + 1}.</span>
                  <Flex.Item className="ml-sm">{_item}</Flex.Item>
                </Flex>
              );
            })}
          </div>
        )}

        <style jsx global>{`
          .style-968236 {
          }
          .${prefixCls}__line {
            margin: 0.16rem 0;
          }
        `}</style>
        <style jsx>{`
          .style-968236 {
          }
          .content {
            padding: ${Styles.sm} ${Styles.wind};
            background: ${Styles.color_theme};
          }
        `}</style>
      </div>
    );
  }
}
