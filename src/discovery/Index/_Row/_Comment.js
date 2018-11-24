/**
 * const prefixCls = 'style-297761';
 * const images = '/static/images/src/discovery/Index/_Row';
 * @Author: czy0729
 * @Date: 2018-07-06 14:48:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 15:49:47
 * @Path m.benting.com.cn /src/discovery/Index/_Row/_Comment.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon, Link } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-288510';

const _Comment = (props, { $ }) => {
  const {
    id,
    infoId,
    commentList = [],
    likeData = [],
    likeRecordsOpen,
    max = 6,
    total = 0,
    className
  } = props;

  if (!likeData.length && !commentList.length) return null;

  const data = commentList.map(item => ({
    tbId: item.tbId,
    parId: item.parId,
    userId: item.userId,
    name: item.niname,
    parUserId: item.parUserId,
    parNiname: item.parNiname,
    text: item.con
  }));
  const needToShowLine = !!likeData.length && !!data.length;

  return (
    <div className={classNames(prefixCls, className)}>
      {!!likeData.length && (
        <div className="like">
          <Flex align="start">
            <Icon className="t-24 l-34 t-primary" type="like" />
            <Flex.Item className="t-24 l-34 t-primary">
              {likeData
                .filter((item, index) => likeRecordsOpen || index < 12)
                .map((item, index) => (
                  <React.Fragment key={item.userId}>
                    <Link
                      href={`/person/zone?id=${item.userId}`}
                      as={`/person/zone/${item.userId}`}
                    >
                      {item.niname}
                    </Link>
                    {index !== likeData.length - 1 && <span>，</span>}
                  </React.Fragment>
                ))}
              {!likeRecordsOpen &&
              likeData.length > 12 && (
                <span
                  className="t-sub"
                  onClick={() => $.page.onLikeLogsOpen(infoId)}
                >
                  展开
                  <Icon className="t-24 l-34 t-sub ml-4" type="down" />
                </span>
              )}
            </Flex.Item>
          </Flex>
        </div>
      )}
      {needToShowLine && <div className="line" />}
      {!!data.length && (
        <div className="comment">
          {data.filter((item, index) => index < max).map((item, index) => {
            // 需要显示回复者与被回复者的关系
            const needToShowRelation = id != item.parId && item.parId != 0;

            return (
              <p
                key={item.tbId}
                className={classNames('p-comment-item t-30 l-42', {
                  'mt-8': index !== 0
                })}
                onClick={e => {
                  e.stopPropagation();
                  Utils.checkLogin(() =>
                    $.page.onCommentClick({
                      infoId,
                      ...item
                    }));
                }}
              >
                <Link
                  className="t-primary"
                  href={`/person/zone?id=${item.userId}`}
                  as={`/person/zone/${item.userId}`}
                >
                  {item.name}
                </Link>
                {!needToShowRelation && <span>：</span>}
                {needToShowRelation && <span className="ml-4">回复</span>}
                {needToShowRelation && (
                  <span
                    className="t-primary ml-4"
                    onClick={() =>
                      Utils.router.push(
                        `/person/zone?id=${item.userId}`,
                        `/person/zone/${item.userId}`
                      )
                    }
                  >
                    {item.parNiname}
                  </span>
                )}
                {needToShowRelation && <span>：</span>}
                <span>{Utils.emojify(item.text)}</span>
              </p>
            );
          })}
          {total > max && (
            <p className="t-30 l-42 mt-16">
              <span>更多精彩回复</span>
              <Link
                className="t-primary ml-4"
                href={`/discovery/detail?id=${infoId}`}
                as={`/discovery/detail/${infoId}`}
              >
                点击查看
              </Link>
            </p>
          )}
        </div>
      )}

      <style jsx>{`
        .style-288510 {
          background: ${Styles.color_bg};
          border-radius: ${Styles.radius_xs};
        }
        .like {
          padding: 0.16rem;
        }
        .comment {
          padding: 0.16rem;
        }
        .line {
          border-top: ${Styles.border};
        }
        .p-comment-item {
          word-break: break-all;
          border-radius: ${Styles.radius_xs};
        }
        .p-comment-item:active {
          background-color: rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
};

_Comment.contextTypes = {
  $: PropTypes.object
};

export default observer(_Comment);
