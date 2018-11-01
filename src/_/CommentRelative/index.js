/**
 * const prefixCls = 'style-213285';
 * const images = '/static/images/src/_/CommentRelative';
 * @Author: czy0729
 * @Date: 2018-07-22 13:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-22 18:47:29
 * @Path m.benting.com.cn /src/_/CommentRelative/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Link } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-213285';

const CommentRelative = props => {
  const {
    id,
    data = [], // [{ tbId, parId, userId, niname, parUserId, parNiname, con }]
    max = 5,
    total = 0,
    moreProps = {}, // { href, as, text }
    onCommentClick = Function.prototype, // ({ rootId, parId, niname }) => onCommentClick()
    className
  } = props;

  if (!data.length) {
    return null;
  }

  return (
    <div className={classNames(prefixCls, className)}>
      {data.filter((item, index) => index < max).map((item, index) => {
        // 需要显示回复者与被回复者的关系
        const needToShowRelation = id != item.parId && item.parId != 0;

        return (
          <p
            key={item.tbId}
            className={classNames('p-comment-item t-30 l-42', {
              'mt-8': index !== 0
            })}
            onClick={() =>
              Utils.checkLogin(() =>
                onCommentClick({
                  rootId: id,
                  parId: item.tbId,
                  niname: item.niname
                }))
            }
          >
            <Link
              className="t-primary"
              href={`/person/zone?id=${item.userId}`}
              as={`/person/zone/${item.userId}`}
            >
              {item.niname}
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
            <span>{Utils.emojify(item.con)}</span>
          </p>
        );
      })}
      {total > max && (
        <p className="t-30 l-42 mt-16">
          <span>{moreProps.text || '更多精彩回复'}</span>
          <Link
            className="t-primary ml-4"
            href={moreProps.href}
            as={moreProps.as}
          >
            点击查看
          </Link>
        </p>
      )}

      <style jsx>{`
        .style-213285 {
          padding: 0.16rem;
          background: ${Styles.color_bg};
          border-radius: ${Styles.radius_xs};
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

CommentRelative.contextTypes = {
  $: PropTypes.object
};

export default observer(CommentRelative);
