const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./api/api_test1");

app.use(bodyParser.json()); //ทำให้ API เห็น body ได้
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "./files")));
app.use(cors());
// const router = require("./api/api_test1");
app.use("/", router);
app.use("/test_api", require("./api/api_test1"));
app.use("/api_master", require("./api/api_master"));
//================================================
// js run at port 2026
// app.listen(4013, () => {
  const PORT = process.env.PORT || 1001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
