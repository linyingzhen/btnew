import React from 'react';
import { observer } from '@';
import { Header, Flex } from '@components';
import Styles from '@styles';

const _Header = () => (
  <Header
    show
    bd={
      <Flex justify="center">
        <p className="t-34 l-48 t-void t-c">见面有礼</p>
      </Flex>
    }
    style={{
      color: Styles.color_theme,
      background: Styles.color_main
    }}
  />
);

export default observer(_Header);
