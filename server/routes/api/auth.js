const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config()
const { auth } = require('express-openid-connect');

app.use(
  auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

module.exports = app;

