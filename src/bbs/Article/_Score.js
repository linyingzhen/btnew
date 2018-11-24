/**
 * const prefixCls = 'style-385269';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-13 13:54:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 11:56:41
 * @Path m.benting.com.cn /src/bbs/Article/_Score.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Flex, Button, Icon, Img } from '@components';
import { observer } from '@';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-385269';

const _Score = (props, { $ }) => {
  const { className } = props;
  const { isFav } = $.getState('userInfo');
  const { likeAdd } = $.getState('detail');
  const { list, allnum } = $.getState('score');
  const isHongren = isFav == 1; // 是否红人

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex justify="center">
        <Button
          size="sm"
          ghost
          inline
          onClick={() =>
            Utils.checkLogin(() => {
              if (isHongren) {
                Utils.onPrompt(
                  '红人加积分',
                  $.do.addScoreHongren,
                  1,
                  '可根据帖子质量加1-10积分'
                );
              } else {
                Utils.onConfirm('确定给作者加积分?', $.do.addScore);
              }
            })
          }
        >
          <Flex style={{ height: '100%' }}>
            <Icon className="t-30 t-title" type="plus-circle" />
            <span className="t-30 l-56 t-title ml-16">加分</span>
          </Flex>
        </Button>
        <Button
          className="ml-32"
          type={$.isLike ? 'primary' : 'default'}
          size="sm"
          ghost
          inline
          onClick={() => Utils.checkLogin($.do.toggleLike)}
        >
          <Flex style={{ height: '100%' }}>
            <Icon
              className={classNames('t-30', {
                't-title': !$.isLike,
                't-primary': $.isLike
              })}
              type="hand"
            />
            <span className="t-30 ml-16">{likeAdd || '点赞'}</span>
          </Flex>
        </Button>
      </Flex>
      {!!list.length && (
        <Flex
          className={`${prefixCls}__wrap-avatar mt-42`}
          justify="center"
          wrap="wrap"
        >
          {list.map(({ userId, faceImg, point }) => (
            <Img
              key={userId}
              className={`${prefixCls}__avatar`}
              src={faceImg}
              size="0.64rem"
              circle
            >
              <span className="point t-32 t-void t-c">{point}</span>
            </Img>
          ))}
          <span className="t-30 l-64 t-sub ml-8 mt-4">
            {allnum}
            人加分
          </span>
        </Flex>
      )}

      <style jsx global>{`
        .style-385269 {
        }
        .${prefixCls}__wrap-avatar {
          padding: 0 12%;
        }
        .${prefixCls}__avatar {
          margin: 0.04rem 0 0 -0.2rem;
          border: 0.04rem solid ${Styles.color_theme};
        }
        .${prefixCls}__avatar:active, .${prefixCls}__avatar:hover {
          z-index: 1;
        }
        .${prefixCls}__avatar:active .point,
        .${prefixCls}__avatar:hover .point {
          opacity: 1;
        }
      `}</style>
      <style jsx>{`
        .style-385269 {
        }
        .point {
          ${Styles._full};
          z-index: 1;
          line-height: 0.56rem;
          background: rgba(0, 0, 0, 0.64);
          transition: opacity 0.3s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

_Score.contextTypes = {
  $: PropTypes.object
};

export default observer(_Score);
