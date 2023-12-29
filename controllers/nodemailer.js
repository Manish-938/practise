const { default: axios } = require("axios");
const nodemailer = require("nodemailer");

const elastic_mail_key =
  "06FA3C52A60907C79C4951E1E77FBCAF00A92D36585F30BD89F69BF1D9C3F334B649CBAAA6BBAFC09CFE7AC64415187F";

const transporter = nodemailer.createTransport({
  //   host: "smtp.forwardemail.net",
  host: "smtp.elasticemail.com",
  //   port: 2525,
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "manish.suffescom@gmail.com",
    pass: "EE8BEAE3BEC610A0907E3025A919ECD56DAB",
  },
});

module.exports.sendMail = async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: "manish.suffescom@gmail.com", // sender address
      to: "manish.risingmax@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    return res.send({
      statusCode: 200,
      status: "success",
      data: {},
    });
  } catch (error) {
    console.log("error", error.message);
    return res.send({
      status: 400,
      mesaage: `error ${error}`,
    });
  }
};
