/**
 * const prefixCls = 'style-118770';
 * const images = '/static/images/components/EmojiTextarea';
 * @Author: czy0729
 * @Date: 2018-10-23 16:01:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 16:17:53
 * @Path bt_mb_new /components/EmojiTextarea/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Flex from '../Flex';
import Icon from '../Icon';
import Form from '../Form';
import EmojiPicker from '../EmojiPicker';

const prefixCls = 'c-emoji-textarea';

export default class EmojiTextarea extends React.Component {
  static propsTypes = {
    extra: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    extra: null,
    onChange: Function.prototype // (value) => {}
  };

  state = {
    value: this.props.value || '',
    showEmojiPicker: false
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;

    if (nextProps.value !== value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = value => {
    const { onChange } = this.props;
    const newValue = this.filterUTFEmoji(value);

    this.setState({
      value: newValue
    });
    onChange(newValue);
  };

  onPick = en => {
    const { onChange } = this.props;
    const { value } = this.state;
    const newValue = this.filterUTFEmoji(`${value}${en}`);

    this.setState({
      value: newValue
    });
    onChange(newValue);
  };

  filterUTFEmoji = value => value;
  // return value.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3
  // |[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, '');

  renderTextarea() {
    const { className, onChange, extra, ...other } = this.props;
    const { value } = this.state;

    return (
      <Form.Textarea
        className={`${prefixCls}__textarea`}
        value={value}
        onChange={this.handleChange}
        onFocus={() =>
          this.setState({
            showEmojiPicker: false
          })
        }
        {...other}
      />
    );
  }

  renderBtn() {
    const { extra } = this.props;
    const { showEmojiPicker } = this.state;

    return (
      <Flex className="mt-sm">
        <span
          style={{
            width: '.44rem',
            height: '.42rem'
          }}
        >
          {showEmojiPicker ? (
            <Icon
              className={`${prefixCls}__emoji-btn`}
              type={require('svg/smile_color.svg')}
              onClick={() =>
                this.setState({
                  showEmojiPicker: false
                })
              }
            />
          ) : (
            <Icon
              className={`${prefixCls}__emoji-btn text-sub`}
              type={require('svg/smile_o.svg')}
              size="md"
              onClick={() =>
                this.setState({
                  showEmojiPicker: true
                })
              }
            />
          )}
        </span>
        {extra}
      </Flex>
    );
  }

  renderEmojiPicker() {
    const { showEmojiPicker } = this.state;

    return (
      <EmojiPicker
        className={classNames({
          [`${prefixCls}__emoji-picker`]: true,
          [`${prefixCls}__emoji-picker_open`]: showEmojiPicker
        })}
        onPick={this.onPick}
      />
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames(prefixCls, className)}>
        {this.renderTextarea()}
        {this.renderBtn()}
        {this.renderEmojiPicker()}
      </div>
    );
  }
}
