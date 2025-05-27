/** @format */

const nodemailer = require("nodemailer");

exports.resetPasswordEmail = function (token) {
  return (
    "Hi there,\n\n" +
    "We received a request to reset your password for your MFLIX account.\n\n" +
    "To reset your password, please click the link below:\n\n" +
    "🔗 Reset your password:\n" +
    `${process.env.FRONTEND_URL}/reset-password/${token}\n\n` +
    "This link will expire in 10 minutes. If you didn’t request a password reset, please ignore this email — your account is safe.\n\n" +
    "Thank you,\n" +
    "The MFLIX Team\n"
  );
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
    from: "Mflix",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. send email
  await transporter.sendMail(emailOptions);
};
