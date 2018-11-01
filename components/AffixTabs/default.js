/**
 * const prefixCls = 'style-212535';
 * const images = '/static/images/components/AffixTabs';
 * @Author: czy0729
 * @Date: 2018-09-07 16:06:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 16:16:14
 * @Path m.benting.com.cn /components/AffixTabs/default.js
 */
import React from 'react';
import classNames from 'classnames';
import { StickyContainer, Sticky } from 'react-sticky';
import { Tabs } from 'antd-mobile';
import Styles from '@styles';

const prefixCls = 'c-affix-tabs';

const AffixTabs = props => {
  const { tabs = [], page = 0, extra, className, children, ...other } = props;

  return (
    <StickyContainer className={classNames(prefixCls, className)}>
      <Tabs
        tabs={tabs}
        page={parseInt(page)}
        renderTabBar={props => (
          <Sticky>
            {({ style }) => (
              <div
                style={{
                  position: 'relative',
                  ...style,
                  zIndex: Styles.z_header
                }}
              >
                {extra && <div className="extra">{extra}</div>}
                <Tabs.DefaultTabBar
                  {...props}
                  page={5}
                  tabBarActiveTextColor={Styles.color_main}
                  tabBarInactiveTextColor={Styles.color_sub}
                  tabBarUnderlineStyle={{
                    width: '6%',
                    marginLeft: '7.25%',
                    marginBottom: '2%',
                    border: `0.02rem solid ${Styles.color_main}`
                  }}
                />
              </div>
            )}
          </Sticky>
        )}
        destroyInactiveTab
        animated={false}
        swipeable={false}
        prerenderingSiblingsNumber={0}
        {...other}
      >
        {children}
      </Tabs>

      <style jsx>{`
        .c-affix-tabs {
        }
        .extra {
          position: absolute;
          z-index: 2;
          top: 50%;
          right: ${Styles.wind};
          transform: translateY(-50%);
        }
      `}</style>
    </StickyContainer>
  );
};

export default AffixTabs;
