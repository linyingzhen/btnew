/**
 * const prefixCls = 'style-103278';
 * const images = '/static/images/src/_/Layout';
 * @Author: czy0729
 * @Date: 2018-06-20 17:24:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 15:30:12
 * @Path m.benting.com.cn \src\_\Layout\_Mask.js
 */
import React from 'react';
import { observer } from '@';
import { Flex } from '@components';
import Animate from '@components/Animate/Wrap';
import Styles from '@styles';
import UI from '@stores/ui';

const prefixCls = 'style-103278';

const _Mask = () => {
  const { show, children, ...other } = UI.getState('mask');

  if (!show) {
    return null;
  }

  delete other._loaded;

  return (
    <>
      <Animate type="fade">
        {show && (
          <Flex
            className={`${prefixCls} am-modal-mask`}
            justify="center"
            {...other}
          >
            {children}
          </Flex>
        )}
      </Animate>

      <style jsx global>{`
        .style-103278 {
          ${Styles._full};
          position: fixed;
          z-index: ${Styles.z_mask};
        }
      `}</style>
    </>
  );
};

export default observer(_Mask);
