/**
 * const prefixCls = 'style-210512';
 * const images = '/static/images/src/school/_/Articleitem';
 * @Author: czy0729
 * @Date: 2018-09-07 15:35:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 16:34:19
 * @Path m.benting.com.cn /src/school/_/Articleitem/index.js
 */
import React from 'react';
import { observer } from '@';
import { List, Flex, Img } from '@components';
import Utils from '@utils';

const prefixCls = 'style-210512';

const Articleitem = props => {
  const { threadId, title, viewNum, likeAdd, contentImg = [] } = props;

  return (
    <List.Item
      className={prefixCls}
      href={`/bbs/article?id=${threadId}`}
      as={`/bbs/article/${threadId}`}
    >
      <Flex align="start">
        <Flex.Item>
          <p className="t-30 l-42 t-c2 mt-8">{title}</p>
          <p className="t-24 l-34 t-sub mt-8">
            浏览
            {viewNum} / 点赞
            {likeAdd}
          </p>
        </Flex.Item>
        {!!contentImg.length && (
          <Img
            src={Utils.getAppImgUrl(contentImg[0])}
            size="1.4rem"
            style={{ borderRadius: '0.04rem' }}
          />
        )}
      </Flex>
    </List.Item>
  );
};

export default observer(Articleitem);
