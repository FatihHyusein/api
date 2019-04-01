const moment = require('moment');
const fifteenMin = 900000;

function getRandomNumbers(from, to) {
    const duration = moment.duration(moment(to).diff(moment(from))).asHours();
    const startHour = +moment(from).utc().format('H');
    let randomNumbersArray = [];

    for (let hour = startHour; hour <= startHour + duration; hour++) {
        randomNumbersArray[hour] = getRandomTravelTime(hour);
    }

    return randomNumbersArray;
}

function getRandomTravelTime(startHour) {
    let hour = +moment(startHour).utc().format('H');

    if ((hour >= 0 && hour <= 7) || (hour >= 20 && hour <= 23)) {
        return Math.random() * 30 + 10 | 0;
    }

    if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19)) {
        return Math.random() * 160 + 80 | 0;
    }

    return Math.random() * 80 + 30 | 0;
}

module.exports = {
    createTravelTimeTableArray: (devices, from, to) => {
        const randomNumbersWeightsArray = getRandomNumbers(from, to);
        const averageWeight = randomNumbersWeightsArray.reduce((p, c) => p + c, 0) / randomNumbersWeightsArray.length;

        let result = {};
        let upD = Math.random() * averageWeight | 0;
        let downD = Math.random() * averageWeight | 0;

        for (let i = devices.length - 1; i >= 0; i--) {
            const rowDeviceId = devices[i];
            result[rowDeviceId] = {};

            for (let j = 0; j < devices.length; j++) {
                const colDeviceId = devices[j];

                if (i < j) {
                    result[rowDeviceId][colDeviceId] = (1 + upD);
                    upD = upD < 20 ? upD + result[rowDeviceId][colDeviceId] : 20 + result[rowDeviceId][colDeviceId];
                } else if (i === j) {
                    result[rowDeviceId][colDeviceId] = '';
                }
            }
        }

        for (let i = 0; i < devices.length; i++) {
            const rowDeviceId = devices[i];

            for (let j = devices.length - 1; j >= 0; j--) {
                const colDeviceId = devices[j];

                if (i > j) {
                    result[rowDeviceId][colDeviceId] = (1 + downD);
                    downD = downD < 20 ? downD + result[rowDeviceId][colDeviceId] : 20 + result[rowDeviceId][colDeviceId];
                }
            }
        }

        return result;
    },
    createComparePeriodArray: (startDates, periodLength) => {
        let result = {};

        startDates.forEach(startDate => {
            result[startDate] = [];
            const endDate = +startDate + +periodLength;

            for (let i = +startDate; i < endDate; i = i + fifteenMin) {
                result[startDate].push({
                    x: i,
                    y: getRandomTravelTime(+startDate)
                });
            }
        });

        return result;
    }
};

