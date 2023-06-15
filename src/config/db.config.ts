export default {
  HOST: "localhost",
  USER: "elvin",
  PASSWORD: "elvin",
  DB: "todo",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
