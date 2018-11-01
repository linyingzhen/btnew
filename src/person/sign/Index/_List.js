/**
 * const prefixCls = 'style-157920';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-02 11:00:49
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-08-30 18:26:11
 * @Path m.benting.com.cn /src/index/Sign/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Img, Link } from '@components';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-157920';
const faceIconSize = '0.72rem';

const Rank = props => {
  const { userId, rank, niname, faceImg, createTime } = props;
  let size;
  let img;
  let poin;

  switch (rank) {
    case 1:
      size = '0.28rem';
      img = `${images}/No.1${Const.__IMG_DPR__}.png`;
      poin = 15;
      break;

    case 2:
      size = '0.28rem';
      img = `${images}/No.2${Const.__IMG_DPR__}.png`;
      poin = 15;
      break;

    case 3:
      size = '0.28rem';
      img = `${images}/No.3${Const.__IMG_DPR__}.png`;
      poin = 15;
      break;
    default:
      break;
  }

  return (
    <Flex
      justify="between"
      key={userId}
      style={{
        boxSizing: 'content-box',
        padding: '0.24rem 0',
        borderBottom: '0.01rem solid #F3F3F3'
      }}
    >
      <Flex>
        <Img src={img} size={size} className="img-cup" />
        <Link href={`/person/zone/${userId}`}>
          <Img className="face-icon ml-32" src={faceImg} size={faceIconSize} />
        </Link>
        <Flex.Item className="niname ml-20">
          <Flex direction="column">
            <span
              className="t-30 l-44 t-m"
              style={{ width: '100%', textAlign: 'left' }}
            >
              {niname}
            </span>
            <span
              className="t-20 l-28 t-sub"
              style={{ width: '100%', textAlign: 'left' }}
            >
              签到时间: {Utils.date('H:i:s', createTime)}
            </span>
          </Flex>
        </Flex.Item>
      </Flex>
      <span className="t-primary t-24 l-28">
        +{poin}
        积分
      </span>
    </Flex>
  );
};

const List = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('today');

  return (
    <div className={classNames(prefixCls, className)}>
      <div
        style={{
          background: Styles.color_theme,
          borderRadius: '0.06rem 0.06rem 0 0'
        }}
      >
        <p className="sign-pioneer t-34 l-44 t-b t-c">签到先锋</p>
        <div className="list">
          {list.length > 0 && <Rank rank={1} {...list[0]} />}
          {list.length > 1 && <Rank rank={2} {...list[1]} />}
          {list.length > 2 && <Rank rank={3} {...list[2]} />}
          {list.length > 0 &&
            list.filter((item, index) => index >= 3).map((item, index) => (
              <Flex
                justify="between"
                key={item.userId}
                style={{
                  boxSizing: 'content-box',
                  padding: '0.24rem 0',
                  borderBottom: index >= 6 ? '' : '0.01rem solid #F3F3F3'
                }}
              >
                <Flex>
                  <span className="p-ranking">{index + 4}</span>
                  <Link href={`/person/zone/${item.userId}`}>
                    <Img
                      className="face-icon ml-32"
                      src={item.faceImg}
                      size={faceIconSize}
                    />
                  </Link>
                  <Flex.Item className="niname ml-20">
                    <Flex direction="column">
                      <span
                        className="t-30 l-44 t-m"
                        style={{ width: '100%', textAlign: 'left' }}
                      >
                        {item.niname}
                      </span>
                      <span
                        className="t-20 l-28 t-sub"
                        style={{ width: '100%', textAlign: 'left' }}
                      >
                        签到时间: {Utils.date('H:i:s', item.createTime)}
                      </span>
                    </Flex>
                  </Flex.Item>
                </Flex>
                <span className="t-primary t-24 l-28 t-m">+15积分</span>
              </Flex>
            ))}
        </div>
      </div>

      <style jsx global>{`
        .style-157920 {
          margin-top: -1.04rem;
          padding: 0.1rem ${Styles.md} 0.56rem ${Styles.md};
        }
        .list {
          min-height: 5rem;
          padding: 0rem 0.5rem 0.48rem 0.5rem;
          background: ${Styles.color_theme};
          border-radius: 0 0 0.06rem 0.06rem;
        }
        .sign-pioneer {
          padding: 0.24rem 0;
          border-radius: 0.06rem 0.06rem 0 0;
          border-bottom: 0.01rem solid #e9e9e9;
          background-color: ${Styles.color_theme};
        }
        .img-cup {
          width: 0.28rem;
          height: 0.28rem;
        }
        .face-icon {
          border-radius: 50%;
        }
        .p-ranking {
          width: 0.34rem;
          height: 0.48rem;
          line-height: 0.48rem;
          display: block;
          color: #556475;
          text-align: center !important;
        }
        .mt-32 {
          margin-top: 0.32rem;
          height: 0.72rem;
        }
      `}</style>
    </div>
  );
};
List.contextTypes = {
  $: PropTypes.object
};

export default observer(List);
