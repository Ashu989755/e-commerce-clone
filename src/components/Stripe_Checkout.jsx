import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/Checkout_Form";
// import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY_TEST);

const App = () => {
  // const { state } = useLocation();
  // const { stripeData } = state;         

  // console.log(stripeData);

  // const options = {
  //   clientSecret: "stripeData.client_secret",
  //   appearance: {
  //     theme: "stripe",
  //   },
  // };

  return (
    // <Elements stripe={stripePromise} options={options}>
    <Elements stripe={stripePromise} >
      <CheckoutForm />
    </Elements>
  );
};

export default App;
