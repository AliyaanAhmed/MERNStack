const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middlewares/catchAsyncError");

const stripe = require("stripe")("sk_test_51N8MrGDVKr9Ktgl1wkXgVDy3SSsFRCetgQviFVVMWm84WyKaUNqoq7UuFpnie0bjQeL35FPBZgEFUvG7K1nzFxEx005xwUQ6QB");

router.post(
    "/process",
    catchAsyncErrors(async (req, res, next) => {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "GBP",
            metadata: {
                company: "Karoobar",
            },
        });
        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret,
        });
    })
);

router.get(
    "/stripeapikey",
    catchAsyncErrors(async (req, res, next) => {
        res.status(200).json({ stripeApikey: "pk_test_51N8MrGDVKr9Ktgl1scYNDU1x9lr7zo6NONQY0HPEl0IAuepBMH0qCuCH60NHV4oMJcQ52vZrJCoVg1INIulyivUE00r9XJdo5v" });
    })
);


module.exports = router;