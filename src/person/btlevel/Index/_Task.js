/**
 * const prefixCls = 'style-171147';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-26 10:25:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 18:13:47
 * @Path bt_mb_new \src\person\btlevel\Index\_Task.js.git
 */
import React from 'react';
import classNames from 'classnames';
import { List } from 'antd-mobile';
import { Icon, Flex } from '@components';
import Styles from '@styles';
import { privilegeDS } from './ds';

const { Item } = List;
const { Brief } = Item;

const prefixCls = 'style-171147';

const _Task = ({ className }) => (
  <div className={classNames(prefixCls, className)}>
    <div className="titlebox">
      <span className="t-34">会员特权介绍</span>
    </div>

    <List>
      {privilegeDS.map(item => (
        <Item
          key={item.label}
          thumb={
            <Flex>
              <span className={classNames(item.bgcolor, 'l-box flex-label')}>
                <Icon className="t-48 t-void" type={item.type} />
              </span>
            </Flex>
          }
        >
          <div>
            <p className="t-32 t-b">{item.label}</p>
            <Brief className="t-26 t-sub">{item.brief}</Brief>
          </div>
        </Item>
      ))}
    </List>
    <style jsx global>{`
      .style-171147 .am-list-extra {
        flex-basis: 12% !important;
      }
      .am-list-item .am-list-line .am-list-content {
        display: flex;
        align-items: center;
      }
      .style-171147 .flex-label {
        margin-right: 0.12rem;
      }
      .style-171147 .am-list-brief {
        font-size: 0.24rem !important;
        color: ${Styles.color_sub} !important;
        margin-top: 0 !important;
      }
    `}</style>
    <style jsx>{`
      .style-171147 {
        background: #fff;
        margin-bottom: ${Styles.wind};
      }
      .titlebox {
        display: flex;
        justify-content: space-between;
        margin: 0 ${Styles.wind} ${Styles.wind};
        padding-top: ${Styles.wind};
      }
      .l-box {
        display: flex;
        width: 0.8rem;
        height: 0.8rem;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        text-align: center;
      }
      .b-yellow {
        background: linear-gradient(
          135deg,
          rgba(255, 227, 133, 1) 0%,
          rgba(251, 178, 64, 1) 100%
        );
      }
      .b-blue {
        background: linear-gradient(
          135deg,
          rgba(184, 187, 255, 1) 0%,
          rgba(92, 98, 232, 1) 100%
        );
      }
      .b-coral {
        background: linear-gradient(
          135deg,
          rgba(255, 160, 122, 1) 0%,
          rgba(255, 127, 80, 1) 100%
        );
      }
      .b-plum {
        background: linear-gradient(
          135deg,
          rgba(221, 160, 221, 1) 0%,
          rgba(238, 130, 238, 1) 100%
        );
      }
      .b-cyan {
        background: linear-gradient(
          135deg,
          rgba(162, 255, 248, 1) 0%,
          rgba(68, 192, 183, 1) 100%
        );
      }
    `}</style>
  </div>
);

export default _Task;
