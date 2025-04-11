import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div>
            <h2>this is payment!</h2>
            <div>
            <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>

            </Elements>
            </div>
        </div>
    );
};

export default Payment;