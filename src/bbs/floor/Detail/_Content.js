/**
 * const prefixCls = 'style-139999';
 * const images = '/static/images/src/bbs/floor/Detail';
 * @Author: czy0729
 * @Date: 2018-09-04 17:24:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 11:26:14
 * @Path m.benting.com.cn /src/bbs/floor/Detail/_Content.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { DiscuzContent, Lazy } from '@components';
import RichEditor from '@components/RichEditor';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import Score from './_Score';

const prefixCls = 'style-139999';

const _Content = (props, { $ }) => {
  const { className } = props;
  const { json, title, content, _loaded } = $.getState('detail');

  let elDraft;
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

    elDraft = (
      <RichEditor className="t-34 l-48 t-title" data={json} readOnly imgView />
    );
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <div
        className="user-select"
        style={{
          minHeight: _loaded ? '64vw' : '100vh'
        }}
      >
        {elDraft || (
          <DiscuzContent
            className="t-34 l-48 t-title"
            html={{ __html: content }}
            imgView
          />
        )}
      </div>
      {_loaded && (
        <Lazy onDidMount={$.fetch.lazy.score}>
          <Score className="mt-60" />
        </Lazy>
      )}

      <style jsx>{`
        .style-139999 {
          position: relative;
          padding: 0.4rem ${Styles.wind} ${Styles.bottom};
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
