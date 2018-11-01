/**
 * const prefixCls = 'style-711047';
 * const images = '/static/images/src/_/VideoCarousel';
 * @Author: czy0729
 * @Date: 2018-09-06 17:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 18:45:29
 * @Path m.benting.com.cn /src/_/VideoCarousel/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Carousel, Img, Flex, Link } from '@components';
import { Header } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-711047';

const _VideoCarousel = props => {
  const { title, data, href, as, className } = props;

  const listOne = [];
  const listTwo = [];
  data.list.filter((item, index) => index < 6).forEach((item, index) => {
    if (index < 3) {
      listOne.push(item);
    } else {
      listTwo.push(item);
    }
  });

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title={title} href={href} as={as} />
      <div className="tool-wrap-no-top">
        {!!listOne.length && (
          /* eslint-disable-next-line */
          <Carousel.Origin infinite={false} autoplay={false} height="5.48rem">
            {[listOne, listTwo].map((item, index) => (
              /* eslint-disable-next-line */
              <div key={index}>
                {item.map((i, idx) => (
                  <Link
                    key={i.tbId}
                    className={classNames({
                      'mt-32': idx > 0
                    })}
                    href={`/video/detail?id=${i.tbId}`}
                    as={`/video/detail/${i.tbId}`}
                    block
                  >
                    <Flex align="start">
                      <Img
                        className={`${prefixCls}__poster`}
                        src={Utils.getAppImgUrl(i.fileinfo.surface)}
                      />
                      <Flex.Item>
                        <p className="t-30 l-42 t-c2">{i.tit}</p>
                        <p className="t-24 l-34 t-sub mt-8">
                          浏览
                          {i.viewCount} / 点赞
                          {i.likeCount}
                        </p>
                        {/* {i.from == 0 && (
                          <Badge
                            className="mt-16"
                            text="官方"
                            style={Styles._badge}
                          />
                        )} */}
                      </Flex.Item>
                    </Flex>
                  </Link>
                ))}
              </div>
            ))}
          </Carousel.Origin>
        )}
      </div>

      <style jsx global>{`
        .style-711047 {
        }
        .${prefixCls}__poster {
          width: 2.2rem !important;
          height: 1.48rem !important;
          border-radius: ${Styles.radius_sm};
        }
      `}</style>
      <style jsx>{`
        .style-711047 {
          height: 7rem;
          background: ${Styles.color_theme};
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default observer(_VideoCarousel);
