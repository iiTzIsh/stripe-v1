const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51PXiGM2LaMxbnu9e9stXcPEvIIwwUajfS0XSpWcHBEknQVeHh5HAxZCUVrkI7ad8JOkUd9vys78U8B7PiJqMsipz00G83tLE20'); // Add your Stripe Secret Key here

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.post('/payment', async (req, res) => {
    
    const product = await stripe.products.create({
        name: "T-shirt"
    });

    if(product){
        var price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: 100 * 100,
            currency: 'usd',
        });
    }


    if(price.id){
        var session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `${price.id}`,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer_email: 'demo@gmail.com'
        });
    }

    res.json({session});
    
});


app.listen(3000, () => {   
    console.log('Server is running on port 3000');
    });

