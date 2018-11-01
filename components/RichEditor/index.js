/**
 * const prefixCls = 'style-152768';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 18:30:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:14:18
 * @Path m.benting.com.cn /components/RichEditor/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Utils from '@utils';
import Styles from '@styles';
import Control from './_Control';
import Title from './_Title';
import Editor from './_Editor';
import ControlButtom from './_ControlButtom';
import decorator from './decorator';
import { toHTML } from './utils';

const prefixCls = 'c-rich-editor';
const localStorageKey = prefixCls;

export default class RichEditor extends React.Component {
  static propsTypes = {
    placeholder: PropTypes.string,
    imgView: PropTypes.bool,
    onOk: PropTypes.func
  };

  static defaultProps = {
    placeholder: '请输入您要发表的内容',
    imgView: false,
    onOk: Function.prototype
  };

  constructor(props) {
    super(props);

    this.state = {
      editorState: props.data
        ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.data)),
          decorator
        )
        : EditorState.createEmpty(decorator),
      title: props.title,
      // info: '当贴子有内容时，每60秒会自动保存一次',
      readOnly: !!props.readOnly,
      focused: false,
      advance: false
    };
  }

  componentDidMount() {
    const { readOnly } = this.state;

    if (!readOnly) {
      this.int = setInterval(this.doAutoSave, 60000);
    }
  }

  componentWillUnmount() {
    const { readOnly } = this.state;

    if (!readOnly) {
      this.doAutoSave();
      clearInterval(this.int);
    }
  }

  onToggleAdvance = () => {
    const { advance } = this.state;

    this.setState({
      advance: !advance
    });
    // Utils.light(`已切换至${advance ? '常用' : '高级'}版`);
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  doRecovery = obj => {
    this.setState({
      title: obj.title,
      editorState: EditorState.createWithContent(
        convertFromRaw(obj.content),
        decorator
      )
      // info: `已恢复到 ${Utils.date('m-d H:i', obj.date / 1000)}`
    });
  };

  doSubmit = () => {
    const { onOk } = this.props;
    const { editorState, title } = this.state;

    const content = editorState.getCurrentContent();
    onOk(title, convertToRaw(content), toHTML(editorState));
  };

  doAutoSave = () => {
    const { editorState, title } = this.state;
    const backupDS = Utils.lsGet(localStorageKey, []);
    const content = convertToRaw(editorState.getCurrentContent());

    // 编辑器内容比较少的时候，不自动保存
    if (JSON.stringify(content).length < 300) return false;

    const date = new Date().valueOf();
    backupDS.unshift({
      title,
      content,
      date
    });

    // 保存数不大于5个
    if (backupDS.length > 5) {
      backupDS.pop();
    }

    Utils.lsSet(localStorageKey, backupDS);
    // this.setState({
    //   info: `${Utils.date('m-d H:i', date / 1000)} 已自动保存`
    // });

    return true;
  };

  int; // 自动保存Interval

  render() {
    const {
      data,
      imgView,
      placeholder,
      qiniu,
      qiniuFileKey,
      onQiniuUploadClick,
      className
    } = this.props;
    const { editorState, title, focused, readOnly, advance } = this.state;

    // 抓取draft的图片entity
    let files = [];
    try {
      if (readOnly) {
        files = Utils.getRealDraftEntityMap(JSON.parse(data));
      }
    } catch (ex) {
      /* eslint-disable-next-line */
      console.log(ex);
    }

    return (
      <div>
        <div
          className={classNames(prefixCls, className, {
            [`${prefixCls}_read-only`]: !!readOnly,
            [`${prefixCls}_advance`]: advance
          })}
        >
          {!readOnly && (
            <Control
              advance={advance}
              editorState={editorState}
              focused={focused}
              qiniu={qiniu}
              qiniuFileKey={qiniuFileKey}
              onChange={this.onChange}
              onQiniuUploadClick={onQiniuUploadClick}
              onToggleAdvance={this.onToggleAdvance}
            />
          )}
          {!readOnly && (
            <Title value={title} onChange={title => this.setState({ title })} />
          )}
          <Editor
            editorState={editorState}
            files={files}
            imgView={imgView}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={this.onChange}
            onBlur={() => this.setState({ focused: false })}
            onFocus={() => this.setState({ focused: true })}
          />
          {!readOnly && (
            <ControlButtom
              advance={advance}
              editorState={editorState}
              localStorageKey={localStorageKey}
              title={title}
              onChange={this.onChange}
              onGetAutoSave={this.doRecovery}
              onOk={this.doSubmit}
            />
          )}
        </div>
        {/* !readOnly && <p className="t-24 l-36 t-sub">{info}</p> */}

        <style jsx global>{`
          /* draft-js reset */
          .DraftEditor-editorContainer,
          .DraftEditor-root,
          .public-DraftEditor-content {
            height: inherit;
            text-align: initial;
          }
          .public-DraftEditor-content[contenteditable='true'] {
            -webkit-user-modify: read-write-plaintext-only;
          }
          .DraftEditor-root {
            position: relative;
          }
          .DraftEditor-editorContainer {
            position: relative;
            z-index: 1;
            background-color: rgba(255, 255, 255, 0);
            border-left: 0.01rem solid transparent;
          }
          .public-DraftEditor-block {
            position: relative;
          }
          .DraftEditor-alignLeft .public-DraftStyleDefault-block {
            text-align: left;
          }
          .DraftEditor-alignLeft .public-DraftEditorPlaceholder-root {
            left: 0;
            text-align: left;
          }
          .DraftEditor-alignCenter .public-DraftStyleDefault-block {
            text-align: center;
          }
          .DraftEditor-alignCenter .public-DraftEditorPlaceholder-root {
            width: 100%;
            margin: 0 auto;
            text-align: center;
          }
          .DraftEditor-alignRight .public-DraftStyleDefault-block {
            text-align: right;
          }
          .DraftEditor-alignRight .public-DraftEditorPlaceholder-root {
            right: 0;
            text-align: right;
          }
          .public-DraftEditorPlaceholder-root {
            position: absolute;
            z-index: 1;
            color: ${Styles.color_sub};
          }
          .public-DraftEditorPlaceholder-hasFocus {
            color: ${Styles.color_sub};
          }
          .DraftEditorPlaceholder-hidden {
            display: none;
          }
          .public-DraftStyleDefault-block {
            position: relative;
            white-space: pre-wrap;
          }
          .public-DraftStyleDefault-ltr {
            direction: ltr;
            text-align: left;
          }
          .public-DraftStyleDefault-rtl {
            direction: rtl;
            text-align: right;
          }
          .public-DraftStyleDefault-listLTR {
            direction: ltr;
          }
          .public-DraftStyleDefault-listRTL {
            direction: rtl;
          }
          .public-DraftStyleDefault-ol,
          .public-DraftStyleDefault-ul {
            padding: 0;
            margin: 0.16rem 0;
          }
          .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
            margin-left: 0.75rem;
          }
          .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL {
            margin-right: 0.75rem;
          }
          .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR {
            margin-left: 1.5rem;
          }
          .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL {
            margin-right: 1.5rem;
          }
          .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR {
            margin-left: 2.25rem;
          }
          .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL {
            margin-right: 2.25rem;
          }
          .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR {
            margin-left: 3rem;
          }
          .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL {
            margin-right: 3rem;
          }
          .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR {
            margin-left: 3.75rem;
          }
          .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL {
            margin-right: 3.75rem;
          }
          .public-DraftStyleDefault-unorderedListItem {
            position: relative;
            list-style-type: square;
          }
          .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0 {
            list-style-type: disc;
          }
          .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1 {
            list-style-type: circle;
          }
          .public-DraftStyleDefault-orderedListItem {
            position: relative;
            list-style-type: none;
          }
          .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before {
            position: absolute;
            left: -0.36rem;
            width: 0.3rem;
            text-align: right;
          }
          .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before {
            position: absolute;
            right: -0.36rem;
            width: 0.3rem;
            text-align: left;
          }
          .public-DraftStyleDefault-orderedListItem:before {
            content: counter(ol0) '. ';
            counter-increment: ol0;
          }
          .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before {
            content: counter(ol1) '. ';
            counter-increment: ol1;
          }
          .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before {
            content: counter(ol2) '. ';
            counter-increment: ol2;
          }
          .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before {
            content: counter(ol3) '. ';
            counter-increment: ol3;
          }
          .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before {
            content: counter(ol4) '. ';
            counter-increment: ol4;
          }
          .public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset {
            counter-reset: ol0;
          }
          .public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset {
            counter-reset: ol1;
          }
          .public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset {
            counter-reset: ol2;
          }
          .public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset {
            counter-reset: ol3;
          }
          .public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset {
            counter-reset: ol4;
          }
        `}</style>
        <style jsx global>{`
          .c-rich-editor {
            padding-top: 1rem;
            font-size: ${Styles.t_32};
            color: ${Styles.color_title};
            border: ${Styles.border};
            background-color: ${Styles.color_theme};
          }
          .${prefixCls} * {
            -webkit-user-select: text;
          }
          .${prefixCls}_read-only {
            padding-top: 0;
            border: 0;
          }
          .${prefixCls}_read-only div[data-block]:first-child br,
          .${prefixCls}_read-only figure + div br {
            display: none;
          }
          .${prefixCls}_advance {
            padding-top: 1.68rem;
          }
          .${prefixCls} .am-flexbox {
            overflow: initial;
          }
        `}</style>
      </div>
    );
  }
}
