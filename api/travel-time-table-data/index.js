const express = require('express');
const { getTableData } = require('./travel-time-table-data.api');
const baseRouteHandler = require('../base-route-handler.api');

const api = express.Router();

api.get('/', (req, res, next) => baseRouteHandler(req, res, next, getTableData));

module.exports = api;
