import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `"Men's Clothing Store" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = `
    <h1>Welcome to Men's Clothing Store!</h1>
    <p>Hi ${name},</p>
    <p>Thank you for registering with us. We're excited to have you on board!</p>
    <p>Start shopping now and discover our latest collections.</p>
    <p>Best regards,<br>Men's Clothing Store Team</p>
  `;
  await sendEmail(email, 'Welcome to our store!', html);
};

export const sendOrderConfirmationEmail = async (
  email: string,
  orderDetails: any
) => {
  const html = `
    <h1>Order Confirmation</h1>
    <p>Thank you for your order!</p>
    <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
    <p><strong>Total:</strong> $${orderDetails.total}</p>
    <p>We'll send you another email when your order ships.</p>
    <p>Best regards,<br>Men's Clothing Store Team</p>
  `;
  await sendEmail(email, 'Order Confirmation', html);
};
