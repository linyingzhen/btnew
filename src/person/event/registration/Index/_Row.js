/**
 * const prefixCls = 'style-184592';
 * const images = '/static/images/src/person/event/registration/Index';
 * @Author: czy0729
 * @Date: 2018-10-16 18:04:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 09:41:18
 * @Path m.benting.com.cn /src/person/event/registration/Index/_Row.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex, Icon, Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { statusDS } from './ds';

const prefixCls = 'style-184592';

const _Row = (props, { $ }) => {
  const {
    id,
    thread_id: threadId,
    subject,
    status,
    marks,
    end_time: endTime,
    className
  } = props;
  const statusLabel = Utils.getLabel(statusDS, status);

  const showDetialBtn = true;
  let showCancelBtn = false;
  let showRegistBtn = false;
  let showSubmitBtn = false;
  let btnSubmitLabel = '提交订单';
  let showMarks = false;
  let statusTextType;
  switch (statusLabel) {
    case '取消报名':
      break;

    case '报名审核中':
      showCancelBtn = true;
      statusTextType = 'desc';
      break;

    case '报名审核未通过':
      showRegistBtn = true;
      showMarks = !!marks;
      statusTextType = 'danger';
      break;

    case '报名审核通过':
      if (Utils.getTimestamp() > endTime) {
        showSubmitBtn = true;
        statusTextType = 'primary';
      } else {
        showSubmitBtn = false;
      }
      break;

    case '订单信息审核中':
      statusTextType = 'desc';
      break;

    case '订单信息审核未通过':
      showMarks = !!marks;
      showSubmitBtn = true;
      statusTextType = 'danger';
      btnSubmitLabel = '重新提交订单';
      break;

    case '订单信息审核通过':
    case '已提交财务':
    case '已发放奖励':
      statusTextType = 'primary';
      break;

    default:
      break;
  }

  return (
    <List.Item className={classNames(prefixCls, className)} wrap>
      <Flex
        href={`/bbs/article?id=${threadId}`}
        as={`/bbs/article/${threadId}`}
      >
        <Flex.Item className="t-34 l-48">{subject}</Flex.Item>
        <Icon className="t-32 t-icon ml-xs" type="right" />
      </Flex>
      <div className="line" />
      {showMarks ? (
        <div>
          <p className={`t-sm t-${statusTextType}`}>
            状态：
            {statusLabel}
          </p>
          <p className="t-sm t-sub mt-xs">{marks}</p>
          <div className="t-r mt-md">
            {showDetialBtn && (
              <Button
                type="primary"
                size="sm"
                inline
                ghost
                onClick={() =>
                  Utils.router.push(
                    `/person/event/registration/detail?id=${id}`,
                    `/person/event/registration/detail/${id}`
                  )
                }
              >
                报名资料
              </Button>
            )}
            {showSubmitBtn && (
              <Button
                className="ml-sm"
                type="primary"
                size="sm"
                inline
                onClick={() =>
                  Utils.router.push(
                    `/bbs/registration?id=${threadId}`,
                    `/bbs/registration/${threadId}`
                  )
                }
              >
                {btnSubmitLabel}
              </Button>
            )}
            {showCancelBtn && (
              <Button
                className="ml-sm"
                type="danger"
                size="sm"
                inline
                onClick={() =>
                  Utils.onConfirm('确定取消报名?', () => $.do.cancel(id))
                }
              >
                取消报名
              </Button>
            )}
            {showRegistBtn && (
              <Button
                className="ml-sm"
                type="primary"
                size="sm"
                inline
                onClick={() =>
                  Utils.router.push(
                    `/bbs/registration?id=${threadId}`,
                    `/bbs/registration/${threadId}`
                  )
                }
              >
                重新报名
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Flex>
          <Flex.Item>
            <p className={`t-sm t-${statusTextType}`}>
              状态：
              {statusLabel}
            </p>
          </Flex.Item>
          {showDetialBtn && (
            <Button
              type="primary"
              size="sm"
              inline
              ghost
              onClick={() =>
                Utils.router.push(
                  `/person/event/registration/detail?id=${id}`,
                  `/person/event/registration/detail/${id}`
                )
              }
            >
              报名资料
            </Button>
          )}
          {showSubmitBtn && (
            <Button
              className="ml-sm"
              type="primary"
              size="sm"
              inline
              onClick={() =>
                Utils.router.push(
                  `/bbs/registration?id=${threadId}`,
                  `/bbs/registration/${threadId}`
                )
              }
            >
              {btnSubmitLabel}
            </Button>
          )}
          {showCancelBtn && (
            <Button
              className="ml-sm"
              type="danger"
              size="sm"
              inline
              onClick={() =>
                Utils.onConfirm('确定取消报名?', () => $.do.cancel(id))
              }
            >
              取消报名
            </Button>
          )}
          {showRegistBtn && (
            <Button
              className="ml-sm"
              type="primary"
              size="sm"
              inline
              onClick={() =>
                Utils.router.push(
                  `/bbs/registration?id=${threadId}`,
                  `/bbs/registration/${threadId}`
                )
              }
            >
              重新报名
            </Button>
          )}
        </Flex>
      )}

      <style jsx>{`
        .style-141292 {
        }
        .line {
          margin: 0.16rem 0;
          border-bottom: ${Styles.border};
        }
      `}</style>
    </List.Item>
  );
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
