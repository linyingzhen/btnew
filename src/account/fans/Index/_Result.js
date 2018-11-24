/**
 * const prefixCls = 'style-972065';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-06 10:19:12
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-06 15:08:27
 * @Path bt_mb_new \src\account\fans\Index\_Result.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Result, Button } from '@components';
import Utils from '@utils';

const _Result = (props, { $ }) => {
  const { state } = $.getState('fans');
  return (
    <>
      {state == '1' && (
        <div>
          <Result
            image="/static/svg/等待.svg"
            title="提交成功"
            desc={
              <>
                <span>请耐心等待审核，</span>
                <span
                  className="t-primary"
                  onClick={() => Utils.router.push('/')}
                >
                  返回首页
                </span>
              </>
            }
          />
          <div className="tool-wind mt-d">
            <Button type="primary" onClick={() => Utils.router.back()}>
              返回
            </Button>
          </div>
        </div>
      )}
      {state == '2' && (
        <div>
          <Result
            image="/static/svg/成功.svg"
            title="审核成功"
            desc={
              <>
                <span>恭喜您通过粉丝认证, 您的认证级别</span>
                <span className="t-primary">小咖粉丝</span>
              </>
            }
          />
          <div className="tool-wind mt-d">
            <Button type="primary" onClick={() => $.do.showApple()}>
              升级成为大咖
            </Button>
          </div>
        </div>
      )}
      {state == '3' && (
        <div>
          <Result
            image="/static/svg/失败.svg"
            title="审核失败"
            desc={
              <>
                <span>抱歉, 您的粉丝认证没有通过</span>
              </>
            }
          />
          <div className="tool-wind mt-d">
            <Button type="primary" onClick={() => $.do.showApple()}>
              重新提交
            </Button>
          </div>
        </div>
      )}
      {state == '4' && (
        <div>
          <Result
            image="/static/svg/等待.svg"
            title="重新提交成功"
            desc={
              <>
                <span>请耐心等待审核，</span>
              </>
            }
          />
          <div className="tool-wind mt-d">
            <Button type="primary" onClick={() => Utils.router.push('/person')}>
              返回个人中心
            </Button>
          </div>
        </div>
      )}
      {state == '5' && (
        <div>
          <Result
            image="/static/svg/等待.svg"
            title="提交成功"
            desc={
              <>
                <span>大咖粉丝审核中</span>
                <span
                  className="t-primary"
                  onClick={() => Utils.router.push('/')}
                >
                  返回首页
                </span>
              </>
            }
          />
          <div className="tool-wind mt-d">
            <Button type="primary" onClick={() => Utils.router.back()}>
              返回
            </Button>
          </div>
        </div>
      )}
      {state == '6' && (
        <div>
          <Result
            image="/static/svg/失败.svg"
            title="审核失败"
            desc={
              <>
                <span>抱歉，您的大咖粉丝认证没有通过</span>
              </>
            }
          />
          <div className="tool-wind mt-d">
            <Button type="primary" onClick={() => $.do.showApple()}>
              重新提交
            </Button>
          </div>
        </div>
      )}
      {state == '7' && (
        <div>
          <Result
            image="/static/svg/成功.svg"
            title="审核成功"
            desc={
              <>
                <span>恭喜您通过粉丝认证, 您的认证级别</span>
                <span className="t-primary">大咖粉丝</span>
              </>
            }
          />
          <div className="tool-wind mt-d">
            <Button type="primary" onClick={() => Utils.router.push('/person')}>
              返回个人中心
            </Button>
          </div>
        </div>
      )}
      {state == '8' && (
        <div>
          <Result
            image="/static/svg/失败.svg"
            title="审核失败"
            desc={
              <>
                <span>抱歉, 您已经被移出粉丝认证</span>
              </>
            }
          />
          <div className="tool-wind mt-d">
            <Button type="primary" onClick={() => $.do.showApple()}>
              重新提交
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

_Result.contextTypes = {
  $: PropTypes.object
};

export default observer(_Result);
