/**
 * const prefixCls = 'style-753736';
 * const images = '/static/images/src/bbs/Article/_Comment';
 * @Author: czy0729
 * @Date: 2018-07-17 10:18:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:48:46
 * @Path m.benting.com.cn /src/bbs/Article/_Comment/_Row.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon, Content, DiscuzContent, Link, List, Img } from '@components';
import { Author, Avatar } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-451023';

const _CommentRow = (props, { $ }) => {
  const {
    commentImg,
    content,
    createTime,
    faceImg,
    fanAuth,
    floor,
    grade,
    niname,
    parCreateTime,
    parNiname,
    parUserId,
    postId,
    role,
    top,
    userId,
    vip,
    className
  } = props;

  let _floor = `${floor}楼`;
  if (_floor === '2楼') _floor = '沙发';
  if (_floor === '3楼') _floor = '板凳';
  if (_floor === '4楼') _floor = '地板';

  const isTop = parseInt(top) > 0;
  const isReward = props.rtype == 1;
  const hasParComment = !!parCreateTime;

  return (
    <List.Item
      className={classNames(prefixCls, className)}
      thumb={<Avatar userId={userId} img={faceImg} vip={vip} />}
      thumbPosition="top"
    >
      <Flex>
        <Flex.Item>
          <Author
            userId={userId}
            name={niname}
            level={grade}
            fansAuth={fanAuth}
            role={role}
            left={isTop ? `${_floor} · 置顶 | ` : `${_floor} | `}
            date={Utils.lastDate(createTime)}
          />
        </Flex.Item>
        <div
          className="icon-comment tool-wrap-icon"
          onClick={() =>
            Utils.checkLogin(() =>
              $.page.onCommentClick({
                parentId: postId,
                niname: `${_floor} | ${niname}`
              }))
          }
        >
          <Icon className="t-28 t-icon" type="comment-fill" />
        </div>
      </Flex>
      {isReward ? (
        <Flex className="t-34 l-48 t-title mt-24 user-select">
          <span>打赏了</span>
          <span className="t-primary">{props.content}</span>
          <Img
            className="ml-8"
            src={Utils.getImgUrl(commentImg)}
            size="1rem"
            transparent
          />
        </Flex>
      ) : (
        <div className="mt-24">
          {hasParComment && (
            <div className="quote">
              <Content
                className="t-28 l-40 t-sub user-select"
                left={
                  <span>
                    <Link
                      className="t-28 l-40 t-primary"
                      href={`/person/zone?id=${parUserId}`}
                      as={`/person/zone/${props.parUserId}`}
                    >
                      {parNiname}
                    </Link>
                    ：
                  </span>
                }
                style={{ display: 'inline-block' }}
              >
                {props.parMessage}
              </Content>
            </div>
          )}
          <DiscuzContent
            className="t-34 l-48 t-title user-select"
            html={{ __html: content }}
          />
          {commentImg && (
            <img
              className="img-reply mt-16"
              src={Utils.getAppImgUrl(commentImg, 'scale')}
              alt=""
            />
          )}
        </div>
      )}

      <style jsx>{`
        .style-451023 {
        }
        .quote {
          padding: 0.08rem;
          margin-bottom: 0.16rem;
          background: ${Styles.color_bg};
          border-radius: ${Styles.radius_xs};
        }
        .icon-comment {
          margin-right: -0.16rem;
        }
        .img-reply {
          width: 64vw !important;
          height: auto !important;
        }
      `}</style>
    </List.Item>
  );
};

_CommentRow.contextTypes = {
  $: PropTypes.object
};

export default observer(_CommentRow);
