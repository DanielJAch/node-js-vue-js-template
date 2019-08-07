import BaseService from './baseService';
import Example from '@/models/example';

export class AuthenticatedExampleService extends BaseService {
  constructor() {
    super('authenticated-example', Example);
  }
}

export default new AuthenticatedExampleService();