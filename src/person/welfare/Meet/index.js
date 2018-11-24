import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Header from './_Header';
import Top from './_Top';
import Tabs from './_Tabs';
import Fixed from './_Fixed';
import store from './store';

const Meet = () => (
  <Layout title="见面有礼" header={<Header />}>
    <Top />
    <Tabs />
    <Fixed />
  </Layout>
);
Meet.contentTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Meet));
