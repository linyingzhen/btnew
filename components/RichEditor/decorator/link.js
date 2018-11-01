/**
 * const prefixCls = 'style-146076';
 * const images = '/static/images/components/RichEditor/decorator';
 * @Author: czy0729
 * @Date: 2018-07-11 23:03:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-17 14:52:02
 * @Path m.benting.com.cn /components/RichEditor/decorator/link.js
 */
import React from 'react';
import Styles from '@styles';

const prefixCls = 'style-146076';

const Link = props => {
  const { offsetKey, entityKey, contentState } = props;
  const { link, tag } = contentState.getEntity(entityKey).getData();

  return (
    <a
      className={prefixCls}
      data-offset-key={offsetKey}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
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
