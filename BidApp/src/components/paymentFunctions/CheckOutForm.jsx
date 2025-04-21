import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation } from "react-router-dom";


const CheckOutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
const axiosSecure = useAxiosSecure();
const location = useLocation();
const {totalPrice, cart} = location.state;
const {user} =useContext(AuthContext);
    useEffect( () =>{
axiosSecure.post('/create-payment-intent', {price: totalPrice},{cart: cart})
.then(res => {
    console.log(res.data.clientSecret);
    setClientSecret(res.data.clientSecret);
})

    },[axiosSecure,totalPrice])

    const handleSubmit = async(event) =>{
        event.preventDefault();

        if(!stripe || !elements)
          {
            return
          }
          const card = elements.getElement(CardElement);
    if(card === null){
        return
    }
      
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card
    })
    if(error){
        console.log('payment error', error);
        setError(error.message);

    }
    else{
        console.log("payment method",paymentMethod);
        setError('');
    }

    // confirm payment
    const  {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card: card,
            billing_details:{
                email: user?.email,
                name: user?.displayName,

            }
        }
    })
    if (confirmError){
        console.log('confirm error')
    }
    else{
        console.log('payment intent',paymentIntent);
        if(paymentIntent.status === "succeeded") {
          console.log('transaction id', paymentIntent.id);
          setTransactionId(paymentIntent.id);
      
          const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(),
            products: cart.map(item => ({
              bidId: item.bidId,
              name: item.productName,        
              image: item.productImage,     
            })),
            status: "pending"
          };
          
      
          const res = await axiosSecure.post('/payments', payment);
          console.log("payment saved", res);
          
          
          setPaymentSuccess(true);
      }
    }}      
    
    return (
        <form onSubmit={handleSubmit}>
<CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn  bg-green-400 hover:bg-green-700 hover:text-white  my-5" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">Your Transaction Id: {transactionId}</p> }
      {paymentSuccess && (
  <div className="mt-5">
    <h2 className="text-xl font-bold mb-3">Products Paid For:{user.name}</h2>
    <ul className="space-y-2">
      {cart.map((item, index) => (
        <li key={index} className="border p-3 rounded shadow-sm">
          <p><strong>Product Name:</strong> {item.productName}</p>
          <p><strong>Price:</strong> ${item.amount}</p>
          
        </li>
      ))}
    </ul>
  </div>
)}

        </form>
    );
};

export default CheckOutForm;