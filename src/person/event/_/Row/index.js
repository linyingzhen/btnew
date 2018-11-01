/**
 * const prefixCls = 'style-372434';
 * const images = '/static/images/src/person/event/_/Row';
 * @Author: czy0729
 * @Date: 2018-09-18 10:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-27 10:38:58
 * @Path m.benting.com.cn /src/person/event/_/Row/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex, Img, Button, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-372434';

const Row = props => {
  const {
    orderId,
    addressId,
    title,
    thumb,
    thumbType = 'scale',
    extra,
    createTime,
    endPrice,
    endPriceText,
    myPrice,
    myPriceText,
    win,
    winText,
    winDefaultText,
    href,
    as,
    className
  } = props;
  const _addressId = parseInt(addressId);
  const showGetBtn = win && !!orderId;

  return (
    <List.Item className={classNames(prefixCls, className)}>
      <Flex className="t-28 l-40 t-sub" href={href} as={as}>
        <Flex.Item>{Utils.date(createTime)}</Flex.Item>
        {extra}
        {href && <Icon className="t-32 t-icon ml-xs" type="right" />}
      </Flex>
      <Flex className={`${prefixCls}__wrap-goods mt-16`}>
        <Img src={Utils.getAppImgUrl(thumb, thumbType)} size="1.6rem" />
        <Flex.Item>
          <p className="t-34 l-48 t-title">{title}</p>
          <p className="t-28 l-40 t-sub t-r mt-24">
            {endPriceText && (
              <>
                <span>{endPriceText}：</span>
                <span className="t-primary">{endPrice}</span>
              </>
            )}
          </p>
          <p className="t-28 l-40 t-sub t-r mt-4">
            {myPriceText && (
              <>
                <span>{myPriceText}：</span>
                <span className="t-primary">{myPrice}</span>
              </>
            )}
          </p>
        </Flex.Item>
      </Flex>
      {(win || winDefaultText) && (
        <Flex className="mt-24" justify="between">
          <Flex.Item className="t-28 l-40 t-primary">
            {winText || winDefaultText}
          </Flex.Item>
          {showGetBtn && (
            <Button
              type="primary"
              size="sm"
              inline
              radius
              ghost={!!_addressId}
              onClick={() =>
                Utils.router.push(
                  `/person/event/prize?id=${orderId}`,
                  `/person/event/prize/${orderId}`
                )
              }
            >
              {_addressId ? '已确认' : '确认地址'}
            </Button>
          )}
        </Flex>
      )}

      <style jsx global>{`
        .style-372434 {
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
