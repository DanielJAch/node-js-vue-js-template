import BaseService from './baseService';
import Example from '@/models/example';

export class ExampleService extends BaseService {
  constructor() {
    super('example', Example);
  }
}

export default new ExampleService();
