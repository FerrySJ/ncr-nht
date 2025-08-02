//Reference
const { Sequelize } = require("sequelize");

//SQL Connection
const database = require("../instance/db");

//Create Table in SQL
//ชื่อตั่วแปร Const ต้องตรงกับข้างล่าง
const ng_catagories_table = database.define(
  // table name
  "master_ng_catagories",
  {
    registered_at: {
      type: Sequelize.DATE,
    },
    catagories: {
      type: Sequelize.STRING,
    },
    emp_update: {
      type: Sequelize.STRING,
    },
  },
  {
    //option
    // do not delete
    timestamps : false,
  }
);

//True : Delete then Create 
//False : Only Check then Create 

//ชื่อตั่วแปร await,module.exports  ต้องตรงกับข้างบน
(async () => {
  await ng_catagories_table.sync({ force: false });
})();

module.exports = ng_catagories_table;
