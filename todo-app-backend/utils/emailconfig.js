const mailer = require("@sendgrid/mail");
mailer.setApiKey(process.env.EMAIL_API_KEY);

module.exports = mailer;
