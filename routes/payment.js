const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
var router = express.Router();


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AX8C-G3TmThfMKOwg5wcpSUVA7aW4KHsz_djqIoaxn9dVCG21HesN4fo_xVtwYcYfSITnDLZBIVtmZfL',
    'client_secret': 'ENHHgoHywNvOYdMh5k9vESgLC7uWxNgFIQJy2Foekl9GoD6oHxvAscQCSQKo7bKsMmJ5sCMxWOotPCeI'
  });


// const router = express();

// router.set('view engine', 'ejs');

router.get('/', function(req, res){
    res.render('payment',{user:req.user, lol:req.query.prodname});
    console.log(req);
})


router.post('/pay', function(req, res){
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/payment/success",
            "cancel_url": "http://localhost:3000/payment/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red sox Hat", //add variables
                    "sku": "001",
                    "price": "25.00",
                    "currency": "INR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "INR",
                "total": "25.00"
            },
            "description": "{% %}"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error)
        {
            throw error;
        }
        else
        {
            for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'aproval_url'){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

});

router.get('/success', function(req, res){

      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
      console.log("Hey") ;
      const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "INR",
                "total": "25.00"
                // add as a variable
            }
        }]
      };

      paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            //alert("Payment was successful") ;
            res.send('Success');
        }
    });
});

router.get('/cancel', function(req, res){
    res.send('Cancelled')
});

module.exports = router;

// router.listen(3000, () => console.log('Server Started'));
