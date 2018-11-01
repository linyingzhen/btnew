/**
 * const prefixCls = 'style-196406';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-07 12:12:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 12:24:58
 * @Path m.benting.com.cn /src/school/Index/_BestArticle.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Header } from '@_';
import { Link } from '@components';
import Styles from '@styles';

const prefixCls = 'style-196406';

const _Best = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('bestArticle');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="文章推荐" href="/school/article" />
      <div className="list">
        {list.map(item => (
          <Link
            key={item.threadId}
            className={`${prefixCls}__item`}
            href={`/bbs/article?id=${item.threadId}`}
            as={`/bbs/article/${item.threadId}`}
            block
          >
            <p className="t-30 l-42 t-c2">{item.title}</p>
            <p className="t-24 l-34 t-sub mt-8">
              浏览
              {item.viewNum} / 点赞
              {item.likeAdd}
            </p>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        .style-196406 {
        }
        .${prefixCls}__item:not(:first-child) {
          margin-top: 0.32rem;
        }
      `}</style>
      <style jsx>{`
        .style-196406 {
          background: ${Styles.color_theme};
        }
        .list {
          padding: 0 ${Styles.wind} ${Styles.bottom};
        }
      `}</style>
    </div>
  );
};

_Best.contextTypes = {
  $: PropTypes.object
};

export default observer(_Best);
