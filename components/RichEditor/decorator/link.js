/**
 * const prefixCls = 'style-146076';
 * const images = '/static/images/components/RichEditor/decorator';
 * @Author: czy0729
 * @Date: 2018-07-11 23:03:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 11:30:35
 * @Path m.benting.com.cn /components/RichEditor/decorator/link.js
 */
import React from 'react';
import Const from '@const';
import Styles from '@styles';

const prefixCls = 'style-146076';

const Link = props => {
  const { offsetKey, entityKey, contentState } = props;
  const { link, tag } = contentState.getEntity(entityKey).getData();

  const _link = String(link)
    .replace(Const.__WEB_BT__, Const.__WEB__)
    .replace(Const.__WEB_NIDO__, Const.__WEB__);

  return (
    <a
      className={prefixCls}
      data-offset-key={offsetKey}
      href={_link}
      rel="noopener noreferrer"
      // target="_blank"
    >
      {tag}

      <style jsx global>{`
        .style-146076 {
          position: relative;
          color: ${Styles.color_primary};
          text-decoration: underline;
          word-wrap: break-word;
        }
      `}</style>
    </a>
  );
};

export default {
  strategy: (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();

      // return entityKey !== null && Entity.get(entityKey).getType() === 'link';
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'link'
      );
    }, callback);
  },
  component: Link
};
