import axios from 'axios'

axios.defaults.baseURL = 'http://157.122.54.189:9083'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(config);
    // 在发送请求之前做些什么
    // 做点什么 ？设置token的请求头的传递
    // Authorization: localStorage.getItem('heimatoutiao_token')
    let token = localStorage.getItem('heimatoken')
    if (token) {
      config.headers.Authorization = token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log(response);
    if (response.data.message == '用户信息验证失败!' || response.data.message == '用户信息验证失败') {
      Toast.fail('用户信息验证失败!')
      // this.$router.push({ name: 'login' })
      window.location.href = '#/login'
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios