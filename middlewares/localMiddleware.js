const localAccess = (req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.warningMsg = req.flash("warning");
    next();
};

module.exports = localAccess;
