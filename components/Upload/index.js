/**
 * const prefixCls = 'style-989702';
 * const images = '/static/images/components/Upload';
 * @Author: czy0729
 * @Date: 2018-07-05 17:14:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-26 18:51:56
 * @Path m.benting.com.cn /components/Upload/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Upload from 'rc-upload';
import Api from '@api';
import Const from '@const';
import G from '@stores/g';

const prefixCls = 'c-upload';
const qiniuConfig = {
  token: '',
  isFetching: false,
  cbToken: '',
  isCbFetching: false
};

export default class _Upload extends React.Component {
  componentDidMount() {
    // 七牛token只会请求一次
    // 七牛分为需要callback和不需要callback两种情况
    const { needCb, qiniu } = this.props;

    if (needCb) {
      if (qiniu && !qiniuConfig.cbToken) {
        qiniuConfig.isCbFetching = true;
        this.getCbToken();
      }
    } else if (qiniu && !qiniuConfig.token) {
      if (!qiniuConfig.isFetching) {
        qiniuConfig.isFetching = true;
        this.getToken();
      }
    }
  }

  getToken = async () => {
    const data = await Api.P('get_qiniu_token');

    qiniuConfig.token = data;
    qiniuConfig.isFetching = false;
  };

  getCbToken = async () => {
    const data = await Api.P('get_qiniu_token', {
      notify: 2
    });

    qiniuConfig.cbToken = data;
    qiniuConfig.isCbFetching = false;
  };

  render() {
    const {
      accept = 'image/jpeg,image/jpg,image/png,image/gif,image/*',
      data,
      qiniu,
      qiniuFileKey,
      needCb,
      className,
      children,
      ...other
    } = this.props;

    if (qiniu) {
      return (
        <Upload
          className={classNames(prefixCls, className)}
          name="file"
          data={
            needCb
              ? {
                key: qiniuFileKey,
                token: qiniuConfig.cbToken
              }
              : {
                key: qiniuFileKey,
                token: qiniuConfig.token
              }
          }
          // action={
          //   window.location.protocol === 'https:'
          //     ? 'https://upload-z2.qbox.me'
          //     : 'http://upload-z2.qiniu.com'
          // }
          action={
            window.location.protocol === 'https:'
              ? 'https://upload-z2.qiniup.com'
              : 'http://upload-z2.qiniup.com'
          }
          multiple={false}
          accept={accept}
          {...other}
        >
          {children}

          <style jsx global>{`
            .c-upload {
              display: inline-block;
            }
          `}</style>
        </Upload>
      );
    }

    return (
      <Upload
        className={classNames(prefixCls, className)}
        name="data"
        data={{
          ...data,
          tk: G.getState('tk')
        }}
        action={`${Const.__API__}/file/upload/`}
        multiple={false}
        accept={accept}
        {...other}
      >
        {children}

        <style jsx global>{`
          .c-upload {
            display: inline-block;
          }
        `}</style>
      </Upload>
    );
  }
}
