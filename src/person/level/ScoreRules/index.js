import React from 'react';
import { Layout } from '@_';

const _ScoreRules = () => (
  <Layout title="得分规则">
    <ul className="rulebox">
      <li>
        <h3 className="t-34 mt-24">什么是灵动积分</h3>
        <div className="t-28 t-sub">
          灵动积分可以让用户可以随着我们一起升级和进步的数值，积分总值代表您的等级，还能使用于灵动的各种玩法，以后还会开通更多灵动积分的用法。
        </div>
      </li>
      <li>
        <h3 className="t-34 mt-24">灵动积分怎么获得</h3>
        <div className="t-28 t-sub">
          <ul className="getbox">
            <li>发现发布每天前3次每次加1分。</li>
            <li>动吧发布每天只有第1次加5分。</li>
            <li>发现或动吧回复一次可得1分，回复同一个发现或帖子只能得一分。</li>
            <li>发现或动吧选为精选额外加20分。</li>
            <li>同一个发现或帖子每10个赞加1分。</li>
            <li>每日签到每次随机5-10分，前10名还能获得排名积分奖励。</li>
            <li>活动加积分，具体查看相关活动板块。</li>
          </ul>
        </div>
      </li>
      <li>
        <h3 className="t-34 mt-24">灵动积分的扣减</h3>
        <div className="t-28 t-sub">
          <ul className="getbox">
            <li>发现发布无意义视频，图文每次扣1分。（超过3次每次扣2分）。</li>
            <li>动吧发布无意义帖子每次扣5分。（超过3次每次扣10分）。</li>
          </ul>
        </div>
      </li>
    </ul>
    <style jsx>{`
      .rulebox {
        padding: 0 0.8rem;
      }
      .getbox {
        list-style-type: decimal;
        padding-left: 1.6em;
      }
    `}</style>
    <style jsx global>{`
      body {
        background: #fff;
      }
    `}</style>
  </Layout>
);

export default _ScoreRules;
