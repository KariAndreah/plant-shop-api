const Client = require("pg").Client;

const client = new Client({
  host: "ec2-54-208-11-146.compute-1.amazonaws.com",
  user: "jawbmdvkeprvrt",
  port: 5432,
  password: "0150fae96ea19ee694268cf43b8be2b929b16b1bcc6e85a60b591377fe4e97eb",
  database: "d2v456466obnas",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

module.exports = client;
