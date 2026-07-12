import bcrypt, { genSaltSync } from 'bcrypt';

const saltrounds = 10;
export const hashing = (password) => {
  const salt = bcrypt.genSaltSync(saltrounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePass = (plain, hashed) => bcrypt.compareSync(plain, hashed);
