import axios from 'axios';
import BaseService from './baseService';
import Example from '@/models/example';
import config from '../../../config';
import { getUserAccessToken } from '@/utilities';
import Identity from '@/models/identity';

export class AuthService extends BaseService {
  constructor() {
    super('auth', Example);
  }

  login(username, password) {
    const options = { pathMod: 'login' };
    const url = this.getUrl(options);
    const auth = window.btoa(`${config.clientId}:${config.clientSecret}`);
    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = 'grant_type=password&' +
      `scope=${encodeURI(config.scope)}&` +
      `username=${encodeURI(username)}&` +
      `password=${encodeURIComponent(password)}&` +
      'clientId=web';

    return axios.post(url, data, { headers });
  }

  getUser() {
    const options = { pathMod: 'userinfo' };
    const url = this.getUrl(options);
    const headers = {
      Authorization: getUserAccessToken(),
    };

    return new Promise((resolve, reject) => {
      axios.get(url, {headers})
        .then((response) => {
          resolve(new Identity(response.data));
        })
        .catch(err => reject(err));
    });
  }

  refreshToken() {
    const options = { pathMod: 'refresh' };
    const url = this.getUrl(options);
    const headers = {
      Authorization: getUserAccessToken(),
    };

    return axios.post(url, {}, { headers });
  }

  logout() {
    const options = { pathMod: 'logout' };
    const url = this.getUrl(options);
    const headers = {
      Authorization: getUserAccessToken(),
    };

    return axios.get(url, { headers });
  }
}

export default new AuthService();