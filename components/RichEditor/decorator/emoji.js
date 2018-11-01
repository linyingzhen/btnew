/**
 * const prefixCls = 'style-156136';
 * const images = '/static/images/components/RichEditor/decorator';
 * @Author: czy0729
 * @Date: 2018-07-11 23:01:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-07 11:20:36
 * @Path m.benting.com.cn /components/RichEditor/decorator/emoji.js
 */
import React from 'react';
import Const from '@const';
import Styles from '@styles';

const prefixCls = 'style-156136';

const Emoji = props => {
  const { offsetKey, entityKey, contentState } = props;
  const { value } = contentState.getEntity(entityKey).getData();

  let cls;
  let filename;
  if (value.indexOf('[') !== -1) {
    cls = `${prefixCls} ${prefixCls}_sm`;
    filename = value.replace('[', '').replace(']', '.png');
  } else if (value.indexOf('5_') !== -1) {
    cls = `${prefixCls} ${prefixCls}_sm`;
    filename = value.replace('{:', '').replace(':}', '.gif');
  } else {
    cls = `${prefixCls} ${prefixCls}_lg`;
    filename = value.replace('{:', '').replace(':}', '.gif');
  }

  return (
    <span
      className={cls}
      data-offset-key={offsetKey}
      style={{
        backgroundImage: `url(${Const.__EMOJI_PATH__}/${filename})`
      }}
    >
      {value}

      <style jsx global>{`
        .style-156136 {
          display: inline-block;
          width: 0;
          height: 0;
          margin-right: ${Styles.xs};
          vertical-align: bottom !important;
          color: transparent !important;
          overflow: hidden;
          pointer-events: none;
          ${Styles._bg};
        }
        .${prefixCls}_sm {
          padding: 0.24rem;
        }
        .${prefixCls}_lg {
          padding: 0.5rem;
        }
      `}</style>
    </span>
  );
};

export default {
  strategy: (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();

      // return entityKey !== null && Entity.get(entityKey).getType() === 'emoji';
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'emoji'
      );
    }, callback);
  },
  component: Emoji
};
