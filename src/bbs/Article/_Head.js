/**
 * const prefixCls = 'style-144680';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-11 17:40:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 15:14:39
 * @Path m.benting.com.cn /src/bbs/Article/_Head.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex } from '@components';
import { Author } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-144680';

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
    vip,
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
            vip={vip}
            date={createTime && Utils.date('y-m-d H:i:s', createTime)}
          />
        </Flex.Item>
        {/* <Button type="primary" ghost inline size="sm">
          关注
        </Button> */}
      </Flex>

      <style jsx>{`
        .style-144680 {
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
