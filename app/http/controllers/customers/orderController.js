const Order = require("../../../models/order");
const moment = require("moment");

const orderController = () => {
  return {
    store(req, res) {
      // Validate request
      const { phone, address } = req.body;
      if (!phone || !address) {
        return res.status(422).json({ message: "All fields are required" });
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });
      console.log(order);
      order
        .save()
        .then((result) => {
          req.flash("success", "Order placed successfully");
          // Emit
          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("orderPlaced", result);
          delete req.session.cart;
          return res.redirect("/customer/orders");
        })
        .catch((err) => {
          // return res.status(500).json({ message : 'Something went wrong' });
          req.flash("error", "Somethinh went wrong!");
          return res.rdirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.header("Cache-Control", "no-store");
      res.render("customers/orders", { orders: orders, moment: moment });
    },

    async show(req, res) {
      const order = await Order.findById(req.params.id);
      // Authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customers/singleOrder", { order });
      }
      return res.redirect("/");
    },
  };
};

module.exports = orderController;
