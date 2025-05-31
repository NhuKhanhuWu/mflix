/** @format */

const nodemailer = require("nodemailer");
const AppError = require("./appError");

exports.resetPasswordEmail = function (token) {
  return `
  <p>Hi there,</p>
  <p>We received a request to reset your password for your MFLIX account.</p>
  <p>To reset your password, please click the link below:</p>
  <p>🔗 <a href="${process.env.FRONTEND_URL}/reset-password/${token}" style="color: #1a73e8; text-decoration: underline;">
    Reset your password
  </a></p>
  <p>This link will expire in 10 minutes. If you didn’t request a password reset, please ignore this email — your account is safe.</p>
  <p>Thank you,<br>The MFLIX Team</p>
`;
};

exports.otpEmail = function (otp) {
  return `
  <p>Hi there,</p>
  <p>We received a request to sign up for an MFlix account using this email address.</p>
  <p>Your verification code is:</p>
  <p><strong style="font-size: 24px;">🔐 ${otp}</strong></p>
  <p>This code is valid for the next 10 minutes.</p>
  <p>If you did not request this, please ignore this message.</p>
  <p>Thanks,<br>MFlix Team</p>
`;
};

exports.sendEmail = async function (options) {
  // 1, create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. define email options
  const emailOptions = {
    from: "Mflix <no-reply@mflix.com>",
    to: options.email,
    subject: options.subject || "",
    html: options.html || "",
    text: options.text || "",
  };

  // 3. send email
  await transporter.sendMail(emailOptions);
};

// utils/emailHelper.js or similar file
exports.sendTokenEmail = async (
  { email, subject, htmlMessage = "", plainMessage = "" },
  res,
  next
) => {
  // console.log(email);
  try {
    await this.sendEmail({
      email: email,
      subject,
      text: plainMessage,
      html: htmlMessage,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    console.error("EMAIL SEND ERROR:", err);

    return next(
      new AppError("There was an error sending the email. Try again later!")
    );
  }
};
