require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

exports.getSession = function (amount, name = "-", orderId, seat, table) {
  return new Promise((resolve, reject) => {
    if (!amount || !orderId) {
      throw "Order Id and Amount is required";
    }

    stripe.checkout.sessions.create(
      {
        success_url:
          (process.env.REACT_APP_WEBSOCKET_URI || "http://localhost:8001/") +
          "order/paid/" +
          orderId,
        cancel_url:
          (process.env.FRONTEND || "http://localhost:3000") + `/#${seat}`,
        payment_method_types: ["card"],
        line_items: [
          {
            name,
            description:
              "Use card number 4242 4242 4242 4242 with a future exp. date and any CVC",
            amount: Math.round(amount * 100),
            currency: "CAD",
            quantity: 1,
          },
        ],
      },
      function (err, session) {
        if (err) reject(err);
        resolve(session);
      }
    );
  });
};
