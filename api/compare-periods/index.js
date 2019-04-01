const express = require('express');
const { getComparePeriods } = require('./compare-periods.api');
const baseRouteHandler = require('../base-route-handler.api');

const api = express.Router();

api.get('/', (req, res, next) => baseRouteHandler(req, res, next, getComparePeriods));

module.exports = api;
