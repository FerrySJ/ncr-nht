//Reference
const express = require("express");
const router = express.Router();
const constance = require("./../constance/constance");
const axios = require("axios");
const moment = require("moment");
const log_input_table = require("../model/master_ng_catagories");
const process_part_table = require("../model/master_part");
const from_table = require("../model/master_process_from");
const section_table = require("../model/master_section");


// ---------------------------------------------------------------

router.get("/test_api", async (req, res) => {
  res.json({ result: "yes", api_result: constance.result_ok });
});

router.post("/check_item_for_lastinven", async (req, res) => {
  try {
    let con = "";
    if (req.body.type === "checked") {
      con = `AND idno = '${req.body.idno}'`;
    } else {
      con = ``;
    }
    let data = await section_table.sequelize.query(
      `SELECT [reqno],[idno],[mfg_date],[item_no],[item_name],[spec],[qty],[location],[type]
      ,[process],[remark],[emp],[status]
      FROM [subcom_stock].[dbo].[inventories]
      WHERE item_no = '${req.body.item_no}' AND spec = '${req.body.spec}' ${con}`
    );
    res.json({ result: data[0], api_result: constance.result_ok });
  } catch (error) {
    res.json({ result: error, api_result: constance.result_nok });
  }
});

module.exports = router;
