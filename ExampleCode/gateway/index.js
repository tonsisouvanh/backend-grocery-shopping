const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/customer", proxy("http://localhost:8101"));
app.use("/shopping", proxy("http://localhost:8103"));
app.use("/", proxy("http://localhost:8102")); //product endpoint

app.listen(8100, () => {
  console.log("Gateway is listening to Port 8100");
});