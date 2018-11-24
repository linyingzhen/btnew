/**
 * const prefixCls = 'style-133496';
 * const images = '/static/images/src/_/Author';
 * @Author: czy0729
 * @Date: 2018-07-04 16:51:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 16:44:38
 * @Path m.benting.com.cn /src/_/Author/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';
import Const from '@const';
import Avatar from '../Avatar';
import Level from '../Level';
import { images } from './ds';

const prefixCls = 'src-author';

const Author = props => {
  const {
    userId,
    img,
    name,
    level,
    fansAuth,
    date,
    left,
    right,
    vip,
    role,
    className,
    ...other
  } = props;

  return (
    <Flex className={classNames(prefixCls, className)} {...other}>
      <Avatar userId={userId} img={img} vip={vip} />
      <div
        className={classNames({
          'ml-sm': !!img
        })}
      >
        <Flex>
          <p className="t-30 l-44 t-title">{name}</p>
          {role == 1 && (
            <img
              className="img-admin ml-8"
              src={`${images}/admin${Const.__IMG_DPR__}.png`}
              alt=""
            />
          )}
          <Level className="ml-8" value={level} />
        </Flex>
        <p className="t-24 l-36 t-sub t-c1">
          {left && <span>{left}</span>}
          {date && <span>{date}</span>}
          {right && <span>{right}</span>}
        </p>
      </div>

      <style jsx>{`
        .src-author {
        }
        .img-admin {
          width: 0.4rem;
          height: 0.44rem;
        }
      `}</style>
    </Flex>
  );
};

export default Author;
