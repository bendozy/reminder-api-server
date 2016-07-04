module.exports = {
  default: {
    connector: process.env.DB_TYPE,
    hostname: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    url: process.env.DB_URL,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
};
