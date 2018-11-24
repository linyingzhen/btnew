/**
 * const prefixCls = 'style-653984';
 * const images = '/static/images/src/discovery/Index/_Row';
 * @Author: czy0729
 * @Date: 2018-07-06 14:45:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-22 17:06:21
 * @Path m.benting.com.cn /src/discovery/Index/_Row/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List, Flex } from 'antd-mobile';
import { observer } from '@';
import { Button } from '@components';
import { Author, Address } from '@_';
import Utils from '@utils';
import Media from './_Media';
import Bar from './_Bar';
import Comment from './_Comment';

const prefixCls = 'style-653984';

const _Row = (props, { $ }) => {
  const {
    atList,
    comCountAll,
    commentList,
    con,
    dtsourceType,
    faceImg,
    fanAuth,
    fileList,
    grade,
    infoAddress,
    infoId,
    infoType,
    isConcern,
    likeCount,
    likeList,
    likeRecordsOpen,
    niname,
    publishTime,
    redPacket,
    redRecordsOpen,
    rewardNum,
    role,
    tbId,
    userId,
    userLat,
    userLong,
    vip,
    className
  } = props;
  const userInfo = $.getState('userInfo');
  const liked =
    !!userInfo.userId &&
    likeList.findIndex(item => item.userId === userInfo.userId) !== -1;

  return (
    <List.Item className={classNames(prefixCls, className)} wrap>
      <Flex align="start">
        <Flex.Item>
          <Author
            userId={userId}
            img={faceImg}
            name={niname}
            level={grade}
            fansAuth={fanAuth}
            vip={vip}
            role={role}
          />
        </Flex.Item>
        {isConcern == 0 && (
          <Button
            type="primary"
            inline
            ghost
            size="xs"
            onClick={() => Utils.checkLogin(() => $.do.follow(userId, infoId))}
          >
            +关注
          </Button>
        )}
      </Flex>
      <div className="content">
        <Media
          infoId={infoId}
          atList={atList && JSON.parse(atList)}
          content={con}
          files={fileList}
          red={redPacket}
          redRecordsOpen={redRecordsOpen}
          type={infoType}
          params={{
            video: {
              height: '50vw'
            }
          }}
          dtsourceType={dtsourceType}
        />
        {infoAddress && (
          <Address
            className="t-24 l-34 t-primary mt-16"
            address={infoAddress}
            long={userLong}
            lat={userLat}
          />
        )}
        <Bar
          className="mt-16"
          infoId={infoId}
          liked={liked}
          likeCount={likeCount}
          rewardNum={rewardNum}
          date={publishTime}
        />
        <Comment
          className="mt-12"
          id={tbId}
          infoId={infoId}
          total={comCountAll}
          likeData={likeList}
          commentList={commentList}
          likeRecordsOpen={likeRecordsOpen}
        />
      </div>

      <style jsx>{`
        .style-653984 {
        }
        .content {
          margin-top: -0.2rem;
          margin-left: 0.88rem;
        }
      `}</style>
    </List.Item>
  );
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
