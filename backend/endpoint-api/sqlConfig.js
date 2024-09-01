var dbconfig = {
  production: {
    server: "10.21.43.203",
    database: "team4_web_labDB",
    user: "sa",
    password: "P@ssw0rd",
    port: 1433,
    options: {
      encript: true,
      setTimeout: 12000,
      enableArithAbort: true,
      trustServerCertificate: true,
      trustedconnection: true,
      instancename: "10.21.43.203", // SQL Server instance name
    },
  },
  development: {
    server: "192.168.56.106",
    database: "team4_web_labDB",
    user: "sa",
    password: "P@ssw0rd",
    port: 1433,
    options: {
      encript: true,
      setTimeout: 12000,
      enableArithAbort: true,
      trustServerCertificate: true,
      trustedconnection: true,
      instancename: "192.168.56.106", // SQL Server instance name
    },
  },
};
module.exports = dbconfig;
