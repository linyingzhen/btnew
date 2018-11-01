import { observable } from 'mobx';
import common from '@stores/commonV2';
import Const from '@const';

export default class Store extends common {
  @observable
  state = this.initState({
    // 售后卡记录
    consumerCardList: Const.__EMPTY__
  });

  fetch = {
    config: {
      update: ['fetchConsumerCardList']
    },
    fetchConsumerCardList: refresh => {
      this.fetchListThenSetState(
        'get_consumer_card-list',
        'consumerCardList',
        {
          _: {
            order: Const.__LIMIT__,
            search: {
              grantState: 1
            }
          }
        },
        refresh
      );
    }
  };
}
