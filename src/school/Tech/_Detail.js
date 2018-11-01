/**
 * const prefixCls = 'style-115514';
 * const images = '/static/images/src/school/Tech';
 * @Author: czy0729
 * @Date: 2018-09-06 14:28:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 16:52:32
 * @Path m.benting.com.cn /src/school/Tech/_Detail.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex } from '@components';
import Styles from '@styles';
import { images } from '../Index/ds';

const prefixCls = 'style-115514';

const _Detail = (props, { $ }) => {
  const { tbId, name, explain, _loaded: dloaded } = $.getState('detail');
  const { list, pageinfo, _loaded: vloaded } = $.getState('video');

  const showDetail = dloaded && vloaded;

  return (
    <Flex
      className={prefixCls}
      direction="column"
      justify="center"
      style={{
        backgroundImage: tbId ? `url(${images}/${tbId}.png)` : undefined
      }}
    >
      {showDetail && (
        <>
          <p className="t-30 l-42 t-void mt-36">{name}</p>
          <p className="t-24 l-34 t-void mt-8">
            每季 - 期 / 观看{' '}
            {list.reduce((prev, cur) => parseInt(cur.viewCount) + prev, 0)} /{' '}
            {pageinfo.recordtotal} 个视频
          </p>
          {explain && <p className="t-24 l-34 t-void mt-8">{explain}</p>}
        </>
      )}

      <style jsx global>{`
        .style-115514 {
          height: 40vw;
          padding: 0.56rem 0.48rem;
          margin-top: -1rem;
          ${Styles._bg};
          background-color: ${Styles.color_main};
        }
      `}</style>
    </Flex>
  );
};

_Detail.contextTypes = {
  $: PropTypes.object
};

export default observer(_Detail);
