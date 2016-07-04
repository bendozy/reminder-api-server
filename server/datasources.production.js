module.exports = {
  default: {
    connector: process.env.DB_TYPE,
    hostname: process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
    port: process.env.OPENSHIFT_POSTGRESQL_DB_PORT,
    user: process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME,
    url: process.env.OPENSHIFT_POSTGRESQL_DB_URL,
    password: process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD,
    database: process.env.DB_NAME
  }
};
console.log(process.env.PENSHIFT_POSTGRESQL_DB_URL);
