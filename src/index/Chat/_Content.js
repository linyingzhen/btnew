/**
 * const prefixCls = 'style-149483';
 * const images = '/static/images/src/index/Chat';
 * @Author: czy0729
 * @Date: 2018-10-21 17:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 20:03:00
 * @Path bt_mb_new /src/index/Chat/_Content.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Content } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const _Content = (props, { $ }) => {
  const { message, con, img, isMe, className } = props;

  let _con = con;
  let _img = img;
  if (message) {
    let _message = { value: '' };
    try {
      _message = JSON.parse(message);
    } catch (ex) {
      console.warn(ex);
    }

    _con = _message.value;
    _img = _message.id;
  }

  return (
    <div
      className={classNames(className, 'content', {
        'content-me': isMe,
        'content-img': !!_img
      })}
    >
      {_img ? (
        <img
          className="image"
          src={Utils.getAppImgUrl(_img, 'scale', true)}
          alt=""
          onClick={() => $.page.showImgView(_img)}
        />
      ) : (
        <Content style={{ wordBreak: 'break-all' }}>{_con}</Content>
      )}

      <style jsx>{`
        .style-149483 {
        }
        .content {
          position: relative;
          padding: ${Styles.sm};
          background-color: ${Styles.color_theme};
          border-radius: 0.08rem;
        }
        .content:before {
          content: '';
          position: absolute;
          top: 0.16rem;
          left: 0;
          margin-left: -0.12rem;
          border-top: 0.12rem solid transparent;
          border-bottom: 0.12rem solid transparent;
          border-right: 0.12rem solid ${Styles.color_theme};
        }
        .content-me {
          background-color: ${Styles.color_primary};
        }
        .content-me:before {
          top: 0.16rem;
          left: initial;
          right: 0;
          margin-left: initial;
          margin-right: -0.12rem;
          border-top: 0.12rem solid transparent;
          border-right: 0;
          border-bottom: 0.12rem solid transparent;
          border-left: 0.12rem solid ${Styles.color_primary};
        }
        .content-img {
          padding: 0;
        }
        .content-img:before {
          content: initial;
        }
        .image {
          display: inline-block;
          vertical-align: top;
          min-width: 1.2rem;
          height: initial;
          max-width: 56vw;
          max-height: 56vh;
          border-radius: 0.08rem;
        }
      `}</style>
    </div>
  );
};

_Content.contextTypes = {
  $: PropTypes.object
};

export default observer(_Content);
