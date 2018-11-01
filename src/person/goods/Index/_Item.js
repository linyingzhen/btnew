/**
 * const prefixCls = 'style-123376';
 * const images = '/static/images/src/person/goods/Index';
 * @Author: lyz0720
 * @Date: 2018-10-23 16:59:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 00:16:03
 * @Path bt_mb_new /src/person/goods/Index/_Item.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Img, Flex, Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'styles-123376';

const _Item = props => {
  const { state, prizeType, imgId, recordId } = props;
  const isUsed = state != 1;
  const isReal = prizeType == 1;

  return (
    <Flex
      className={prefixCls}
      onClick={() =>
        Utils.router.push(
          `/person/goods/detail?id=${recordId}`,
          `/person/goods/detail/${recordId}`
        )
      }
    >
      {isReal ? (
        <Flex
          className={`${prefixCls}__prize`}
          direction="column"
          justify="center"
        >
          <Img src={imgId} size="2.2rem" />
        </Flex>
      ) : (
        <Flex
          className={`${prefixCls}__prize`}
          direction="column"
          justify="center"
        >
          <p className="t-40 l-44 t-primary t-b t-c">¥ {props.prizeVal}</p>
          {props.limitPrize && (
            <p className="t-20 l-32 t-sub mt-4">
              满 {parseInt(props.limitPrize)} 可用
            </p>
          )}
        </Flex>
      )}
      <Flex.Item>
        <Flex className="t-30" style={{ minHeight: '0.5rem' }}>
          {props.prizeName}
        </Flex>
        <p className="t-24 t-sub mt-4">
          <span>{Utils.date('y.m.d H:i', props.expdatebegin)}</span>
          <span> - </span>
          <span>{Utils.date('y.m.d H:i', props.expdateend)}</span>
        </p>
        <Button
          className={`${prefixCls}__btn t-xs mt-16`}
          type="primary"
          inline
          size="sm"
          disabled={isUsed}
        >
          {isUsed ? '已发放' : '查看详情'}
        </Button>
      </Flex.Item>

      <style jsx global>{`
        .styles-123376 {
          padding: ${Styles.sm};
          margin-bottom: ${Styles.distance};
          background: ${Styles.color_void};
          border: ${Styles.border};
          border-radius: 0.04rem;
        }
        .${prefixCls}:last-child {
          margin-bottom: 0;
        }
        .${prefixCls}__prize {
          min-width: 2.2rem;
          min-height: 2.2rem;
          box-sizing: content-box;
          padding-left: 0;
          margin-right: ${Styles.sm};
          border-right: ${Styles.border};
        }
        .${prefixCls}__btn {
          min-width: 1.6rem !important;
          border-radius: 0.4rem !important;
        }
      `}</style>
    </Flex>
  );
};

_Item.contextTypes = {
  $: PropTypes.object
};

export default observer(_Item);
