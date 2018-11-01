/**
 * const prefixCls = 'style-104402';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-07 09:17:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 12:24:25
 * @Path m.benting.com.cn /src/school/Index/_Best.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Img, Link } from '@components';
import { Header } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-104402';

const _Best = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('best');

  const isOneExist = list.length > 0;
  const isTwoExist = list.length > 1;
  const isThreeExist = list.length > 2;

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="精选推荐" />
      <Flex className={`${prefixCls}__list`}>
        <Flex.Item
          className={`${prefixCls}__lg`}
          href={isOneExist ? `/video/detail?id=${list[0].tbId}` : undefined}
          as={isOneExist ? `/video/detail/${list[0].tbId}` : undefined}
        >
          {isOneExist && (
            <>
              <p className="t-30 l-42 t-c2">{list[0].tit}</p>
              <p className="t-24 l-34 t-sub mt-8">
                浏览
                {list[0].viewCount} / 点赞
                {list[0].likeCount}
              </p>
              <Img
                className="mt-16"
                src={Utils.getAppImgUrl(list[0].fileinfo.surface)}
                size="1.6rem"
              />
            </>
          )}
        </Flex.Item>
        <Flex.Item style={{ marginLeft: 0 }}>
          <Link
            className={`${prefixCls}__sm`}
            href={isTwoExist ? `/video/detail?id=${list[1].tbId}` : undefined}
            as={isTwoExist ? `/video/detail/${list[1].tbId}` : undefined}
            block
          >
            {isTwoExist && (
              <>
                <p className="t-30 l-42 t-c2">{list[1].tit}</p>
                <p className="t-24 l-34 t-sub mt-8">
                  浏览
                  {list[1].viewCount} / 点赞
                  {list[1].likeCount}
                </p>
              </>
            )}
          </Link>
          <Link
            className={`${prefixCls}__sm`}
            href={isThreeExist ? `/video/detail?id=${list[2].tbId}` : undefined}
            as={isThreeExist ? `/video/detail/${list[2].tbId}` : undefined}
            block
          >
            {isThreeExist && (
              <>
                <p className="t-30 l-42 t-c2">{list[2].tit}</p>
                <p className="t-24 l-34 t-sub mt-8">
                  浏览
                  {list[2].viewCount} / 点赞
                  {list[2].likeCount}
                </p>
              </>
            )}
          </Link>
        </Flex.Item>
      </Flex>

      <style jsx global>{`
        .style-104402 {
          background: ${Styles.color_theme};
        }
        .${prefixCls}__list {
          padding: 0 ${Styles.wind} ${Styles.bottom};
          border-bottom: ${Styles.border};
        }
        .${prefixCls}__lg {
          height: 3.04rem;
          padding-right: 0.4rem;
          border-right: ${Styles.border};
        }
        .${prefixCls}__sm {
          height: 1.52rem;
          padding: 0.24rem 0.24rem 0;
        }
        .${prefixCls}__sm:first-child {
          padding-top: 0;
          border-bottom: ${Styles.border};
        }
      `}</style>
    </div>
  );
};

_Best.contextTypes = {
  $: PropTypes.object
};

export default observer(_Best);
