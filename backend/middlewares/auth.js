const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Shop = require("../models/shopModel");

const isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, "anasimran786");

    req.user = await User.findById(decoded.id);

    next();
});


const isSeller = catchAsyncErrors(async(req,res,next) => {
    const {seller_token} = req.cookies;

    if(!seller_token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, "anasimran786");

    req.seller = await Shop.findById(decoded.id);


    next();
});

module.exports = { isAuthenticated,isSeller}