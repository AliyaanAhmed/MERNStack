const ms = require('ms');
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // Options for cookies
  const expirationTime = new Date(Date.now() + ms('90d'));

  const options = {
    expires: expirationTime,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};


module.exports = {sendToken};