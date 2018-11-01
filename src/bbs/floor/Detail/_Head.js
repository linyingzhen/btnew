/**
 * const prefixCls = 'style-192291';
 * const images = '/static/images/src/bbs/floor/Detail';
 * @Author: czy0729
 * @Date: 2018-09-04 17:29:18
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-09-04 17:29:18
 * @Path m.benting.com.cn /src/bbs/floor/Detail/_Head.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex } from '@components';
import { Author } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-192291';

const _Head = (props, { $ }) => {
  const { className } = props;
  const {
    title,
    registrationData,
    displayState,
    userId,
    faceImg,
    niname,
    grade,
    fanAuth,
    createTime
  } = $.getState('detail');

  let prefix;
  if (registrationData) {
    prefix = '活动';
  } else if (parseInt(displayState) > 0) {
    prefix = '置顶';
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <h4 className="t-40 l-56 t-b">
        {prefix && <span className="t-danger">{prefix} · </span>}
        <span>{title}</span>
      </h4>
      <Flex className="mt-40">
        <Flex.Item>
          <Author
            userId={userId}
            img={faceImg}
            name={niname}
            level={grade}
            fansAuth={fanAuth}
            date={createTime && Utils.date('y-m-d H:i:s', createTime)}
          />
        </Flex.Item>
      </Flex>

      <style jsx>{`
        .style-192291 {
          padding: 0.16rem ${Styles.wind} 0;
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Head.contextTypes = {
  $: PropTypes.object
};

export default observer(_Head);
