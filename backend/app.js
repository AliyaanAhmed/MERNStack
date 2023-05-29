const express = require("express");
const app = express();
const ErrorHandler = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");



app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    })
}


//import Routes
const user = require("./controller/userController")
const shop = require("./controller/shopController");
const product = require("./controller/productController");
const event = require("./controller/eventController")
const coupon = require("./controller/coupounCodeController");
const payment = require("./controller/payment");
const order   = require("./controller/orderController");
const conversation = require("./controller/conversationController");
const message = require("./controller/messageController");
app.use("/api/v1/user", user);
app.use("/api/v1/shop",shop)
app.use("/api/v1/product",product)
app.use("/api/v1/event",event)
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/payment", payment);
app.use("/api/v1/order", order);
app.use("/api/v1/conversation", conversation);
app.use("/api/v1/message", message);



app.use(ErrorHandler)

module.exports = app;