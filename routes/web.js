const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");

//customers
const cartController = require("../app/http/controllers/customers/cartController");

//middleware
const guest = require("../app/http/middlewares/guest");

const initRoutes = (app) => {
  app.get("/", homeController().index);

  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);

  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);

  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);

  app.post("/logout", authController().logout);
};

module.exports = initRoutes;
