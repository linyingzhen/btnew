/**
 * const prefixCls = 'style-805166';
 * const images = '/static/images/components/Reward';
 * @Author: czy0729
 * @Date: 2018-07-17 17:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 00:43:10
 * @Path m.benting.com.cn /components/Reward/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List, Flex } from 'antd-mobile';
import Utils from '@utils';
import Styles from '@styles';
import G from '@stores/g';
import Animate from '../Animate';
import Icon from '../Icon';
import Button from '../Button';

const prefixCls = 'c-reward';

export default class Reward extends React.Component {
  static propsTypes = {
    show: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    show: false,
    onSuccess: Function.prototype,
    onCancel: Function.prototype
  };

  state = {
    active: undefined,
    money: '0.00',
    gid: undefined
  };

  componentDidMount() {
    this.fetchGifts(this.props);
    this.fetchAmount(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchGifts(nextProps);
    this.fetchAmount(nextProps);
  }

  fetchAmount = async props => {
    const { show } = props;

    if (show) {
      await G.fetchWalletInfo();
      this.forceUpdate();
    }
  };

  fetchGifts = async props => {
    const { show } = props;

    if (show) {
      await G.fetchGifts();
      this.forceUpdate();
    }
  };

  renderModal() {
    const { onSuccess, onCancel } = this.props;
    const { active, money, gid } = this.state;
    const { sysAmount = 0 } = G.getState('walletInfo');
    const gifts = G.getState('gifts');

    const notEnough = parseFloat(money) > parseFloat(sysAmount);

    return (
      <div className="modal">
        <List>
          <List.Item
            extra={
              <span className="t-32 t-sub" onClick={onCancel}>
                取消
              </span>
            }
          >
            <span className="t-32">打赏礼物</span>
          </List.Item>
        </List>
        <Flex className={`${prefixCls}__wrap`} wrap="wrap">
          {gifts.list.map((item, index) => {
            const price = parseFloat((item.price * 1000) / 100);

            return (
              <div
                key={item.gid}
                className={classNames('item t-c', {
                  active: index === active
                })}
                onClick={() =>
                  this.setState({
                    active: index,
                    money: price,
                    gid: item.gid
                  })
                }
              >
                <img
                  className="img-gift mt-sm"
                  src={Utils.getImgUrl(item.imgs)}
                  alt=""
                />
                <div className="t-28 t-title t-c1">{item.title}</div>
                <div className="t-24 t-primary t-c1">{price}金币</div>
                {active === index && (
                  <Icon
                    className={`${prefixCls}__icon-active t-36 t-primary`}
                    type="check-circle-fill"
                  />
                )}
              </div>
            );
          })}
        </Flex>
        <List className={`${prefixCls}__bottom`}>
          <List.Item
            extra={
              notEnough ? (
                <Button
                  type="primary"
                  inline
                  size="sm"
                  onClick={() => Utils.router.push('/person/wallet/coin/exchange')}
                >
                  去兑换
                </Button>
              ) : (
                <Button
                  type="primary"
                  inline
                  size="sm"
                  disabled={active === undefined}
                  onClick={() =>
                    Utils.onConfirm('确定打赏?', () => onSuccess(gid))
                  }
                >
                  打赏
                </Button>
              )
            }
          >
            <div className="t-28">
              <span>我的金币：</span>
              <span
                className={classNames({
                  't-danger': notEnough,
                  't-primary': !notEnough
                })}
              >
                {sysAmount}
              </span>
              <span className="ml-xs">枚</span>
              {notEnough && <span className="t-sub">（金币不足）</span>}
            </div>
          </List.Item>
        </List>

        <style jsx global>{`
          .c-reward {
          }
          .${prefixCls}__bottom .am-list-body:after {
            content: initial;
          }
          .${prefixCls}__wrap {
            min-height: 4.41rem;
            border-top: ${Styles.border};
          }
          .${prefixCls}__icon-active {
            position: absolute;
            top: 0.12rem;
            right: 0.16rem;
          }
        `}</style>
        <style jsx>{`
          .c-reward {
          }
          .modal {
            position: fixed;
            z-index: ${Styles.z_mask};
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #fff;
          }
          .item {
            position: relative;
            display: inline-block;
            width: 25%;
            height: 2.2rem;
            vertical-align: top;
            overflow: hidden;
          }
          .item:before,
          .item:after {
            content: '';
            display: block;
            position: absolute;
          }
          .item:before {
            top: auto;
            left: 0;
            bottom: 0;
            right: auto;
            width: 100%;
            border-bottom: ${Styles.border};
          }
          .item:after {
            top: 0;
            right: 0;
            bottom: auto;
            left: auto;
            width: 0.01rem;
            height: 100%;
            background-color: ${Styles.color_border};
          }
          .img-gift {
            width: auto;
            height: 0.98rem;
          }
        `}</style>
      </div>
    );
  }

  renderMask() {
    return <div className="am-modal-mask" />;
  }

  render() {
    const { show, className } = this.props;

    return (
      <div className={classNames(prefixCls, className)}>
        <Animate type="fade">{show && this.renderMask()}</Animate>
        <Animate type="bottom">{show && this.renderModal()}</Animate>
      </div>
    );
  }
}
