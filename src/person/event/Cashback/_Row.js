/**
 * const prefixCls = 'style-131369';
 * const images = '/static/images/src/person/event/Cashback';
 * @Author: czy0729
 * @Date: 2018-10-16 14:26:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 10:09:15
 * @Path m.benting.com.cn /src/person/event/Cashback/_Row.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex, Img, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { typeDS } from './ds';

const prefixCls = 'style-131369';

const Row = props => {
  const { perateId, acName, schedule, createTime, covermapId } = props;
  const label = Utils.getLabel(typeDS, schedule);

  let type;
  switch (label) {
    case '信息审核失败':
    case '奖金发放失败':
      type = 'danger';
      break;

    case '奖金发放成功':
      type = 'success';
      break;

    default:
      break;
  }

  return (
    <List.Item
      href={`/event/cashback?id=${perateId}`}
      as={`/event/cashback/${perateId}`}
    >
      <Flex className="t-28 l-40 t-sub">
        <Flex.Item>{Utils.date(createTime)}</Flex.Item>
        <span
          className={classNames({
            [`t-${type}`]: type
          })}
        >
          {Utils.getLabel(typeDS, schedule)}
        </span>
        <Icon className="t-32 t-icon ml-xs" type="right" />
      </Flex>
      <Flex className={`${prefixCls}__wrap-goods mt-16`}>
        <Img src={Utils.getAppImgUrl(covermapId)} size="1.6rem" />
        <Flex.Item>
          <p className="t-34 l-48 t-title">{acName}</p>
        </Flex.Item>
      </Flex>

      <style jsx global>{`
        .style-131369 {
        }
        .${prefixCls}__wrap-goods {
          padding: ${Styles.wind};
          background: ${Styles.color_bg};
        }
      `}</style>
    </List.Item>
  );
};

export default observer(Row);
