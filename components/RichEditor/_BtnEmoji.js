/**
 * const prefixCls = 'style-318071';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 23:09:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 17:29:31
 * @Path m.benting.com.cn /components/RichEditor/_BtnEmoji.js
 */
import React from 'react';
import classNames from 'classnames';
import Styles from '@styles';
import EmojiPicker from '../EmojiPicker';
import BtnControl from './_BtnControl';

const prefixCls = 'style-318071';

export default class _BtnEmoji extends React.Component {
  state = {
    showEmojiPicker: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.focused) {
      this.setState({
        showEmojiPicker: false
      });
    }
  }

  toggleEmojiPicker = () => {
    const { showEmojiPicker } = this.state;

    this.setState({
      showEmojiPicker: !showEmojiPicker
    });
  };

  doAdd = value => {
    const { onAdd } = this.props;

    onAdd('emoji', { value }, value);
  };

  render() {
    const { focused, className } = this.props;
    const { showEmojiPicker } = this.state;

    return (
      <div className={classNames(prefixCls, className)}>
        <BtnControl
          label="emoji"
          iconActive={showEmojiPicker}
          onClick={this.toggleEmojiPicker}
        />
        <EmojiPicker
          className={classNames({
            [`${prefixCls}__emoji-picker`]: true,
            // focus时要隐藏
            [`${prefixCls}__emoji-picker_open`]: !focused && showEmojiPicker
          })}
          onPick={this.doAdd}
        />

        <style jsx global>{`
          .style-318071 {
            display: inline-block;
            width: 0.6rem;
            height: 0.6rem;
          }
          .${prefixCls}__emoji-picker {
            position: fixed;
            z-index: ${Styles.z_fixed_textarea};
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #fff;
            border-top: ${Styles.border};
            box-shadow: 0 -0.08rem 0.08rem -0.08rem rgba(0, 0, 0, 0.16) !important;
            transform: translate3d(0, 100%, 0);
          }
          .${prefixCls}__emoji-picker_open {
            transform: translate3d(0, -0.92rem, 0);
          }
        `}</style>
      </div>
    );
  }
}
