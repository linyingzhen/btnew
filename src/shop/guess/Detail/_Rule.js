/**
 * const prefixCls = 'style-124195';
 * const images = '/static/images/src/shop/guess/Detail';
 * @Author: czy0729
 * @Date: 2018-09-25 18:19:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-26 18:13:14
 * @Path m.benting.com.cn /src/shop/guess/Detail/_Rule.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Rule } from '@_';

const prefixCls = 'style-124195';

const _Rule = (props, { $ }) => {
  const { className } = props;
  const { rules = '', panUrl, key } = $.getState('detail');
  const content = rules.split('\n');

  return (
    <Rule
      className={classNames(prefixCls, className)}
      title="规则"
      showNum
      content={
        panUrl
          ? [
            ...content,
            <div>
              <p className="t-28">鱼获重量压缩包已上传至百度，链接：</p>
              <a
                className="t-28 t-primary"
                href={panUrl}
                style={{
                  textDecoration: 'underline'
                }}
              >
                {panUrl}
              </a>
              <p className="t-28">
                <span>解压密码：</span>
                <span className="user-select">
                  {key || '猜渔结束后将自动显示解压密码'}
                </span>
              </p>
            </div>
          ]
          : content
      }
    />
  );
};

_Rule.contextTypes = {
  $: PropTypes.object
};

export default observer(_Rule);
