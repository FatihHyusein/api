const { createTravelTimeTableArray } = require('../travel-time.util');

module.exports = {
    getTableData: async (req, res, next) => {
        const { devices, date } = req.query;
        const parsedDate = JSON.parse(date);
        const from = parsedDate.from;
        const to = parsedDate.to;
        const devicesArray = devices.split(',');

        if (typeof from !== 'number' || typeof to !== 'number') {
            next({
                statusCode: 400,
                message: `Invalid date type! Please enter date in milliseconds between 01/01/1970, 00:00:00 AM and ${new Date(Date.now()).toLocaleString()}`
            });
            return;
        }
        if ((new Date(from)).getTime() < 999 || (new Date(from)).getTime() > Date.now()) {
            next({
                statusCode: 400,
                message: `Invalid start date! Please enter date in milliseconds between 01/01/1970, 00:00:00 AM and ${new Date(Date.now()).toLocaleString()}`
            });
            return;
        }
        if ((new Date(to)).getTime() < 999 || (new Date(to)).getTime() > Date.now()) {
            next({
                statusCode: 400,
                message: `Invalid end date! Please enter date in milliseconds between 01/01/1970, 00:00:00 AM and ${new Date(Date.now()).toLocaleString()}`
            });
            return;
        }
        if (devicesArray.length <= 1) {
            next({
                statusCode: 400,
                message: 'Invalid devices! Please enter minimum two device IDs'
            });
            return;
        }

        res.locals = {
            data: createTravelTimeTableArray(devicesArray, from, to)
        };

        next();
    }
};
