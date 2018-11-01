/**
 * const prefixCls = 'style-214608';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 18:42:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-11 18:44:42
 * @Path m.benting.com.cn /components/RichEditor/utils.js
 */
import { stateToHTML } from 'draft-js-export-html';
import Utils from '@utils';
import { colorStyleMap } from './config';

const htmlDecodeByRegExp = str => {
  let s = '';
  if (str.length == 0) return '';

  s = str.replace(/&amp;/g, '&');
  s = s.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');
  s = s.replace(/&nbsp;/g, ' ');

  /* eslint-disable-next-line */
  s = s.replace(/&#39;/g, "'");
  s = s.replace(/&quot;/g, '"');

  return s;
};

export const toHTML = editorState => {
  const contentState = editorState.getCurrentContent();

  const html = stateToHTML(contentState, {
    inlineStyles: {
      red: { style: { color: colorStyleMap.red.color } },
      yellow: { style: { color: colorStyleMap.yellow.color } },
      green: { style: { color: colorStyleMap.green.color } },
      blue: { style: { color: colorStyleMap.blue.color } },
      purple: { style: { color: colorStyleMap.purple.color } },
      gray: { style: { color: colorStyleMap.gray.color } }
    },
    blockRenderers: {
      atomic: block => {
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        const data = entity.getData();

        switch (type) {
          case 'link-image':
            return `<img data-src="${data.src}" src="${data.src}" />`;

          case 'image':
            return `<img data-src="${data.src}" src="${Utils.getAppImgUrl(
              data.src,
              'scale'
            )}" />`;

          case 'video':
            return `<video data-size="${data.size}" data-time="${
              data.playTime
            }" data-poster="${data.poster}" data-src="${
              data.src
            }" poster="${Utils.getImgUrl(data.poster)}" src="${Utils.getImgUrl(
              data.src
            )}" />`;

          default:
            break;
        }

        return false;
      }
    }
  });

  return htmlDecodeByRegExp(html);
};
