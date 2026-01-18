module.exports = {
  documentation: {
    enabled: true,
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      settings: {
        defaultFrom: process.env.SMTP_DEFAULT_FROM,
        defaultReplyTo: process.env.SMTP_DEFAULT_REPLY_TO,
      },
    },
  },
};
