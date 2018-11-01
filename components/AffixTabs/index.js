/**
 * const prefixCls = 'style-103463';
 * const images = '/static/images/components/AffixTabs';
 * @Author: czy0729
 * @Date: 2018-07-04 14:30:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-05 22:47:24
 * @Path m.benting.com.cn /components/AffixTabs/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { StickyContainer, Sticky } from 'react-sticky';
import Styles from '@styles';
import Tabs from '../Tabs';

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
                  background: Styles.color_theme,
                  borderBottom: Styles.border,
                  ...style,
                  zIndex: Styles.z_header
                }}
              >
                {extra && <div className="extra">{extra}</div>}
                <Tabs.DefaultTabBar {...props} />
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
