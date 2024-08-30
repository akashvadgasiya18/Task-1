const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Routes/router");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

require("./db/conn");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(router);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.listen(PORT, () => {
  console.log(`server is connected on port ${PORT}`);
});
