import axios, { CancelToken } from 'axios';
import { getUserAccessToken } from '@/utilities';

const apiUrl = _config.urls.api;

export default class BaseService {
  constructor(path, type) {
    this.baseUrl = `${apiUrl}`;
    this.defaultPath = path;
    this.defaultUrl = `${this.baseUrl}/${this.defaultPath}`;
    this.type = type;

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    this.getUrl = (options) => {
      return (options && options.pathMod)
        ? `${this.baseUrl}/${this.defaultPath}/${options.pathMod}`
        : this.defaultUrl;
    };

    this.getAuthHeader = () => {
      return {
        Authorization: getUserAccessToken()
      };
    };
  }

  getCancelTokenSource() {
    return CancelToken.source();
  }

  listResolver(resolve, response, Type) {
    if (Array.isArray(response.data)) {
      resolve(response.data.map(d => new Type(d)));
    } else {
      resolve({
        data: response.data.data.map(d => new Type(d)),
        total: response.data.total,
      });
    }
  }

  query(parameters, options) {
    const url = this.getUrl(options);
    const qs = parameters ? parameters.toQueryString() : '';
    const Type = this.type;
    const headers = {
      Authorization: getUserAccessToken(),
    };

    return new Promise((resolve, reject) => {
      axios.get(`${url}${qs}`, {headers})
        .then((response) => {
          this.listResolver(resolve, response, Type);
        })
        .catch(err => reject(err));
    });
  }

  get(id, options) {
    const url = this.getUrl(options);
    const Type = this.type;
    const headers = {
      Authorization: getUserAccessToken(),
    };

    return new Promise((resolve, reject) => {
      axios.get(`${url}/${id}`, {headers})
        .then(response => resolve(new Type(response.data)))
        .catch(err => reject(err));
    });
  }

  create(item, options) {
    const url = this.getUrl(options);
    const headers = {
      Authorization: getUserAccessToken(),
    };

    return new Promise((resolve, reject) => {
      axios.post(`${url}`, item, {headers})
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });
  }

  update(id, item, options) {
    const url = this.getUrl(options);
    const headers = {
      Authorization: getUserAccessToken(),
    };

    return new Promise((resolve, reject) => {
      axios.put(`${url}/${id}`, item, {headers})
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });
  }

  delete(id, options) {
    const url = this.getUrl(options);
    const headers = {
      Authorization: getUserAccessToken(),
    };

    return new Promise((resolve, reject) => {
      axios.delete(`${url}/${id}`, {headers})
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });
  }
}
