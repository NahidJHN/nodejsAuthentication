exports.isAthenticate = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect("/auth/login");
    }
    next();
};

exports.isUnauthenticate = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect("/dashboard");
    }
    next();
};
