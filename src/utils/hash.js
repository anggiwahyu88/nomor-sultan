const md5 = require("md5");

export function hash(title) {
  console.log(`${process.env.Salt}${title}${process.env.Salt}`)
  return md5(`${process.env.Salt}${title}${process.env.Salt}`);
}
