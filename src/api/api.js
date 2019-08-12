import axios from 'axios';
import $http from '@utils/api';
const apiInfo = {
  testApi: {
    url: `/test/user/homework`,
    method: 'get'
  },
};
export default {
  testApi: (params, options) => {
    return $http(apiInfo.testApi, params, options)
  }
}