export default class Example {
  constructor(dto) {
    this.id = dto.id || null;
    this.name = dto.name || null;
    this.description = dto.description || null;
  }

  get toDto() {
    return {
      id: this.id,
      name: this.name,
      description: this.description
    };
  }
}