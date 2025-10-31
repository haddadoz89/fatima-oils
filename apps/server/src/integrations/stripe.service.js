import Stripe from 'stripe';
import { config } from '../core/config.js';

let stripe = null;

if (config.stripe.secretKey) {
  stripe = new Stripe(config.stripe.secretKey);
}

export const stripeService = {
  async createPaymentIntent(amount, currency = 'usd') {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    };
  },

  async confirmPayment(paymentIntentId) {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent.status === 'succeeded';
  },
};
