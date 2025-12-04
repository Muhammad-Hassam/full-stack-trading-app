import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import fs from "fs";
import InlineCss from "inline-css";

export const mailSender = async (email, otp, otp_type) => {
  let htmlContent = fs.readFileSync("otp_template.html", "utf-8");
  htmlContent = htmlContent.replace("Trading App_otp", otp);
  htmlContent = htmlContent.replace("Trading App_otp2", otp_type);

  const options = {
    url: " "
  };

  htmlContent = await InlineCss(htmlContent, options);

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    let result = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Your OTP for Trading app",
      html: htmlContent
    });

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false
  });
  return otp;
};
