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

router.get("/master_part", async (req, res) => {
    try {
        let data = await section_table.sequelize.query(
            `
        SELECT DISTINCT
            ([part]) AS part
        FROM
        [NCR].[dbo].[master_parts]
        ORDER BY
            part ASC

`
        );
        res.json({ result: data[0], api_result: constance.result_ok });
    } catch (error) {
        res.json({ result: error.message, api_result: constance.result_nok });
    }
});

router.get("/master_catagories", async (req, res) => {
    try {
        let data = await section_table.sequelize.query(
            `
            SELECT DISTINCT
                ([catagories])
            FROM
            [NCR].[dbo].[master_ng_catagories]
            ORDER BY
                catagories ASC

  `
        );
        res.json({ result: data[0], api_result: constance.result_ok });
    } catch (error) {
        res.json({ result: error.message, api_result: constance.result_nok });
    }
});

router.get("/master_process", async(req, res) => {
    try {
        let data = await section_table.sequelize.query(
            `
        SELECT DISTINCT([process]) AS process
        FROM
        [NCR].[dbo].[master_process_origins]
        ORDER BY
        [process] ASC

`
        )
        
        res.json({ result: data[0], api_result: constance.result_ok })
    } catch (error) {
        res.json({ result: error.message, api_result: constance.result_nok })
    }
})
module.exports = router;
