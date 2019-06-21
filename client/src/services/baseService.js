import axios, { CancelToken } from 'axios';
import config from '@/config';
// import { getUserAccessToken } from '@/utilities';

const getUrl = function(options) {
  return (options && options.pathMod)
    ? `${this.baseUrl}/${options.pathMod}/${this.defaultPath}`
    : this.defaultUrl;
};

const getAuthHeader = function() {
  return {
    // 'x-access-token': getUserAccessToken()
  };
};

export default class BaseService {
  constructor(path, type) {
    this.baseUrl = `${config.apiUrl}`;
    this.defaultPath = path;
    this.defaultUrl = `${this.baseUrl}/${this.defaultPath}`;
    this.type = type;
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
    const url = getUrl.call(this, options);
    const qs = parameters ? parameters.toQueryString() : '';
    const Type = this.type;

    return new Promise((resolve, reject) => {
      axios.get(`${url}${qs}`, {}, getAuthHeader())
        .then((response) => {
          this.listResolver(resolve, response, Type);
        })
        .catch(err => reject(err));
    });
  }

  get(id, options) {
    const url = getUrl.call(this, options);
    const Type = this.type;

    return new Promise((resolve, reject) => {
      axios.get(`${url}/${id}`, {}, getAuthHeader())
        .then(response => resolve(new Type(response.data)))
        .catch(err => reject(err));
    });
  }

  create(item, options) {
    const url = getUrl.call(this, options);

    return new Promise((resolve, reject) => {
      axios.post(`${url}`, item, getAuthHeader())
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });
  }

  update(id, item, options) {
    const url = getUrl.call(this, options);

    return new Promise((resolve, reject) => {
      axios.put(`${url}/${id}`, item, getAuthHeader())
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });
  }

  delete(id, options) {
    const url = getUrl.call(this, options);

    return new Promise((resolve, reject) => {
      axios.delete(`${url}/${id}`, {}, getAuthHeader())
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });
  }
};