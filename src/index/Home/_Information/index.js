/**
 * const prefixCls = 'style-204108';
 * const images = '/static/images/src/index/Home/_Information';
 * @Author: czy0729
 * @Date: 2018-08-02 13:41:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 16:09:47
 * @Path m.benting.com.cn /src/index/Home/_Information/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import { Header } from '@_';
import Row from './_Row';
import Styles from '@styles';

const prefixCls = 'style-204108';

const _Information = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('information');

  return (
    <React.Fragment>
      <div className={classNames(prefixCls, className)}>
        <Header title="本汀资讯" />
        <div className="p-w">
          <ListView
            data={data}
            hideFooter
            renderRow={item => <Row {...item} />}
          />
        </div>
      </div>
      <ListView.More onClick={$.fetch.information} />

      <style jsx>{`
        .style-204108 {
          min-height: 11.92rem;
          padding-bottom: ${Styles.bottom};
          background: ${Styles.color_theme};
        }
      `}</style>
    </React.Fragment>
  );
};

_Information.contextTypes = {
  $: PropTypes.object
};

export default observer(_Information);
