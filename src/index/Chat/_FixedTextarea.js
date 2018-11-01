/**
 * const prefixCls = 'style-179152';
 * const images = '/static/images/src/index/Chat';
 * @Author: czy0729
 * @Date: 2018-10-21 17:45:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 20:25:30
 * @Path bt_mb_new /src/index/Chat/_FixedTextarea.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon, Button, EmojiPicker } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import Extra from './_Extra';

const prefixCls = 'style-179152';

@observer
export default class _FixedTextarea extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentDidUpdate() {
    const textareaDom = this.textareaRef;

    if (textareaDom.scrollHeight > 240) {
      return;
    }

    textareaDom.style.height = ''; // 字数减少时能自动减小高度
    textareaDom.style.height = `${textareaDom.scrollHeight}px`;
  }

  render() {
    const { className } = this.props;
    const { $ } = this.context;
    const { socketConnectFail, showEmoji, value } = $.getState();

    return (
      <div className={classNames(prefixCls, className)}>
        <Flex className={`${prefixCls}__form`}>
          {showEmoji ? (
            <Icon
              className="t-56 t-sub"
              type="keyboard"
              onClick={() => {
                $.page.hideEmojiPicker();
                document.querySelector('textarea').focus();
              }}
            />
          ) : (
            <Icon
              className="t-56 t-sub"
              type="emoji"
              onClick={() => {
                if (socketConnectFail) {
                  return;
                }

                $.page.toggleEmojiPicker();
              }}
            />
          )}
          <Flex.Item className="ml-sm" style={{ position: 'relative' }}>
            <div className="textarea am-list-item am-textarea-item">
              <div className="am-textarea-control">
                <textarea
                  ref={el => (this.textareaRef = el)}
                  className={`${prefixCls}__textarea`}
                  rows="1"
                  value={value}
                  disabled={socketConnectFail}
                  placeholder={
                    socketConnectFail
                      ? '私聊服务连接失败，请稍后再试'
                      : undefined
                  }
                  onFocus={() => $.page.hideEmojiPicker()}
                  onChange={e => {
                    $.page.onTextareaChange(e.target.value);
                    this.componentDidUpdate();
                  }}
                />
              </div>
            </div>
          </Flex.Item>
          <div className="extra t-c ml-sm">
            {!value ? (
              <Extra
                disabled={socketConnectFail}
                onUploadImageSuccess={fileId =>
                  Utils.onConfirm(
                    <div className="t-c">
                      <p>确定发送图片?</p>
                      <img
                        className="mt-d"
                        src={Utils.getAppImgUrl(fileId, 'scale')}
                        style={{ width: '100%' }}
                        alt=""
                      />
                    </div>,
                    () => $.do.comment({ id: fileId })
                  )
                }
              />
            ) : (
              <Button type="primary" size="sm" inline onClick={$.do.comment}>
                发送
              </Button>
            )}
          </div>
        </Flex>
        {showEmoji && (
          <EmojiPicker
            className={`${prefixCls}__emoji-picker`}
            onPick={$.page.onEmojiPick}
          />
        )}

        <style jsx global>{`
          .style-179152 {
            width: 100%;
            background: ${Styles.color_theme};
            border-top: ${Styles.border};
          }
          .${prefixCls}__form {
            padding: 0.12rem 0.12rem 0.08rem;
          }
        `}</style>
        <style jsx>{`
          .style-179152 {
          }
          .textarea {
            padding-left: 0 !important;
          }
          .textarea :global(.am-textarea-control) {
            padding: 0;
            padding-right: 0.56rem !important;
            border-bottom: ${Styles.border};
          }
          .extra {
            width: 1rem;
          }
        `}</style>
      </div>
    );
  }
}
