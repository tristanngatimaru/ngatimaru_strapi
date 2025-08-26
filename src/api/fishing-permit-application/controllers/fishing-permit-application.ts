/**
 * fishing-permit-application controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::fishing-permit-application.fishing-permit-application",
  ({ strapi }) => ({
    async create(ctx) {
      // Call the default create method
      const response = await super.create(ctx);

      // Send notification email after successful creation
      try {
        const data = response.data;

        // Debug logging to see what data we're getting
        console.log('📧 Fishing Permit Full response data:', JSON.stringify(response, null, 2));
        console.log('📧 Fishing Permit Data attributes:', JSON.stringify(data.attributes, null, 2));

        // Use Strapi Cloud's built-in email service
        await strapi.plugins["email"].services.email.send({
          to: "tristanngatimaru@gmail.com", // Send to admin
          subject: "🎣 New Fishing Permit Application",
          html: `
          <h2>New Fishing Permit Application</h2>
          <p><strong>Applicant:</strong> ${data.attributes?.FirstName || "Not provided"} ${data.attributes?.LastName || "Not provided"}</p>
          <p><strong>Email:</strong> ${data.attributes?.EmailAddress || "Not provided"}</p>
          <p><strong>Phone:</strong> ${data.attributes?.PhoneNumber || "Not provided"}</p>
          <p><strong>Street Address:</strong> ${data.attributes?.StreetAddress || "Not provided"}</p>
          <p><strong>Applying Under Maori Rights:</strong> ${data.attributes?.ApplyingUnderMaoriRights ? "Yes" : "No"}</p>
          <p><strong>Iwi Claim:</strong> ${data.attributes?.IwiClaim || "Not provided"}</p>
          <p><strong>Number Attending:</strong> ${data.attributes?.NumberAttending || "Not provided"}</p>
          <p><strong>Purpose for Fishing:</strong> ${data.attributes?.PurposeForFishing ? "Yes" : "No"}</p>
          <p><strong>To be used at:</strong> ${data.attributes?.ToBeUsedAt || "Not provided"}</p>
          <p><strong>To be used when:</strong> ${data.attributes?.ToBeUsedWhen || "Not provided"}</p>
          <p><strong>Venue Contact:</strong> ${data.attributes?.VenueContactNumber || "Not provided"}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><strong>DEBUG - Available Fields:</strong></p>
          <pre>${JSON.stringify(Object.keys(data.attributes || {}), null, 2)}</pre>
          <pre>${JSON.stringify(data.attributes, null, 2)}</pre>
          
          <hr>
          <p><em>Please review this fishing permit application in your Strapi admin panel.</em></p>
        `,
          text: `New fishing permit application from ${data.attributes?.FirstName} ${data.attributes?.LastName} (${data.attributes?.EmailAddress})`,
        });

        console.log("✅ Fishing permit notification email sent successfully");
      } catch (error) {
        console.error(
          "❌ Failed to send fishing permit notification email:",
          error
        );
        // Don't throw error - we don't want to break the form submission
      }

      return response;
    },
  })
);
