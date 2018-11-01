/**
 * const prefixCls = 'style-114020';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-18 09:16:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-30 09:51:32
 * @Path m.benting.com.cn /src/bbs/Article/_BaiduCambrian.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { observer } from '@';
import Const from '@const';
import Utils from '@utils';

const _BaiduCambrian = (props, { $ }) => {
  const { id } = $.params.params;
  const { json, title, createTime } = $.getState('detail');

  let cambrianConfig = {};
  let _images;
  const _title = `${title}-本汀`;

  // 请在此处添加希望在搜索结果中展示图片的url，可以添加0个、1个或3个url
  _images = json ? Utils.getRealDraftEntityMap(JSON.parse(json)) : [];
  if (_images.length > 3) {
    _images.length = 3;
  } else if (_images.length === 2) {
    _images.length = 1;
  }
  _images = _images.map(item => Utils.getAppImgUrl(item, 'scale'));

  cambrianConfig = {
    '@context': 'https://ziyuan.baidu.com/contexts/cambrian.jsonld',
    '@id': `${Const.__WEB__}/bbs/article/${id}`,
    appid: '1588542739025543',
    title: _title,
    images: _images,
    pubDate: `${Utils.date('Y-m-d', createTime)}T${Utils.date(
      'H:i:s',
      createTime
    )}`
  };

  return (
    <Head>
      <title>{_title}</title>
      <link rel="canonical" href={`${Const.__WEB__}/bbs/article/${id}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cambrianConfig)
        }}
      />
    </Head>
  );
};

_BaiduCambrian.contextTypes = {
  $: PropTypes.object
};

export default observer(_BaiduCambrian);
