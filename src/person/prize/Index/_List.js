/**
 * const prefixCls = 'style-162968';
 * const images = '/static/images/src/person/prize/Index';
 * @Author: lyz0720
 * @Date: 2018-09-21 11:50:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-07 13:50:12
 * @Path bt_mb_new /src/person/prize/Index/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView, Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import Row from './_Row';

const prefixCls = 'style-162968';

const _List = props => {
  const { data, onEndReached, className } = props;
  const nowTime = Utils.getTimestamp();
  const endTime = Utils.getTimestamp('2018/11/11 00:00:00');

  return (
    <div>
      {nowTime < endTime && (
        <Flex className={`${prefixCls}__attention`} justify="center">
          <Icon className="t-26 t-event" type="information-circle-fill" />
          <p className="t-24 l-34 ml-xs">
            <span className="t-void">
              本汀2018双11全球狂欢节之送钱人人有份还在举行！没有领取到现金券的
            </span>
            <span
              className="t-event ml-xs"
              onClick={() =>
                Utils.router.push(
                  '/bbs/article?id=101459',
                  '/bbs/article/101459/'
                )
              }
            >
              点击这里参与
            </span>
          </p>
        </Flex>
      )}
      <ListView
        className={classNames(className, 'tool-list-split')}
        data={data}
        renderRow={item => <Row {...item} />}
        onEndReached={onEndReached}
      />

      <style jsx global>{`
        .style-162968 {
        }
        .${prefixCls}__attention {
          padding: 0.16rem ${Styles.wind};
          background: ${Styles.color_danger};
        }
      `}</style>
    </div>
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
