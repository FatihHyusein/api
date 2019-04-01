const express = require('express');

const api = express.Router();

api.use('/travelTimeTableData', require('./travel-time-table-data'));
api.use('/comparePeriods', require('./compare-periods'));

module.exports = api;
