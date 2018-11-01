/**
 * const prefixCls = 'style-982717';
 * const images = '/static/images/src/person/help/Index';
 * @Author: Jun
 * @Date: 2018-07-30 16:46:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-10 16:08:19
 * @Path m.benting.com.cn /src/person/help/Index/__Advise.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Styles from '@styles';

const prefixCls = 'style-982717';

const _Advise = ({ className }) => (
  <Flex
    className={classNames(prefixCls, className)}
    align="start"
    href="/person/feedback"
    login
  >
    <Icon className="t-34 l-48 t-primary" type="comment-fill" />
    <Flex.Item>
      <p className="t-34 l-48 t-title t-b">反馈建议</p>
      <p className="t-24 l-34 t-sub mt-8">
        协助我们改善网站，将带给您更好的体验!
      </p>
    </Flex.Item>

    <style jsx global>{`
      .style-982717 {
        padding: ${Styles.wind};
        background: ${Styles.color_theme};
      }
    `}</style>
  </Flex>
);

export default observer(_Advise);
