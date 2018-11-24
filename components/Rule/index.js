/**
 * const prefixCls = 'style-436644';
 * const images = '/static/images/components/Rule';
 * @Author: czy0729
 * @Date: 2018-08-09 16:16:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 11:58:51
 * @Path m.benting.com.cn /components/Rule/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@components';
import Animate from '../Animate';
import Icon from '../Icon';
import Styles from '@styles';

const prefixCls = 'c-rule';

export default class Rule extends React.Component {
  static propsTypes = {
    title: PropTypes.string,
    content: PropTypes.array,
    showNum: PropTypes.bool,
    showEnd: PropTypes.bool,
    check: PropTypes.bool,
    onClose: PropTypes.func
  };

  static defaultProps = {
    title: '详细规则',
    content: [],
    showNum: false,
    showEnd: false,
    check: true,
    onClose: Function.prototype
  };

  componentWillUnmount() {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  }

  render() {
    const {
      show,
      title,
      content,
      showNum,
      showEnd,
      check,
      onClose
    } = this.props;

    return (
      <Animate type="bottom">
        {show && (
          <div className={prefixCls}>
            <div className="t-48 l-66 t-c t-b ls-1 mt-80">{title}</div>
            <div className="wrap-rule mt-64">
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
                    <div key={index} className="t-34 l-48 mt-16">
                      {_item}
                    </div>
                  );
                }

                return (
                  <Flex
                    /* eslint-disable-next-line */
                    key={index}
                    className="t-34 l-48 mt-16"
                    align="start"
                  >
                    <span className="num">{index + 1}.</span>
                    <Flex.Item className="ml-sm">{_item}</Flex.Item>
                  </Flex>
                );
              })}
            </div>
            <Icon
              className={`${prefixCls}__icon-close t-32 t-title`}
              type="cross"
              onClick={onClose}
            />

            <style jsx global>{`
              .c-rule {
                ${Styles._full};
                position: fixed !important;
                z-index: ${Styles.z_rule};
                background: ${Styles.color_theme};
                overflow: hidden;
              }
              .${prefixCls}__icon-close {
                position: absolute;
                bottom: 1.2rem;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            `}</style>
            <style jsx>{`
              .c-rule {
              }
              .wrap-rule {
                position: absolute;
                top: 1.12rem;
                right: 0.8rem;
                bottom: 2.4rem;
                left: 0.8rem;
                overflow-y: scroll;
                overflow-x: hidden;
                transform: translateZ(0);
              }
              .num {
                min-width: 0.4rem;
              }
            `}</style>
          </div>
        )}
      </Animate>
    );
  }
}
