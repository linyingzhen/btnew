/**
 * const prefixCls = 'style-122823';
 * const images = '/static/images/src/event/sign/Index';
 * @Author: czy0729
 * @Date: 2018-10-19 13:57:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-20 00:24:42
 * @Path m.benting.com.cn /src/event/sign/Index/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-122823';
const scoreMap = {
  0: 30,
  1: 25,
  2: 20
};

const _List = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('today');

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="title t-34 l-44 t-b t-c">签到先锋</div>
      <div className="list">
        {list.map((item, index) => (
          <Flex key={item.tbId} className={`${prefixCls}__item`}>
            <div className="num t-c">
              {index < 3 ? (
                <Icon
                  className="t-44"
                  type="trophy-fill"
                  style={{
                    color:
                      index === 0
                        ? '#eaa444'
                        : index === 1
                          ? '#bac1cc'
                          : '#e3c6aa'
                  }}
                />
              ) : (
                <span className="t-34 l-48 t-b">{index + 1}</span>
              )}
            </div>
            <Avatar className="ml-24" userId={item.userId} img={item.faceImg} />
            <Flex.Item className="ml-24">
              <p className="t-30 l-44 ls-o1">{item.niname}</p>
              <p className="t-24 l-44 t-sub ls-o1">
                {Utils.date('H:i:s', item.createTime)}
              </p>
            </Flex.Item>
            <span className="t-30 l-44 t-primary t-b ls-o1">
              +{scoreMap[index] || 15}
              积分
            </span>
          </Flex>
        ))}
      </div>

      <style jsx global>{`
        .style-122823 {
        }
        .${prefixCls}__item {
          padding: 0.24rem 0.04rem;
          border-bottom: 0.01rem solid #f3f3f3;
        }
        .${prefixCls}__item:last-child {
          border-bottom: 0;
        }
      `}</style>
      <style jsx>{`
        .style-122823 {
          background: ${Styles.color_theme};
          border-radius: 0.08rem;
          box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.12);
        }
        .title {
          padding: 0.24rem 0;
          border-bottom: ${Styles.border};
        }
        .list {
          min-height: 13.68rem;
          padding: 0 0.4rem;
        }
        .num {
          width: 0.48rem;
          color: #556475;
        }
      `}</style>
    </div>
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
