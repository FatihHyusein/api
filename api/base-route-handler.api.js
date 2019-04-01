module.exports = async (req, res, next, apiHandler) => {
    try {
        apiHandler(req, res, next).catch((e) => {
            next(e);
        });
    }
    catch (e) {
        next(e);
    }
};
