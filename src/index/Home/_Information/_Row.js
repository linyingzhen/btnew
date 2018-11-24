/**
 * const prefixCls = 'style-444495';
 * const images = '/static/images/src/index/Home/_Information';
 * @Author: czy0729
 * @Date: 2018-08-02 13:43:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 20:59:33
 * @Path m.benting.com.cn /src/index/Home/_Information/_Row.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex } from '@components';
import { Date } from '@_';
import Utils from '@utils';

const prefixCls = 'style-444495';

// #todo 文章有两种形式，资讯比较官方，帖子比较社交。
// 若后台发布勾选了同步，点击会进入帖子，不同步，进入资讯。
// const isPost = postId > 0; // 是否帖子

const _Row = ({ postId, createTime, introCon }) => (
  <Flex
    className={prefixCls}
    href={`/bbs/article?id=${postId}`}
    as={`/bbs/article/${postId}`}
  >
    <Date time={createTime} />
    <Flex.Item>
      <p className="t-30 l-42 t-c1">{introCon}</p>
      <p className="t-24 l-34 mt-8">发布于 {Utils.date('H:i', createTime)}</p>
    </Flex.Item>

    <style jsx global>{`
      .style-444495:not(:last-child) {
        margin-bottom: 0.48rem;
      }
    `}</style>
  </Flex>
);

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
