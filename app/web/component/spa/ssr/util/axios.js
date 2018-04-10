import axios from 'axios';

export const createAxios = (headers) => {
  return axios.create({
    // url: url,
    // method: method,
    baseURL: '/api',
    headers: headers,
    // params: params,
    // data: data,
    timeout: 10000,
    responseType: 'json',
    xsrfCookieName: 'csrfToken',
    xsrfHeaderName: 'x-csrf-token'
    // proxy: {
    //   host: '127.0.0.1',
    //   port: 9000,
    //   auth: {
    //     username: 'mikeymike',
    //     password: 'rapunz3l'
    //   }
    // }
  });
};

export const instance = '';

/*export const instance = axios.create({
  // url: url,
  // method: method,
  baseURL: '/api',
  // headers: {
  //   'x-csrf-token': ''
  // },
  // params: params,
  // data: data,
  timeout: 10000,
  responseType: 'json',
  xsrfCookieName: 'csrfToken',
  xsrfHeaderName: 'x-csrf-token'
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 9000,
  //   auth: {
  //     username: 'mikeymike',
  //     password: 'rapunz3l'
  //   }
  // }
});*/
