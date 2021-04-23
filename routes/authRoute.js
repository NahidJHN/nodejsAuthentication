const router = require("express").Router();
const {homepageController,
    registerGetController,
    registerPostController,
    loginGetController,
    loginPostController,
    logoutController,
    dashboardGetController,
} = require("../controllers/authController");

const { isAthenticate, isUnauthenticate } = require("../middlewares/authenticationMiddleware");

const { registrationvalidator, loginValidator } = require("../validator/authRegistationValidation");

router.get("/auth/register", isUnauthenticate, registerGetController);

router.post("/auth/register", registrationvalidator, registerPostController);

router.get("/auth/login", isUnauthenticate, loginGetController);

router.post("/auth/login", loginValidator, loginPostController);

router.get("/auth/logout", logoutController);

router.get("/dashboard", isAthenticate, dashboardGetController);

router.get("/",isUnauthenticate,homepageController)
module.exports = router;
