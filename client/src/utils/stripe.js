const stripe = require("stripe")("YOUR PRIVATE KEY HERE");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.htm");
});

app.get("/suc", (req, res) => {
  res.send("<h1>Payment Successfull</h1>");
});

app.get("/session", function (req, res) {
  stripe.checkout.sessions.create(
    {
      success_url: "http://localhost:3000/suc",
      cancel_url: "https://example.com/cancel",
      payment_method_types: ["card"],
      line_items: [
        {
          name: "Cigar",
          description: "Buy Online and pay using Stripe in just one easy step",
          amount: 2000,
          currency: "usd",
        },
      ],
    },
    function (err, session) {
      if (err) res.send({ err });
      res.send({ session });
    }
  );
});

app.listen(3000);
