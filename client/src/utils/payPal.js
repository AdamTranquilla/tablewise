import React from "react";

export default function ({ total, onSuccess = null, onFailure = null }) {
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef = React.useRef();

  React.useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "USD",
                  value: parseFloat(total).toFixed(1) || 0.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
        },
        onError: (err) => {
          setError(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  if (paid) {
    onSuccess();
    return null;
  }

  if (error) {
    onFailure();
    return null;
  }

  return <div ref={paypalRef}></div>;
}
