const toDto = (raw, token) => {
  return {
    name: raw.name,
    username: raw.username,
    token: token
  };
};

const fromDto = (dto) => {
  return {
    name: dto.name,
    username: dto.username
  }
};

module.exports = {
  toDto,
  fromDto
};