/* eslint-disable no-param-reassign */
/**
 * const prefixCls = 'style-181493';
 * const images = '/static/images/components/Form/CityPicker';
 * @Author: czy0729
 * @Date: 2018-09-19 14:40:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-19 14:43:50
 * @Path m.benting.com.cn /components/Form/CityPicker/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Picker from '../Picker';
import province from './province';
import city from './city';
import area from './area';

const prefixCls = 'c-form-city-picker';
const ds = province.map(p => {
  p = p.name;

  const citys = [];
  if (city[p]) {
    city[p].forEach(c => {
      const areas = [];

      if (c == p) c = '市辖区';

      if (area[p][c]) {
        area[p][c].forEach(a => {
          areas.push({
            label: a,
            value: a
          });
        });
      }

      citys.push({
        label: c,
        value: c,
        children: areas
      });
    });
  }

  return {
    label: p,
    value: p,
    children: citys
  };
});

const CityPicker = props => {
  const { className, cols = 3, ...other } = props;

  return (
    <Picker
      className={classNames(prefixCls, className)}
      cols={cols}
      data={ds}
      format={values =>
        values
          .filter(item => item !== '市辖区' && item !== '省直辖县级行政区划')
          .join(' ')
      }
      {...other}
    />
  );
};

export default CityPicker;
