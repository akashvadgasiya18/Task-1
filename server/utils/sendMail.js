const nodemailer = require("nodemailer");

const sendMail = ({ email, message, subject }) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "akashvadgasiya1832@gmail.com",
      pass: "oagcpstmwsmxbgna",
    },
  });

  var mailOptions = {
    from: "akashvadgasiya1832@gmail.com",
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      //   console.log(info);
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
