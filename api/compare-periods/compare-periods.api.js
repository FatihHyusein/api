const { createComparePeriodArray } = require('../travel-time.util');

module.exports = {
    getComparePeriods: async (req, res, next) => {
        const { originDeviceId, destinationDeviceId, startDates, periodLength } = req.query;
        const startDatesArray = startDates.split(',');

        const validStartDates = startDatesArray.every(startDate => {
            if ((new Date(+startDate)).getTime() > 999 && (new Date(+startDate)).getTime() < Date.now()) {
                return true;
            }
        });

        if (!validStartDates) {
            next({
                statusCode: 400,
                message: `Invalid start dates! Please enter dates in milliseconds between 01/01/1970, 00:00:00 AM and ${new Date(Date.now()).toLocaleString()}`
            });
            return;
        }

        if (+periodLength <= 999 || isNaN(periodLength)) {
            next({
                statusCode: 400,
                message: 'Invalid period! Please enter period in milliseconds'
            });
            return;
        }

        res.locals = {
            data: createComparePeriodArray(startDatesArray, periodLength)
        };

        next();
    }
};
