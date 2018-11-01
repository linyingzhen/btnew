import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';

export default class Store extends common {
  @observable
  state = this.initState({
    // 邀请记录
    inviteRecord: {},
    list: [
      // { invniname: 'lin', invPhone: '18613021225', createTime: '1533706316', tbId: '123' },
      // { invniname: 'lin', invPhone: '18613021225', createTime: '1533706316', tbId: '124' },
      // { invniname: 'lin', invPhone: '18613021225', createTime: '1533706316', tbId: '125' }
    ],
    totalPoint: 0,
    // pageinfo: { recordtotal: 3 },
    pageinfo: {},
    userRank: {}
  });

  fetch = {
    config: {
      update: ['fetchInviteRecord']
    },
    // 邀请记录
    fetchInviteRecord: async () => {
      const { id } = this.params.params;

      const query = id ? {
        _: {
          limit: 0,
          search: {
            userId: id
          }
        }
      } : {
        _: {
          limit: 0
        }
      };

      const res = Api.PP('get_invite_record', query);
      const data = await res;
      if (data.code !== 0) {
        return false;
      }
      this.setState(data.data.list, 'list');
      this.setState(data.data.totalPoint, 'totalPoint');
      this.setState(data.data.pageinfo, 'pageinfo');
      this.setState(data.data.userRank, 'userRank');

      return data;
    }
  };
}
