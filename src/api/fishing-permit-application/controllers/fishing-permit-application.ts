/**
 * fishing-permit-application controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::fishing-permit-application.fishing-permit-application",
  ({ strapi }) => ({
    async create(ctx) {
      // Debug the incoming request
      console.log("🔍 Fishing Permit Raw request body:", JSON.stringify(ctx.request.body, null, 2));
      console.log("🔍 Fishing Permit Request method:", ctx.request.method);
      console.log("🔍 Fishing Permit Request headers:", JSON.stringify(ctx.request.headers, null, 2));

      // Call the default create method
      const response = await super.create(ctx);

      // Send notification email after successful creation
      try {
        const data = response.data;

        // Debug logging to see what data we're getting
        console.log(
          "📧 Fishing Permit Full response data:",
          JSON.stringify(response, null, 2)
        );
        console.log(
          "📧 Fishing Permit Data attributes:",
          JSON.stringify(data.attributes, null, 2)
        );
        console.log(
          "📧 Fishing Permit Response data keys:",
          Object.keys(response)
        );
        console.log(
          "📧 Fishing Permit Data keys:",
          Object.keys(data)
        );

        // Use Strapi Cloud's built-in email service
        await strapi.plugins["email"].services.email.send({
          to: "tristanngatimaru@gmail.com", // Send to admin
          subject: "🎣 New Fishing Permit Application",
          html: `
          <h2>New Fishing Permit Application</h2>
          
          <h3><strong>Personal Details</strong></h3>
          <p><strong>Applicant:</strong> ${data?.FirstName || "Not provided"} ${data?.LastName || "Not provided"}</p>
          <p><strong>Email:</strong> ${data?.EmailAddress || "Not provided"}</p>
          <p><strong>Phone:</strong> ${data?.PhoneNumber || "Not provided"}</p>
          <p><strong>Street Address:</strong> ${data?.StreetAddress || "Not provided"}</p>
          <p><strong>Applying Under Māori Rights:</strong> ${data?.ApplyingUnderMaoriRights ? "Yes" : "No"}</p>
          <p><strong>Iwi Claim:</strong> ${data?.IwiClaim || "Not provided"}</p>
          
          <h3><strong>Fishing Purpose Details</strong></h3>
          <p><strong>Purpose for Fishing:</strong> ${data?.PurposeForFishing ? "Yes" : "No"}</p>
          <p><strong>Number Attending:</strong> ${data?.NumberAttending || "Not provided"}</p>
          <p><strong>To be used at:</strong> ${data?.ToBeUsedAt || "Not provided"}</p>
          <p><strong>To be used when:</strong> ${data?.ToBeUsedWhen || "Not provided"}</p>
          <p><strong>Venue Contact Number:</strong> ${data?.VenueContactNumber || "Not provided"}</p>
          
          <h3><strong>Species Information</strong></h3>
          ${
            data?.Species && Array.isArray(data.Species)
              ? data.Species.map(
                  (species, index) => `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <h4><strong>Species ${index + 1}</strong></h4>
              <p><strong>Species Name:</strong> ${species?.SpeciesName || "Not provided"}</p>
              <p><strong>Harvest Method:</strong> ${species?.HarvestMethod || "Not provided"}</p>
              <p><strong>Area Taken:</strong> ${species?.AreaTaken || "Not provided"}</p>
              <p><strong>Area Landed:</strong> ${species?.AreaLanded || "Not provided"}</p>
              <p><strong>Time of Harvest:</strong> ${species?.TimeOfHarves ? new Date(species.TimeOfHarves).toLocaleString() : "Not provided"}</p>
            </div>
            `
                ).join("")
              : "<p>No species information provided</p>"
          }
          
          <hr>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><strong>DEBUG - Available Fields:</strong></p>
          <pre>${JSON.stringify(Object.keys(data || {}), null, 2)}</pre>
          <pre>${JSON.stringify(data, null, 2)}</pre>
          
          <hr>
          <p><em>Please review this fishing permit application in your Strapi admin panel.</em></p>
        `,
          text: `New fishing permit application from ${data?.FirstName} ${data?.LastName} (${data?.EmailAddress})`,
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
