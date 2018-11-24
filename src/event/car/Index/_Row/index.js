/**
 * const prefixCls = 'style-113439';
 * const images = '/static/images/src/event/car/Index/_Row';
 * @Author: czy0729
 * @Date: 2018-11-06 17:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 16:20:14
 * @Path bt_mb_new /src/event/car/Index/_Row/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex } from '@components';
import { Author } from '@_';
import Utils from '@utils';
import Media from './_Media';
import Bar from './_Bar';
import Comment from './_Comment';

const prefixCls = 'style-113439';

const _Row = (props, { $ }) => {
  const {
    comCountAll,
    commentList,
    con,
    explain,
    faceImg,
    fanAuth,
    fileList,
    gold,
    grade,
    infoId,
    infoType,
    likeCount,
    likeList,
    niname,
    publishTime,
    rate,
    rewardNum,
    role,
    tbId,
    tit,
    userId,
    vip,
    rodName,
    fistLength,
    fistWeight,
    location,
    fishDate,
    lotteryNo,
    auditAt,
    reason,
    fistId,
    className
  } = props;
  const { userId: myUserId } = $.getState('userInfo');

  const liked =
    !!myUserId &&
    (likeList || []).findIndex(({ userId }) => userId == myUserId) !== -1;
  const isPass = !!lotteryNo;

  return (
    <List.Item className={classNames(prefixCls, className)} wrap>
      <Flex align="start">
        <Flex.Item>
          <Author
            className={`${prefixCls}__author`}
            userId={userId}
            img={faceImg}
            name={niname}
            level={grade}
            fansAuth={fanAuth}
            vip={vip}
            role={role}
          />
        </Flex.Item>
        <div className="lottery">
          {isPass && (
            <>
              <p className="t-30 l-42 t-r">
                <span>抽奖编号：</span>
                <span className="t-primary t-b">{lotteryNo}</span>
              </p>
              <p className="t-24 l-32 t-sub t-r mt-4">
                审核时间：
                {Utils.date('Y-m-d', auditAt)}
              </p>
            </>
          )}
        </div>
      </Flex>
      <div className="content mt-24">
        <p className="t-30">
          产品：
          {rodName}
        </p>
        <p className="t-30">
          <span>
            鱼长：
            {fistLength}
          </span>
          <span className="ml-xs">CM</span>
        </p>
        {parseFloat(fistWeight) !== 0 && (
          <p className="t-30">
            <span>鱼重：{fistWeight}</span>
            <span className="ml-xs">斤</span>
          </p>
        )}
        <p className="t-30">
          地点：
          {location}
        </p>
        <p className="t-30">
          时间：
          {Utils.date('Y-m-d', fishDate)}
        </p>
        <Media
          className="mt-24"
          content={con}
          explain={explain}
          files={fileList}
          gold={gold}
          infoId={infoId}
          rate={rate}
          tit={tit}
          type={infoType}
          isPass={isPass}
          reason={reason}
        />
        <Bar
          className="mt-16"
          infoId={infoId}
          fistId={fistId}
          liked={liked}
          likeCount={likeCount}
          rewardNum={rewardNum}
          date={publishTime}
        />
        <Comment
          className="mt-24"
          id={tbId}
          infoId={infoId}
          total={comCountAll}
          likeData={likeList}
          commentList={commentList}
        />
      </div>

      <style jsx global>{`
        .style-113439 {
        }
        .${prefixCls}__author div + p {
          display: none;
        }
      `}</style>
      <style jsx>{`
        .style-113439 {
        }
        .content {
          margin-left: 0.88rem;
        }
        .lottery {
          min-height: 0.78rem;
        }
      `}</style>
    </List.Item>
  );
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
