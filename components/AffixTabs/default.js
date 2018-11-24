/**
 * const prefixCls = 'style-212535';
 * const images = '/static/images/components/AffixTabs';
 * @Author: czy0729
 * @Date: 2018-09-07 16:06:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 14:10:57
 * @Path m.benting.com.cn /components/AffixTabs/default.js
 */
import React from 'react';
import classNames from 'classnames';
import { StickyContainer, Sticky } from 'react-sticky';
import { Tabs } from 'antd-mobile';
import Styles from '@styles';

const prefixCls = 'c-affix-tabs';
const marginLeftMap = {
  0: '0',
  1: '',
  2: '22%',
  3: '13.6%',
  4: '',
  5: '7.25%'
};

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
                  page={tabs.length}
                  tabBarActiveTextColor={Styles.color_main}
                  tabBarInactiveTextColor={Styles.color_sub}
                  tabBarUnderlineStyle={{
                    width: '6%',
                    marginLeft: marginLeftMap[tabs.length],
                    marginBottom: '2%',
                    border: `0.02rem solid ${Styles.color_main}`,
                    transition: 'left 0.3s cubic-bezier(0.86, 0, 0.07, 1)'
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
