/**
 * const prefixCls = 'style-119594';
 * const images = '/static/images/components/DiscuzContent';
 * @Author: czy0729
 * @Date: 2018-07-11 18:21:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:12:44
 * @Path m.benting.com.cn /components/DiscuzContent/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import ImgView from '../ImgView';

const prefixCls = 'c-discuz-content';

export default class DiscuzContent extends React.Component {
  static propsTypes = {
    imgView: PropTypes.bool
  };

  static defaultProps = {
    imgView: false
  };

  state = {
    showImgView: false,
    imgViewIndex: 0,
    data: []
  };

  componentDidMount() {
    if (Const.__CLIENT__) {
      const { imgView } = this.props;

      if (imgView) {
        document
          .querySelector(`.${prefixCls}-img-view`)
          .addEventListener('click', this.onImgClick);
      }
    }
  }

  componentWillUnmount() {
    if (Const.__CLIENT__) {
      const { imgView } = this.props;

      if (imgView) {
        document
          .querySelector(`.${prefixCls}-img-view`)
          .removeEventListener('click', this.onImgClick);
      }
    }
  }

  onImgClick = e => {
    const { src } = e.target.dataset;

    if (!src) return;

    // 查询所有图片和当前点击图片index
    const imgs = [];
    const imgsNodeList = document.querySelectorAll(
      `.${prefixCls} > img[data-src]`
    );
    imgsNodeList.forEach(item => {
      imgs.push(item.dataset.src);
    });

    this.showImgView(imgs, imgs.findIndex(item => item === src));
  };

  showImgView = (data, imgViewIndex) =>
    this.setState({
      showImgView: true,
      imgViewIndex,
      data
    });

  hideImgView = () =>
    this.setState({
      showImgView: false,
      imgViewIndex: 0,
      data: []
    });

  fixedRichHtml = html => {
    if (!html) return '';

    let _html = html;

    /* ========== 处理旧论坛Discuz电脑端富文本，兼容普通HTML ========== */
    // 去掉Discuz的引用回复样式
    return (_html = _html
      // (1): <div class="quote"><blockquote><font size="2">[url=forum.php?mod=redirect&goto=findpost&pid=1966029&ptid=47643]
      // <font color="#999999">张锦坤 发表于 2017-6-6 13:55</font>[/url]</font>人家说的是弩火天尊福利竿，我的可是真金白银买的</blockquote>
      // </div>快来人啊，有人转卖福利了{:7_347:}
      // (2): <div class="quote"><blockquote><font color="#999999">恋鱼 发表于 2017-6-6 13:44</font><font color="#999999">
      // 看楼上的说法 楼主可要小心啊</font></blockquote></div>人家说的是弩火天尊福利竿，我的可是真金白银买的
      .replace(/\[url([\s\S]*)\d\]/g, '')
      .replace('[/url]', '')

      // 给图片加上域名
      // (1): <font size="5"><font color="darkred">一小片自留地，今年中的小西红柿，结了不少，晒晒！</font></font><font size="5">
      // <div class="attach"><img src="201706/06/095308gtt4ax0hmhuta100.jpg" /></div><div class="attach"><img src="201706/06
      // /095309pidecjxx80yayy95.jpg" /></div><div class="attach"><img src="201706/06/095310x8i03xccn50d4ma5.jpg" /></div>
      // <div class="attach"><img src="201706/06/095311dscqcis7o8vrgsvq.jpg" /></div></font>
      .replace(
        /<img src="/g,
        '<img class="image" src="http://bbs.tw-bt.com/data/attachment/forum/'
      )

      // 把外网链接图片替换成<img />
      // (1): [img=600,372]http://www.qiwen007.com/imgsy/image/2017/0602/6363199832749661772431060.jpg[/img]
      .replace(/\[img.+?\]/g, '<img class="image" src="')
      .replace(/\[\/img\]/g, '" />')

      // 把旧论坛的表情转换，4_开头的表情废弃，用5_的替代
      .replace(/\{:([\d_]+):\}/g, match => {
        const filename = match.replace('{:', '').replace(':}', '');
        let emojiType;

        if (filename.indexOf('4_') !== -1 || filename.indexOf('5_') !== -1) {
          emojiType = 'tool-emoji';
        } else {
          emojiType = 'tool-emoji-lg';
        }

        return `<img class="${emojiType}" src="${
          Const.__EMOJI_PATH__
        }/${filename}.gif" />`;
      })

      // emoji
      .replace(/\[([^[])+\]/g, match => {
        const filename = match.replace('[', '').replace(']', '');

        return `<img class="tool-emoji" src="${
          Const.__EMOJI_PATH__
        }/${filename}.png" />`;
      })

      // 换行
      .replace(/\n/g, '<br />'));
  };

  render() {
    const { html, imgView, className } = this.props;
    const { showImgView, imgViewIndex, data } = this.state;

    if (!html.__html) {
      html.__html = '';
    }

    const fixedhtml = {
      ...html,
      __html: this.fixedRichHtml(html.__html)
    };

    return (
      <div>
        <div
          className={classNames(prefixCls, className, {
            [`${prefixCls}-img-view`]: imgView
          })}
          dangerouslySetInnerHTML={fixedhtml}
        />
        {!!data.length && (
          <ImgView
            show={showImgView}
            current={imgViewIndex}
            data={data.map(item => Utils.getAppImgUrl(item, 'scale'))}
            onClose={this.hideImgView}
          />
        )}

        <style jsx global>{`
          .c-discuz-content {
          }
          .${prefixCls} {
            background-color: #fff;
            word-wrap: break-word;
          }
          .${prefixCls} p {
            font-size: inherit;
            line-height: inherit;
          }
          .${prefixCls} font {
            font-size: ${Styles.font_lg} !important;
            letter-spacing: 0.02rem;
            word-wrap: break-word;
          }
          .${prefixCls} img[smilieid],
          .${prefixCls} .emoji {
            min-width: 0.9rem;
            min-height: 0.9rem;
            margin: ${Styles.xs} ${Styles.xs} 0 ${Styles.xs};
            vertical-align: baseline;
          }
          .${prefixCls} blockquote {
            padding: ${Styles.xs} ${Styles.sm};
            margin-bottom: ${Styles.sm};
            font-size: ${Styles.font_24};
            color: ${Styles.color_font_sub} !important;
            letter-spacing: initial;
            background-color: ${Styles.color_bg};
            border-radius: ${Styles.radius_xs};
            word-wrap: break-word;
          }
          .${prefixCls} blockquote font {
            font-size: ${Styles.font_24} !important;
            letter-spacing: initial;
          }
          .${prefixCls} blockquote font:first-child {
            display: block;
            color: ${Styles.color_font_title};
          }
          .${prefixCls} blockquote br {
            display: none;
          }
          .${prefixCls} .image {
            width: 100%;
            height: initial;
            margin-top: ${Styles.xs};
            margin-bottom: ${Styles.xs};
            vertical-align: top;
            box-shadow: 0.01rem 0.01rem 0.08rem rgba(0, 0, 0, 0.32);
          }
          .${prefixCls} img[data-src] {
            width: 100%;
            margin-top: ${Styles.sm};
          }
        `}</style>
      </div>
    );
  }
}
