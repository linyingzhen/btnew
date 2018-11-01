/**
 * const prefixCls = 'style-173475';
 * const images = '/static/images/src/video/Detail';
 * @Author: czy0729
 * @Date: 2018-07-19 18:33:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 10:02:59
 * @Path m.benting.com.cn /src/video/Detail/_Detail.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Badge } from 'antd-mobile';
import { observer } from '@';
import { Link, Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-173475';

const _Detail = (props, { $ }) => {
  const { className } = props;
  const {
    tit,
    introCon,
    createTime,
    userId,
    userinfo = {},
    from,
    isLike,
    likeCount = '-'
  } = $.getState('detail');
  const _isLike = isLike === 1;

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex align="start">
        <h4 className="t-34 l-48 t-title">{tit}</h4>
        {from == 0 && (
          <Badge className="ml-sm mt-8" text="官方" style={Styles._badge} />
        )}
      </Flex>
      <p className="t-28 l-42 t-sub mt-xs">{introCon}</p>
      <p className="t-24 l-34 mt-sm">
        {!!userId && (
          <React.Fragment>
            <Link
              href={`/person/zone?id=${userId}`}
              as={`/person/zone/${userId}`}
            >
              {userinfo.userName}
            </Link>
            <span className="t-sub ml-xs mr-xs">·</span>
            <span className="t-sub">
              发表于
              {Utils.date(createTime)}
            </span>
          </React.Fragment>
        )}
      </p>
      <Flex className="mt-32" justify="end">
        <Flex onClick={$.do.toggleLike}>
          <Icon
            className={classNames('tool-wrap-icon t-26', {
              't-icon': !_isLike,
              't-primary': _isLike
            })}
            type="like-fill"
          />
          <span
            className={classNames('t-24', {
              't-sub': !_isLike,
              't-primary': _isLike
            })}
          >
            {likeCount}
          </span>
        </Flex>
      </Flex>

      <style jsx>{`
        .style-173475 {
          padding: 0.32rem ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Detail.contextTypes = {
  $: PropTypes.object
};

export default observer(_Detail);
