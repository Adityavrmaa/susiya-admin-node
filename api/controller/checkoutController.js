import Stripe from "stripe"

const stripe = new Stripe('sk_test_51LPP0nSAQ73QUWkUiwwi44ZMDuonpbtPWuTpwfU2HlTE8PedNpYyQhRAt0HPEsOU1rwoGIhfgPfU8ufwbRuB4ty9001DsTSLkq');

export const getCheckout = async (req, res, next) => {
    try {
        const customer = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:2,
            success_url:"",
            cancel_url:"",
        })
        return res.status(200).send({ message: 'fvsdvsvsvsvsd' })

    } catch (error) {
        return res.status(400).render({ error });
    }
}