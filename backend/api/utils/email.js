/** @format */

const nodemailer = require("nodemailer");
const AppError = require("./appError");

const wrapEmail = (content) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>MFlix Email</title>
    <link href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: "Parkinsans", sans-serif;
        background-color: #f9f9f9;
        color: #333;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background-color: #df2143;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
      }
      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      ${content}
      <div class="footer">
        <p>This is an automated message. Please do not reply.</p>
      </div>
    </div>
  </body>
</html>
`;

exports.resetPasswordEmail = function (token) {
  const content = `
    <p>Hi there,</p>
    <p>We received a request to reset your password for your MFlix account.</p>
    <p>To reset your password, click the link below:</p>
    <a href="${process.env.FRONTEND_URL}/reset-password/${token}" class="btn">
      Reset your password
    </a>
    <p>This link will expire in 10 minutes.</p>
    <p>If you didn’t request this, please ignore this email — your account is safe.</p>
    <p>Thank you,<br />The MFlix Team</p>
  `;
  return wrapEmail(content);
};

exports.otpEmail = function (otp) {
  const content = `
    <p>Hi there,</p>
    <p>We received a request to sign up for an MFlix account using this email address.</p>
    <p>Your verification code is:</p>
    <p><strong style="font-size: 24px;">🔐 ${otp}</strong></p>
    <p>This code is valid for the next 10 minutes.</p>
    <p>If you did not request this, please ignore this message.</p>
    <p>Thanks,<br />MFlix Team</p>
  `;
  return wrapEmail(content);
};

exports.changeUsersEmail = function (token) {
  const content = `
    <p>Hi there,</p>
    <p>We received a request to change the email address associated with your MFlix account.</p>
    <p>If this was you, please click the link below to confirm your new email address:</p>
    <a href="${process.env.FRONTEND_URL}/change-email-result/${token}" class="btn">Confirm Email Change</a>
    <p>This link will expire in 10 minutes.</p>
    <p>If you did not make this request, you can safely ignore this email.</p>
    <p>Thanks,<br />MFlix Team</p>
  `;
  return wrapEmail(content);
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
  {
    email,
    subject,
    htmlMessage = "",
    plainMessage = "",
    message = "Token sent to email!",
  },
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

    return res.status(200).json({
      status: "success",
      message,
    });
  } catch (err) {
    console.error("EMAIL SEND ERROR:", err);

    return next(
      new AppError("There was an error sending the email. Try again later!")
    );
  }
};
