/**
 * const prefixCls = 'style-147998';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 23:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:18:50
 * @Path m.benting.com.cn /components/RichEditor/_Editor.js
 */
import React from 'react';
import classNames from 'classnames';
import { Editor } from 'draft-js';
import Utils from '@utils';
import Styles from '@styles';
import ImgView from '../ImgView';
import Media from './_Media';
import { colorStyleMap } from './config';

const prefixCls = 'style-147998';

export default class _Editor extends React.Component {
  state = {
    show: false,
    current: 0
  };

  showImgView = src => {
    const { files } = this.props;
    const current = files.findIndex(item => item === src);

    this.setState({
      show: true,
      current
    });
  };

  renderMediaBlock(block) {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false
      };
    }
    return null;
  }

  renderHOCMediaBlock(block, that) {
    // ImgView HOC
    const ViewMedia = props => <Media {...props} onClick={that.showImgView} />;

    if (block.getType() === 'atomic') {
      return {
        component: ViewMedia,
        editable: false
      };
    }
    return null;
  }

  render() {
    const {
      editorState,
      readOnly,
      files = [],
      imgView,
      className,
      ...other
    } = this.props;
    const { show, current } = this.state;

    // 开始时使用非unstyled的元素时，要手动处理placeholder
    let hasContent = false;
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        hasContent = true;
      }
    }

    return (
      <div
        className={classNames(prefixCls, className, {
          [`${prefixCls}_hide-placeholder`]: hasContent,
          [`${prefixCls}_read-only`]: readOnly
        })}
      >
        <Editor
          placeholder="输入内容"
          editorState={editorState}
          readOnly={readOnly}
          blockRendererFn={
            imgView
              ? block => this.renderHOCMediaBlock(block, this)
              : this.renderMediaBlock
          }
          customStyleMap={colorStyleMap}
          spellCheck={false}
          {...other}
        />
        {imgView && (
          <ImgView
            show={show}
            current={current}
            data={files.map(item => {
              if (item.toString().indexOf('.gif') !== -1) {
                return Utils.getImgUrl(item);
              }

              return Utils.getAppImgUrl(item, 'scale');
            })}
            onClose={() => this.setState({ show: false })}
          />
        )}

        <style jsx global>{`
          .style-147998 {
            position: relative;
            min-height: 100vw;
            padding: ${Styles.space} ${Styles.wind} 1.2rem;
            font-size: ${Styles.t_32};
            word-wrap: break-word;
            background: ${Styles.color_theme};
          }
          .${prefixCls} figure {
            margin: ${Styles.sm} 0 !important;
          }
          .${prefixCls}_hide-placeholder .public-DraftEditorPlaceholder-root {
            display: none;
          }
          .${prefixCls}_read-only {
            padding: 0;
            min-height: 0;
            border: 0;
            line-height: 1.5;
          }
          .${prefixCls} .public-DraftStyleDefault-ol,
          .${prefixCls} .public-DraftStyleDefault-ul {
            margin: 0;
          }
          // ol
          .${prefixCls}
            .public-DraftStyleDefault-ol
            .public-DraftStyleDefault-orderedListItem {
            padding-left: 0.16rem;
            margin-left: 0.26rem;
          }
          .${prefixCls}
            .public-DraftStyleDefault-ol
            .public-DraftStyleDefault-orderedListItem:nth-of-type(1n + 10) {
            padding-left: 0.36rem;
          }
          .${prefixCls}
            .public-DraftStyleDefault-ol
            .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before {
            width: auto;
          }
          .${prefixCls}
            .public-DraftStyleDefault-ul
            .public-DraftStyleDefault-unorderedListItem {
            margin-left: 0.32rem;
          }
          .${prefixCls} .public-DraftEditorPlaceholder-inner {
            color: ${Styles.color_sub};
          }
        `}</style>
      </div>
    );
  }
}
