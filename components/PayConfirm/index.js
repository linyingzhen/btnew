/**
 * const prefixCls = 'style-150023';
 * const images = '/static/images/components/PayConfirm';
 * @Author: czy0729
 * @Date: 2018-07-14 23:46:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 16:16:57
 * @Path m.benting.com.cn /components/PayConfirm/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal, List } from 'antd-mobile';
import Utils from '@utils';
import Styles from '@styles';
import G from '@stores/g';
import Button from '../Button';

const prefixCls = 'c-pay-confirm';

export default class Payconfirm extends React.Component {
  static propsTypes = {
    // 余额、金币、本汀积分、灵动积分
    type: PropTypes.oneOf(['amount', 'coin', 'bt', 'nido']),
    dataType: PropTypes.any, // 灵动余额、本汀余额 1,2
    show: PropTypes.bool,
    loading: PropTypes.bool,
    amount: PropTypes.any,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func
  };

  static defaultProps = {
    type: 'amount',
    dataType: 2,
    show: false,
    loading: false,
    amount: 0,
    onClose: Function.prototype,
    onConfirm: Function.prototype
  };

  componentDidMount() {
    this.fetchAmount(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchAmount(nextProps);
  }

  fetchAmount = async props => {
    const { show, type } = props;

    if (show) {
      if (type === 'bt' || type === 'nido') {
        await G.fetchUserInfo();
      } else {
        await G.fetchWalletInfo();
      }

      this.forceUpdate();
    }
  };

  render() {
    const { type, dataType, show, amount, onClose, onConfirm } = this.props;
    const { btscore = 0, point = 0 } = G.getState('userInfo');
    const walletInfo = G.getState('walletInfo');
    const { btAmount = 0, sysAmount = 0 } = walletInfo;
    const nidosportAmount = walletInfo.amount || 0;

    let userAmount;
    let payWay;
    let ext;
    let btnText;
    let btnUrl;
    let _userAmount;
    const _dataType = parseInt(dataType);

    switch (type) {
      case 'amount':
        userAmount =
          _dataType === 1 ? parseFloat(nidosportAmount) : parseFloat(btAmount);
        payWay = _dataType === 1 ? '灵动余额支付' : '本汀余额支付';
        ext = '元';
        btnText = _dataType === 1 ? '前往划转灵动余额' : '前往充值';
        btnUrl = _dataType === 1 ? '/person/wallet/exchange' : '/pay/do';
        _userAmount = userAmount.toFixed(2);
        break;

      case 'coin':
        userAmount = parseFloat(sysAmount);
        payWay = '金币支付';
        ext = '金币';
        btnText = '前往兑换金币';
        btnUrl = '/person/wallet/coin/exchange';
        _userAmount = userAmount.toFixed(2);
        break;

      case 'bt':
        userAmount = parseInt(btscore);
        payWay = '本汀积分支付';
        ext = '积分';
        btnText = '消费本汀产品可获得，前往登记';
        btnUrl = '/service';
        _userAmount = userAmount;
        break;

      case 'nido':
        userAmount = parseInt(point);
        payWay = '灵动积分支付';
        ext = '积分';
        btnText = '灵动平台各种玩法和活动获得';
        _userAmount = userAmount;
        break;

      default:
        break;
    }

    const isEnough = userAmount >= amount;

    return (
      <Modal popup visible={show} animationType="slide-up" onClose={onClose}>
        <List
          className={`${prefixCls}__list`}
          renderHeader={() => (
            <div className={`${prefixCls}__header`}>
              <span>结算</span>
              <span className="btn-cancel" onClick={onClose}>
                取消
              </span>
            </div>
          )}
        >
          <List.Item className="t-desc" extra={payWay}>
            付款方式
          </List.Item>
          <List.Item
            className={classNames({
              't-desc': isEnough,
              't-danger': !isEnough
            })}
            extra={
              <span
                className={classNames({
                  't-danger': !isEnough
                })}
              >
                {_userAmount}
                {ext}
              </span>
            }
          >
            余额
          </List.Item>
          <List.Item
            className="t-desc"
            extra={
              <span>
                {parseFloat(amount).toFixed(2)}
                {ext}
              </span>
            }
          >
            需支付
          </List.Item>
          <List.Item>
            {isEnough ? (
              <Button type="main" onClick={onConfirm}>
                确认支付
              </Button>
            ) : (
              <Button
                type="primary"
                disabled={!btnUrl}
                onClick={() => {
                  if (btnUrl) {
                    if (btnUrl === '/person/wallet/pay') {
                      Utils.goToPay();
                    } else if (btnUrl.indexOf('https://') !== -1) {
                      window.location = btnUrl;
                    } else {
                      Utils.router.push(btnUrl);
                    }
                  }
                }}
              >
                {btnText}
              </Button>
            )}
          </List.Item>
        </List>

        <style jsx global>{`
          .c-pay-confirm {
          }
          .${prefixCls}__header {
            position: relative;
          }
          .${prefixCls}__list .am-list-body {
            border-top: ${Styles.border} !important;
          }
        `}</style>
        <style jsx>{`
          .c-pay-confirm {
          }
          .btn-cancel {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
          }
        `}</style>
      </Modal>
    );
  }
}
