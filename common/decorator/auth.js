/**
 * const prefixCls = 'style-344551';
 * const images = '/static/images/common/decorator';
 * @Author: czy0729
 * @Date: 2018-10-31 11:25:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 11:58:24
 * @Path bt_mb_new /common/decorator/auth.js
 */
import React from 'react';
import G from '@stores/g';
import Utils from '@utils';

const AuthDecorator = ComposedComponent =>
  class extends React.Component {
    state = {
      isLogin: false
    };

    componentDidMount() {
      const tk = G.getState('tk');

      if (!tk) {
        Utils.onConfirm(
          '该页面部分信息需要登录后才能正常显示，前往登录?',
          () => {
            G.setJump();
            Utils.router.push('/login');
          },
          undefined,
          () => {}
        );
      } else {
        this.setState({
          isLogin: true
        });
      }
    }

    render() {
      const { isLogin } = this.state;

      if (!isLogin) {
        return null;
      }

      return <ComposedComponent {...this.props} />;
    }
  };

export default AuthDecorator;
