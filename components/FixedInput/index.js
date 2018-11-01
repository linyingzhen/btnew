/**
 * const prefixCls = 'style-791728';
 * const images = '/static/images/components/FixedInput';
 * @Author: czy0729
 * @Date: 2018-07-13 09:14:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 17:32:15
 * @Path m.benting.com.cn /components/FixedInput/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import G from '@stores/g';

const prefixCls = 'c-fixed-input';

const FixedInput = props => {
  const {
    placeholder = '跟楼主聊聊吧...',
    onInputClick,
    className,
    children
  } = props;
  const tk = G.getState('tk');

  let extra;
  if (tk) {
    if (children) {
      extra = <div className="ml-sm">{children}</div>;
    }
  }

  return (
    <Flex className={classNames(prefixCls, className)}>
      <Flex.Item>
        {tk ? (
          <p className="t-30 l-42 t-sub" onClick={onInputClick}>
            {placeholder}
          </p>
        ) : (
          <p className="t-30 l-42 t-sub">
            <span>登录跟楼主聊天，</span>
            <span
              className="t-primary"
              onClick={() => {
                G.setJump();
                Utils.router.replace('/login');
              }}
            >
              前往
            </span>
          </p>
        )}
      </Flex.Item>
      {extra}

      <style jsx global>{`
        .c-fixed-input {
          position: fixed;
          z-index: ${Styles.z_fixed_input};
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0.2rem ${Styles.wind};
          background: ${Styles.color_theme};
          border-top: ${Styles.border};
        }
      `}</style>
    </Flex>
  );
};

export default FixedInput;
