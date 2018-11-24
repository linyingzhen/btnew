/**
 * const prefixCls = 'style-150092';
 * const images = '/static/images/src/shop/_/Menu';
 * @Author: czy0729
 * @Date: 2018-09-29 17:10:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-19 09:36:47
 * @Path m.benting.com.cn /src/shop/_/Menu/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import UI from '@stores/ui';

const prefixCls = 'style-150092';

export default
@observer
class Menu extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  state = {
    typeId: this.props.defaultExpand || '',
    parId: this.props.defaultExpand,
    id: this.props.id || ''
  };

  componentWillUnmount() {
    UI.hideMask();
  }

  toggleMenu = newTypeId => {
    const { typeId } = this.state;

    this.setState({
      typeId: typeId === newTypeId ? '' : newTypeId
    });
  };

  render() {
    const { $ } = this.context;
    const { router = 'push' } = this.props;
    const { list, _loaded } = $.getState('shopCategory');
    const { typeId, parId, id } = this.state;

    if (!_loaded) {
      return null;
    }

    return (
      <div className={prefixCls}>
        <div className="wrap">
          <Flex
            className={`${prefixCls}__item`}
            align="start"
            onClick={() => {
              Utils.router[router]('/shop');
              UI.hideMask();
            }}
          >
            <Flex.Item className="t-32 l-48 t-void">商城首页</Flex.Item>
            <Icon className="t-32 l-48 t-void" type="right" />
          </Flex>
          {list.map(item => {
            const showChild = typeId === item.typeId && item.children;

            return (
              <Flex
                key={item.typeId}
                className={`${prefixCls}__item`}
                align="start"
                onClick={() => {
                  if (item.children) {
                    this.toggleMenu(item.typeId);
                  } else {
                    Utils.router[router](
                      `/shop/category?id=${item.typeId}`,
                      `/shop/category/${item.typeId}`
                    );
                    UI.hideMask();
                  }
                }}
              >
                <Flex.Item>
                  <p
                    className={classNames('t-32 l-48', {
                      't-void': item.typeId != parId,
                      't-event': item.typeId == parId
                    })}
                  >
                    {item.typeName}
                  </p>
                  {showChild && (
                    <div className="wrap-child">
                      {item.children.map(i => (
                        <Flex
                          key={i.typeId}
                          className={`${prefixCls}__item`}
                          onClick={() => {
                            Utils.router[router](
                              `/shop/category?id=${i.typeId}`,
                              `/shop/category/${i.typeId}`
                            );
                            UI.hideMask();
                          }}
                        >
                          <Flex.Item>
                            <p
                              className={classNames('t-28 l-48', {
                                't-void': i.typeId != id,
                                't-event': i.typeId == id
                              })}
                            >
                              {i.typeName}
                            </p>
                          </Flex.Item>
                          <Icon className="t-32 l-48 t-void" type="right" />
                        </Flex>
                      ))}
                    </div>
                  )}
                </Flex.Item>
                <Icon
                  className="t-32 l-48 t-void"
                  type={typeId === item.typeId ? 'up' : 'right'}
                />
              </Flex>
            );
          })}
        </div>
        <div className="wrap-hide tool-wrap-icon mt-lg" onClick={UI.hideMask}>
          <Icon className="t-48 t-void" type="cross" />
        </div>

        <style jsx global>{`
          .style-150092 {
            position: relative;
            width: 100vw;
            height: 100vh;
            padding: 0.56rem;
            background: ${Styles.color_desc};
          }
          .${prefixCls}__item {
            padding: 0.24rem 0;
            border-top: ${Styles.border};
          }
          .${prefixCls}__item:first-child {
            border-top: 0;
          }
        `}</style>
        <style jsx>{`
          .style-150092 {
          }
          .wrap {
            overflow-x: hidden;
            overflow-y: scroll;
            height: 80vh;
          }
          .wrap-child {
            padding-left: ${Styles.md};
            margin-top: ${Styles.sm};
            margin-right: -${Styles.md};
          }
          .wrap-hide {
            position: absolute;
            bottom: 5vh;
            left: 50%;
            transform: translateX(-50%);
          }
        `}</style>
      </div>
    );
  }
}
