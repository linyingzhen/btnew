/**
 * const prefixCls = 'style-147998';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 23:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 17:11:29
 * @Path m.benting.com.cn /components/RichEditor/_Editor.js
 */
import React from 'react';
import classNames from 'classnames';
import { EditorState, Editor, SelectionState, RichUtils } from 'draft-js';
import Utils from '@utils';
import Styles from '@styles';
import ImgView from '../ImgView';
import Media from './_Media';
import MediaEditable from './_MediaEditable';
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

  deleteMedia = block => {
    const { editorState, onChange } = this.props;

    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const keyAfter =
      content.getKeyAfter(block.key) || content.getKeyBefore(block.key);
    const blockMap = content.getBlockMap().delete(block.key);
    const withoutAtomicBlock = content.merge({
      blockMap,
      selectionAfter: selection
    });
    const newState = EditorState.push(
      editorState,
      withoutAtomicBlock,
      'remove-range'
    );
    const newSelection = new SelectionState({
      anchorKey: keyAfter,
      anchorOffset: 0,
      focusKey: keyAfter,
      focusOffset: block.getLength()
    });
    const newEditorState = EditorState.forceSelection(newState, newSelection);

    if (newEditorState) {
      onChange(newEditorState);
    }
  };

  addLine = () => {
    const { editorState, onChange } = this.props;

    const newEditorState = RichUtils.insertSoftNewline(
      EditorState.moveSelectionToEnd(editorState)
    );
    onChange(newEditorState);
  };

  ref;

  renderMediaBlock(block, that) {
    if (block.getType() === 'atomic') {
      const { readOnly, imgView } = that.props;

      let component;
      if (readOnly) {
        if (imgView) {
          component = props => <Media {...props} onClick={that.showImgView} />;
        } else {
          component = Media;
        }
      } else {
        component = props => (
          <MediaEditable {...props} onDelete={that.deleteMedia} />
        );
      }

      return {
        component,
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
          ref={ref => (this.ref = ref)}
          placeholder="输入内容"
          editorState={editorState}
          readOnly={readOnly}
          customStyleMap={colorStyleMap}
          spellCheck={false}
          blockRendererFn={block => this.renderMediaBlock(block, this)}
          {...other}
        />
        {/* {!readOnly && (
          <div className="t-r mt-sm">
            <BtnTool type="plus" onClick={this.addLine} />
          </div>
        )} */}
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
            min-height: 64vh;
            padding: 0.24rem ${Styles.wind} ${Styles.bottom};
            margin-bottom: 0.92rem;
            font-size: ${Styles.t_34};
            line-height: 0.48rem;
            word-wrap: break-word;
            background: ${Styles.color_theme};
          }
          .${prefixCls} figure {
            margin: 0.24rem 0 !important;
          }
          .${prefixCls}_hide-placeholder .public-DraftEditorPlaceholder-root {
            display: none;
          }
          .${prefixCls}_read-only {
            padding: 0;
            min-height: 0;
          }

          /* orgin draft.js style reset */
          .${prefixCls} .public-DraftStyleDefault-ol,
          .${prefixCls} .public-DraftStyleDefault-ul {
            margin: 0;
          }
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
