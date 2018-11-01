/**
 * const prefixCls = 'style-121171';
 * const images = '/static/images/src/discovery/fish/Index/_List/_Row';
 * @Author: czy0729
 * @Date: 2018-08-08 17:30:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-21 14:21:33
 * @Path m.benting.com.cn /src/discovery/fish/Index/_List/_Row/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List, Flex } from 'antd-mobile';
import { observer } from '@';
import { Author, Address } from '@_';
import Styles from '@styles';
import Media from './_Media';
import Bar from './_Bar';
import Comment from './_Comment';

const prefixCls = 'style-121171';

const _Row = (props, { $ }) => {
  const {
    atList,
    comCountAll,
    commentList,
    con,
    explain,
    faceImg,
    fanAuth,
    fileList,
    gold,
    grade,
    infoAddress,
    infoId,
    infoType,
    likeCount,
    likeList,
    likeRecordsOpen,
    niname,
    publishTime,
    rate,
    rewardNum,
    role,
    skinStyle,
    tbId,
    tit,
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
    <List.Item
      className={classNames(prefixCls, className, {
        [`tool-${skinStyle}`]: !!skinStyle
      })}
      wrap
    >
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
        {rate != 0 && <span className="p-rate t-24 l-34 t-void">{rate}分</span>}
      </Flex>
      <div className="content">
        <Media
          atList={atList && JSON.parse(atList)}
          content={con}
          explain={explain}
          files={fileList}
          gold={gold}
          infoId={infoId}
          rate={rate}
          tit={tit}
          type={infoType}
          params={{
            video: {
              height: '50vw'
            }
          }}
        />
        {infoAddress && (
          <Address
            className="t-24 l-34 t-primary mt-18"
            address={infoAddress}
            long={userLong}
            lat={userLat}
          />
        )}
        <Bar
          className="mt-18"
          infoId={infoId}
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
          likeRecordsOpen={likeRecordsOpen}
        />
      </div>

      <style jsx>{`
        .style-121171 {
        }
        .content {
          margin-top: -0.2rem;
          margin-left: 0.88rem;
        }
        .p-rate {
          position: relative;
          padding: 0.04rem 0.32rem 0.04rem 0.42rem;
          background: ${Styles.color_primary};
        }
        .p-rate:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          margin-left: -0.01rem;
          border-width: 0.21rem 0 0.21rem 0.21rem;
          border-style: solid;
          border-color: transparent transparent transparent
            ${Styles.color_theme};
        }
      `}</style>
    </List.Item>
  );
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
