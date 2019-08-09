const toDto = (raw) => {
  return {
    name: raw.name,
    username: raw.username
  };
};

const fromDto = (dto) => {
  name: dto.name,
  username: dto.username
};

module.exports = {
  toDto,
  fromDto
};