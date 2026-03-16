import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export const LIFETIME_PRICE_NOK = 49900 // øre = 499 NOK

export function formatPrice(amountOre: number): string {
  return `${(amountOre / 100).toFixed(0)} NOK`
}
