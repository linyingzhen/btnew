/**
 * const prefixCls = 'style-160458';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 23:16:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-06 12:56:48
 * @Path m.benting.com.cn /components/RichEditor/_BtnView.js
 */
import React from 'react';
import classNames from 'classnames';
import { Modal } from 'antd-mobile';
import Styles from '@styles';
import Editor from './_Editor';

const prefixCls = 'style-160458';

export default class _BtnView extends React.Component {
  state = {
    visible: false
  };

  toggleModal = () => {
    const { visible } = this.state;

    this.setState({
      visible: !visible
    });
  };

  render() {
    const { title, editorState, className } = this.props;
    const { visible } = this.state;

    return (
      <React.Fragment>
        <span
          className={classNames(prefixCls, className, 't-34 l-48 t-primary')}
          onClick={this.toggleModal}
        >
          预览
        </span>
        <Modal maskClosable={false} visible={visible}>
          <div className={`${prefixCls}__modal`}>
            <span className="am-modal-close-x" onClick={this.toggleModal} />
            <p className="t-40 l-56 t-b">{title || '输入贴子标题'}</p>
            <Editor
              className="t-34 l-48 mt-24"
              editorState={editorState}
              readOnly
            />
          </div>
        </Modal>

        <style jsx global>{`
          .style-160458 {
          }
          .${prefixCls}__modal {
            position: relative;
            min-height: 100vw;
            padding: ${Styles.md};
            font-size: ${Styles.font_md};
            color: initial;
            text-align: left;
          }
          .${prefixCls}__modal .am-modal-close-x {
            position: absolute;
            top: ${Styles.md};
            right: ${Styles.md};
          }
        `}</style>
      </React.Fragment>
    );
  }
}
