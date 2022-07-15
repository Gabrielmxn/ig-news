import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";
import { stripe } from "../../services/stripe";

async function buffer(readable: Readable){
  const chunks = [];

  for await (const chunk of readable){
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks);
}
//Mudar o entendimento padrão do next para 'stream'. Porque o padrão é json
export const config = {
  api: {
    bodyParser: false
  }
}

//Cria um array com os eventos que queremos
const relevantEvent = new Set([
  'checkout.session.completed'
])

const webhooks = async function (req: NextApiRequest, res: NextApiResponse){
  if (req.method === 'POST'){
    const buf = await buffer(req)
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try{
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    }catch(err){
      return res.status(404).send(`Webhook error: ${err.message}`)
    }

    const { type } = event

    if(relevantEvent.has(type)){
      console.log('Evento recebido', event)
    }

    res.json({ received: true})
  }
  
  

 
}

export default webhooks;