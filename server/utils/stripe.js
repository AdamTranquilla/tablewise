require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

exports.getSession = function (amount, name = "-", orderId) {
  return new Promise((resolve, reject) => {
    if (!amount || !orderId) {
      throw "Order Id and Amount is required";
    }

    stripe.checkout.sessions.create(
      {
        success_url: "http://localhost:8001/order/paid/" + orderId,
        cancel_url: "https://example.com/cancel",
        payment_method_types: ["card"],
        line_items: [
          {
            name,
            description:
              "Buy Online and pay using Stripe in just one easy step",
            amount: amount * 100,
            currency: "usd",
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
