import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Icon, Flex, Img, Button } from '@components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ShareList from './_List';
import Header from './_Header';
import SMSMask from './_SMSMask';
import store from './store';
import Styles from '@styles';
import Utils from '@utils';
import UI, { images } from './ds';

@injectV2(store)
@observer
export default class Share extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };
  render() {
    const { $ } = this.context;
    const code = $.getState('code');
    const { smsWindow } = $.getState();
    return (
      <Layout title="推广邀请" header={<Header />}>
        <Flex
          justify="center"
          style={{ overflow: 'initial', background: Styles.color_main }}
        >
          <p
            className="qr-bg"
            onClick={() => {
              UI.showMask({
                children: (
                  <Flex direction="column">
                    <Img key="0" src={`${images}/code.jpg`} size="4rem" />
                    <p key="1" className="mt-md">
                      截图发送二维码给好友
                    </p>
                    <Icon
                      key="2"
                      className="mt-128 t-32"
                      type="cross"
                      onClick={UI.hideMask}
                    />
                  </Flex>
                )
              });
            }}
          >
            <Icon type="qrcode" className="qr t-void" />
          </p>
        </Flex>
        <div className="main">
          <div className="con">
            <p className="t-c t-30 l-80">使用二维码邀请</p>
            <ul className="nums">
              {
                code.split('').map((item, index) =>
                  <li
                    /* eslint-disable-next-line */
                    key={index}
                  >
                    {item}
                  </li>)
              }
            </ul>
            <p className="t-30 p-42 t-c mt-md">
              邀请码
              <span className="t-danger">(好友注册填写)</span>
            </p>
            <CopyToClipboard
              text={code}
              onCopy={() => Utils.light('已复制')}
            >
              <Flex justify="center" className="mt-sm">
                <Button type="primary" size="md" inline>
                复制邀请码
                </Button>
              </Flex>
            </CopyToClipboard>

            <p className="line mt-lg" />
            <ShareList />
          </div>
        </div>
        <SMSMask show={smsWindow} />
        <style jsx>{`
          .qr-bg {
            padding: 0.8rem;
            transform: translateY(40px);
            border-radius: 50%;
            border: 0.15rem solid ${Styles.color_void};
            box-shadow: 0px 0.04rem 0.14rem 0px rgba(46, 142, 255, 0.2);
            background: ${Styles.color_primary};
          }
          .main {
            padding: .6rem ${Styles.wind} ${Styles.wind};
          }
          .con {
            width: 100%;
            padding: 1rem 0.5rem 0.32rem 0.5rem;
            margin-top: -120px;
            background: #fff;
            border-radius: 5px;
          }
          .line {
            border-bottom: 2px dashed #e9e9e9;
          }
          .nums {
            display: flex;
            height: 1.38rem;
            list-style: none;
            color: ${Styles.color_void};
            font-size: ${Styles.t_48};
            text-align: center;
          }
          .nums li {
            display: inline-block;
            width: 0.84rem;
            height: 1.38rem;
            line-height: 1.38rem;
            background: #404040;
            border-radius: 0.04rem;
            margin-right: 0.16rem;
          }
        `}</style>
        <style jsx global>{`
          .qr {
            font-size: 0.8rem !important;
          }
          .t-title {
            color: #fff !important;
            border: none !important;
          }
          .code-img {
            width: 0.7rem;
            height: 1.1rem;
          }
          .am-modal-mask {
            background-color: rgba(255, 255, 255, 0.97);
          }
        `}</style>
      </Layout>
    );
  }
}
