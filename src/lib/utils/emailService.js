import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465, // or 587 for TLS
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use env variable here in production
  },
});

const sendVerificationEmail = async (to, link) => {
  await transporter.sendMail({
    from: '"EaseTravelsIndia" <no-reply@easetravels.com>',
    to,
    subject: "Verify Your Email - Newsletter Subscription",
    html: `
      <h3>Thank you for subscribing!</h3>
      <p>Please click the link below to verify your email:</p>
      <a href="${link}">${link}</a>
      <br/><br/>
      <small>This link will expire in 24 hours.</small>
    `,
  });
};

const sendNewsLetterMail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"EaseTravels India" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email send error:", err);
    throw new Error("Failed to send email");
  }
};

const sendCreatedEnquiry = async (to, enquiryId) => {
  try {
    const mailOptions = {
      from: `"EaseTravels India" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Enquiry Received - EaseTravels India",
      html: `
        <h2>Thank you for your enquiry!</h2>
        <p>We’ve received your request and our team will get back to you shortly.</p>
        <br/>
        <p>Your Enquiry Reference Id: ${enquiryId}</p>
        <br/>
        <p>Meanwhile, feel free to explore more travel options and services on our website.</p>
        <br/>
        <p>Warm regards,<br/>Team EaseTravelsIndia</p>
        <hr/>
        <small>This is an automated email. Please do not reply.</small>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Failed to send enquiry confirmation email:", err);
    throw new Error("Unable to send enquiry email");
  }
};

const sendEnquiryNotificationToAdmin = async ({ enquiryType, enquiryId }) => {
  try {
    const mailOptions = {
      from: `"EaseTravels India" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // set this in your .env file
      subject: `New Enquiry Received - ${enquiryType}`,
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Enquiry Type:</strong>${enquiryType}</p>
        <p><strong>Enquiry Id:</strong>${enquiryId}</p>
        <br/>
        <p>Check the admin dashboard for more details.</p>
        <hr/>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Failed to send admin enquiry notification:", err);
    throw new Error("Unable to notify admin");
  }
};
export {
  sendVerificationEmail,
  sendNewsLetterMail,
  sendCreatedEnquiry,
  sendEnquiryNotificationToAdmin,
};
