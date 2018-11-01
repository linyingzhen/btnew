/**
 * const prefixCls = 'style-807782';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-02 10:00:49
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-08-18 14:33:37
 * @Path m.benting.com.cn /src/index/Sign/_Main.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Styles from '@styles';
import Progress from './_Progress';

const prefixCls = 'style-807782';
const MainComponent = props => {
  const { className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="wrap">
        <Progress />
        <style jsx global>{`
          .style-807782 {
            padding: 0 ${Styles.wind} 1.35rem ${Styles.wind};
            background: ${Styles.color_desc};
          }
        `}</style>
      </div>
    </div>
  );
};

MainComponent.contextTypes = {
  $: PropTypes.object
};

export default observer(MainComponent);
