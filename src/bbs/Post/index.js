/**
 * const prefixCls = 'style-166780';
 * const images = '/static/images/src/bbs/Post';
 * @Author: czy0729
 * @Date: 2018-07-22 23:40:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-23 10:11:25
 * @Path m.benting.com.cn /src/bbs/Post/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { RichEditor } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import store from './store';

@injectV2(store)
@observer
export default class Post extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    if (Const.__SERVER__) {
      return null;
    }

    const { $ } = this.context;
    const { id } = $.params.params;
    const qiniuFileKey = $.getState('qiniuFileKey');
    const { title, json } = $.getState('post');

    if (id && !json) {
      return null;
    }

    return (
      <Layout title="发帖" hide theme="fullTheme">
        <RichEditor
          title={title}
          data={json || undefined}
          placeholder="请在这里输入内容"
          qiniu
          qiniuFileKey={qiniuFileKey}
          onQiniuUploadClick={$.fetch.qiniuKey}
          onOk={(title, editorState, html) => {
            if (!title) {
              Utils.light('请先输入贴子标题');
              return;
            }

            if (Utils.getCharLength(html) < 20) {
              Utils.light('贴子字数不能少于20');
              return;
            }

            const json = JSON.stringify(editorState);
            const entities = Utils.getRealDraftEntityMap(editorState, true);

            if (id) {
              $.do.update(title, json, html, entities);
            } else {
              $.do.submit(title, json, html, entities);
            }
          }}
        />
      </Layout>
    );
  }
}
