

import $http from '@utils/api';
const apiInfo = {
  testApi: {
    url: `/test/user/homework`,
    method: 'get'
  },
  demoApi: {
    url: `/study/mock/test3`,
    method: 'get'
  }
};
export default {
  testApi: (params, options) => {
    return $http(apiInfo.testApi, params, options)
  },
  demoApi: (params, options) => {
    return $http(apiInfo.demoApi, params, options)
  }
}