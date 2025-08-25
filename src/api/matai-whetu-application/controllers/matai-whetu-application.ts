/**
 * matai-whetu-application controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::matai-whetu-application.matai-whetu-application",
  ({ strapi }) => ({
    async create(ctx) {
      // Call the default create method
      const response = await super.create(ctx);

      // Send notification email after successful creation
      try {
        const data = response.data;

        await strapi.plugins["email"].services.email.send({
          to: process.env.SMTP_DEFAULT_FROM, // Send to admin
          subject: "🏛️ New Matai Whetu Booking Application",
          html: `
          <h2>New Matai Whetu Booking Application</h2>
          <p><strong>Applicant:</strong> ${data.attributes?.firstName || "Not provided"} ${data.attributes?.lastName || "Not provided"}</p>
          <p><strong>Email:</strong> ${data.attributes?.email || "Not provided"}</p>
          <p><strong>Phone:</strong> ${data.attributes?.phone || "Not provided"}</p>
          <p><strong>Organisation:</strong> ${data.attributes?.organisationName || "Not provided"}</p>
          <p><strong>Booking Dates:</strong> ${data.attributes?.bookingFrom || "Not provided"} to ${data.attributes?.bookingTo || "Not provided"}</p>
          <p><strong>Purpose:</strong> ${data.attributes?.bookingPurpose || "Not provided"}</p>
          <p><strong>Responsible Person:</strong> ${data.attributes?.firstNameResponsible || "Not provided"} ${data.attributes?.lastNameResponsible || "Not provided"} (${data.attributes?.emailResponsible || "Not provided"})</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><em>Please review this booking application in your Strapi admin panel.</em></p>
        `,
          text: `New Matai Whetu booking application from ${data.attributes?.firstName} ${data.attributes?.lastName} (${data.attributes?.email}) for ${data.attributes?.bookingFrom} to ${data.attributes?.bookingTo}`,
        });

        console.log("✅ Matai Whetu notification email sent successfully");
      } catch (error) {
        console.error(
          "❌ Failed to send Matai Whetu notification email:",
          error
        );
        // Don't throw error - we don't want to break the form submission
      }

      return response;
    },
  })
);
