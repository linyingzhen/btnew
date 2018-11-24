/**
 * const prefixCls = 'style-867590';
 * const images = '/static/images/src/event/car/Index';
 * @Author: czy0729
 * @Date: 2018-11-06 15:27:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-09 18:39:53
 * @Path bt_mb_new /src/event/car/Index/_Content.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import RichEditor from '@components/RichEditor';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-867590';

const _Content = (props, { $ }) => {
  const { className } = props;
  const { json, title, content } = $.getState('detail');

  if (json) {
    // 自定义微信分享内容
    let imgUrl;
    if (Const.__WX__) {
      let draftData = [];

      try {
        if (json) {
          draftData = Utils.getRealDraftEntityMap(JSON.parse(json), true);
        }
      } catch (ex) {
        const { id } = $.params.params;
        console.error(`[JSON.parse Draft data error.][threadId: ${id}]`);
      }

      imgUrl = draftData.length ? draftData[0] : Const.__SHARE_IMG__;
      setTimeout(() => {
        Utils.wxShareUpdate({
          title,
          desc: Utils.getCharFilterEmoji(Utils.removeHTMLTag(content)),
          imgUrl: Utils.getAppImgUrl(imgUrl)
        });
      }, 1000);
    }
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <div
        className="user-select"
        style={{
          minHeight: '64vw'
        }}
      >
        {json && (
          <RichEditor
            className="t-34 l-48 t-title"
            data={json}
            readOnly
            imgView
          />
        )}
      </div>

      <style jsx>{`
        .style-867590 {
          position: relative;
          padding: 0.4rem ${Styles.wind} 0.32rem;
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Content.contextTypes = {
  $: PropTypes.object
};

export default observer(_Content);
