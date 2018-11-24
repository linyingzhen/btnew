/**
 * const prefixCls = 'style-562167';
 * const images = '/static/images/src/person/Index';
 * @Author: cwz0525
 * @Date: 2018-07-16 12:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-11 09:55:32
 * @Path m.benting.com.cn /src/person/Index/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon, Img } from '@components';
import { Level } from '@_';
import Const from '@const';
import Styles from '@styles';
import Utils from '@utils';
import { images, btLevelDS, fanAuthDS } from './ds';

const prefixCls = 'style-562167';

const _Top = (props, { $ }) => {
  const { niname = '-', faceImg, grade, vip, btlevel, fanAuth } = $.getState(
    'userInfo'
  );
  const { infoflowCount = '-', postCount = '-', fanCount = '-' } = $.getState(
    'count'
  );
  const _btLevel = Utils.getLabel(btLevelDS, btlevel);
  const _fanAuth = Utils.getLabel(fanAuthDS, fanAuth);

  return (
    <div className={prefixCls}>
      <div className="wrap-top">
        <Img
          className={`${prefixCls}__avatar`}
          size="1.28rem"
          src={faceImg}
          circle
          onClick={() => Utils.router.push('/person/setup/infor')}
        />
        <Flex className={`${prefixCls}__level`}>
          <div className="level">
            <Level value={grade} />
          </div>
          <span className="t-void ml-sm">
            我的等级LV.
            {grade}
          </span>
        </Flex>
      </div>
      <div className="wrap-info">
        <Flex>
          <Flex.Item className="t-34 l-48 t-b mr-sm">{niname}</Flex.Item>
          <div onClick={() => Utils.router.push('/person/level')}>
            <span className="t-30">积分等级</span>
            <Icon className="t-32 t-sub ml-xs" type="right" />
          </div>
        </Flex>
        <div className="wrap-tag l-28 mt-16">
          {vip == 1 && (
            <span className="tag tag-main mr-sm">
              <Flex>
                <Icon className="t-24 t-gold" type="vip-fill" />
                <span className="t-20 l-28 t-gold ml-4">灵动VIP</span>
              </Flex>
            </span>
          )}
          {_btLevel && (
            <span className="tag tag-main mr-sm">
              <Flex>
                <Icon className="t-24 t-void" type="star-fill" />
                <span className="t-20 l-28 t-void ml-4">
                  本汀
                  {_btLevel}
                </span>
              </Flex>
            </span>
          )}
          {_fanAuth && (
            <span
              className={classNames('tag', {
                'tag-sub': _fanAuth === '小咖',
                'tag-warning': _fanAuth === '大咖'
              })}
            >
              <Flex>
                <Icon className="t-24 t-void" type="ka" />
                <span className="t-20 l-28 t-void">{_fanAuth}</span>
              </Flex>
            </span>
          )}
        </div>
        <Flex className="mt-36">
          <Flex.Item href="/person/publish">
            <span className="t-40 l-56 t-b">{infoflowCount}</span>
            <span className="t-24 l-34 t-sub ml-xs">发现</span>
          </Flex.Item>
          <Flex.Item href="/person/publish?id=1" as="/person/publish/1">
            <span className="t-40 l-56 t-b">{postCount}</span>
            <span className="t-24 l-34 t-sub ml-xs">帖子</span>
          </Flex.Item>
          <Flex.Item href="/person/friends?id=1" as="/person/friends/1">
            <span className="t-40 l-56 t-b">{fanCount}</span>
            <span className="t-24 l-34 t-sub ml-xs">粉丝</span>
          </Flex.Item>
        </Flex>
      </div>

      <style jsx global>{`
        .style-562167 {
        }
        .${prefixCls}__avatar {
          border: 0.08rem solid ${Styles.color_theme};
          transform: translateY(50%);
        }
        .${prefixCls}__level {
          position: absolute;
          bottom: 0.12rem;
          left: 1.8rem;
        }
      `}</style>
      <style jsx>{`
        .style-562167 {
        }
        .wrap-top {
          position: relative;
          padding: 1rem ${Styles.wind} 0;
          margin-top: -1rem;
          background-color: ${Styles.color_main};
          background-image: url(${images}/person-bg${Const.__IMG_DPR__}.png);
          background-repeat: no-repeat;
          background-position: right bottom;
          background-size: 2.4rem;
        }
        .level {
          min-width: 0.42rem;
          min-height: 0.39rem;
        }
        .wrap-info {
          padding: 0.68rem ${Styles.wind} 0.24rem;
          background: ${Styles.color_theme};
        }
        .wrap-tag {
          min-height: 0.36rem;
        }
        .tag {
          display: inline-block;
          vertical-align: top;
          padding: 0.04rem 0.16rem;
          border-radius: 0.24rem;
        }
        .tag-main {
          background: ${Styles.color_main};
        }
        .tag-sub {
          background: ${Styles.color_sub};
        }
        .tag-warning {
          background: ${Styles.color_warning};
        }
      `}</style>
    </div>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
