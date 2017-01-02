// Settings for database access.
const dbConfig = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DBNAME: process.env.DB_NAME,
  DOMAIN: process.env.DB_URL,
  PORT: process.env.DB_PORT,
};

// Store database connection string in dbConfig.
dbConfig.CONNSTRING = `mongodb://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.DOMAIN}:${dbConfig.PORT}/${dbConfig.DBNAME}`;

// Export config.
module.exports = dbConfig;
