module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "tristanngatimaru@gmail.com",
        defaultReplyTo: "tristanngatimaru@gmail.com",
      },
    },
  },
});
