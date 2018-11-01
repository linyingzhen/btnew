/**
 * const prefixCls = 'style-992587';
 * const images = '/static/images/components/Page';
 * @Author: czy0729
 * @Date: 2018-06-20 17:06:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-06-20 17:07:19
 * @Path m.benting.com.cn \components\Page\index.js
 */
import React from 'react';
import classNames from 'classnames';

const prefixCls = 'c-page';

const Page = ({ className, children, ...other }) => (
  <div className={classNames(prefixCls, className)} {...other}>
    {children}

    <style jsx global>{`
      .c-page {
        position: relative;
        min-height: 90vh;
        padding-bottom: 1.6rem;
        overflow: hidden;
      }
    `}</style>
  </div>
);

export default Page;
