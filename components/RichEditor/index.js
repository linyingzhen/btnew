/**
 * const prefixCls = 'style-152768';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 18:30:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 14:13:45
 * @Path m.benting.com.cn /components/RichEditor/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Utils from '@utils';
import Styles from '@styles';
import ControlMini from './_ControlMini';
import Editor from './_Editor';
import Header from './_Header';
import Title from './_Title';
import decorator from './decorator';
import { toHTML } from './utils';
import { resetCSS } from './css';

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

    const { data, title } = props;
    const editorState = data
      ? EditorState.createWithContent(
        convertFromRaw(JSON.parse(data)),
        decorator
      )
      : EditorState.createEmpty(decorator);

    this.state = {
      editorState,
      title,
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
  };

  onChange = editorState => this.setState({ editorState });

  doRecovery = obj =>
    this.setState({
      title: obj.title,
      editorState: EditorState.createWithContent(
        convertFromRaw(obj.content),
        decorator
      )
    });

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
    if (JSON.stringify(content).length < 300) {
      return;
    }

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
      console.warn(ex);
    }

    return (
      <div>
        {!readOnly && (
          <Header
            editorState={editorState}
            title={title}
            onOk={this.doSubmit}
          />
        )}
        <div
          className={classNames(prefixCls, className, {
            [`${prefixCls}_editable`]: !readOnly,
            [`${prefixCls}_read-only`]: !!readOnly
          })}
        >
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
        </div>
        {!readOnly && (
          <ControlMini
            advance={advance}
            editorState={editorState}
            focused={focused}
            localStorageKey={localStorageKey}
            qiniu={qiniu}
            qiniuFileKey={qiniuFileKey}
            title={title}
            onChange={this.onChange}
            onGetAutoSave={this.doRecovery}
            onOk={this.doSubmit}
            onQiniuUploadClick={onQiniuUploadClick}
            onToggleAdvance={this.onToggleAdvance}
          />
        )}

        <style jsx global>
          {resetCSS}
        </style>
        <style jsx global>{`
          .c-rich-editor {
            padding-top: 0.16rem;
            font-size: ${Styles.t_34};
            line-height: 0.48rem;
            color: ${Styles.color_title};
            background-color: ${Styles.color_theme};
            -webkit-user-select: text;
          }
          .${prefixCls} * {
            -webkit-user-select: text;
          }
          .${prefixCls}_read-only {
            padding-top: 0;
          }
          .${prefixCls}_read-only div[data-block]:first-child br,
          .${prefixCls}_read-only figure + div br {
            display: none;
          }
          .${prefixCls} .am-flexbox {
            overflow: initial;
          }
        `}</style>
      </div>
    );
  }
}
