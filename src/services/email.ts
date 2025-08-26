import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  // Log configuration for debugging (without sensitive data)
  console.log('📧 Email configuration:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    hasUsername: !!config.auth.user,
    hasPassword: !!config.auth.pass,
  });

  if (!config.auth.user || !config.auth.pass) {
    console.error('❌ Missing email credentials! Check environment variables:');
    console.error('- SMTP_USERNAME:', !!process.env.SMTP_USERNAME);
    console.error('- SMTP_PASSWORD:', !!process.env.SMTP_PASSWORD);
    throw new Error('Email credentials are missing. Please configure SMTP_USERNAME and SMTP_PASSWORD environment variables.');
  }

  return nodemailer.createTransport(config);
};

export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_DEFAULT_FROM || process.env.SMTP_USERNAME,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    console.log('📧 Sending email:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};
