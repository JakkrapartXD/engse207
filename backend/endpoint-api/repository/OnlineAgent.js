const sql = require("mssql");
const sqlConfig = require("../sqlConfig")["production"];

const { v4: uuid } = require("uuid");

console.log("sqlConfig: ", sqlConfig);

async function getOnlineAgentByAgentCode(agentcode) {
  try {
    console.log("agentcode: ", agentcode);

    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .query(
        `SELECT * FROM [OnlineAgents] WHERE [agent_code] = '${agentcode}'`
      ); //@agentcode
    //let result = await pool.request().query(`SELECT * FROM [OnlineAgents] WHERE [agent_code] LIKE '99%'`); //@agentcode

    console.log("result: ", result);

    if (!result || result.recordsets[0].length === 0) {
      console.log("result: ERROR");
      return {
        error: true,
        statusCode: 404,
        errMessage: "Agent not found",
      };
    } else {
      return {
        error: false,
        statusCode: 200,
        data: result.recordset[0],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      statusCode: 500,
      errMessage: "An internal server error occurred",
    };
  }
}

module.exports.OnlineAgentRepo = {
  getOnlineAgentByAgentCode: getOnlineAgentByAgentCode,
};
