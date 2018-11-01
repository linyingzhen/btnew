/**
 * const prefixCls = 'style-331385';
 * const images = '/static/images/src/event/cashback/Index';
 * @Author: czy0729
 * @Date: 2018-10-15 16:32:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-15 16:32:50
 * @Path m.benting.com.cn /src/event/cashback/Index/_Content.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-331385';

const _Content = (props, { $ }) => {
  const { className } = props;
  const { rules = '' } = $.getState('eventDetail');

  return (
    <div className={classNames(prefixCls, className)}>
      <img className="img-rule" src={`${images}/rule.png`} alt="" />
      {rules &&
        rules.split('\n').map((item, index) => (
          /* eslint-disable-next-line */
          <Flex key={index} className="mt-sm" align="start">
            <span className="p-label t-32 l-64 t-danger t-c t-b">
              {index + 1}
            </span>
            <Flex.Item>
              <p className="p-line t-30 t-void mt-xs">
                {Utils.stringSplitToArray(
                  item,
                  /\[b\]([\s\S]+?)\[\/b\]/g,
                  /(\[b\])|(\[\/b\])/g,
                  't-event t-b'
                )}
              </p>
            </Flex.Item>
          </Flex>
        ))}

      <style jsx>{`
        .style-331385 {
          position: relative;
          padding: 1rem ${Styles.wind} 0;
          margin-top: 8%;
        }
        .img-rule {
          position: absolute;
          left: 0;
          top: 0;
          width: 2.68rem;
          height: 0.88rem;
        }
        .p-label {
          width: 0.64rem;
          height: 0.64rem;
          background-image: url('${images}/count.png');
          ${Styles._bg};
          border-radius: 50%;
        }
        .p-line {
          letter-spacing: 0.01rem;
          text-shadow: 0 0.04rem 0.04rem rgba(0, 0, 0, 0.16);
        }
      `}</style>
    </div>
  );
};

_Content.contextTypes = {
  $: PropTypes.object
};

export default observer(_Content);
