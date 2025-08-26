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

        // Use Strapi Cloud's built-in email service
        await strapi.plugins["email"].services.email.send({
          to: "tristanngatimaru@gmail.com", // Send to admin
          subject: "🏛️ New Matai Whetu Booking Application",
          html: `
          <h2>New Matai Whetu Booking Application</h2>
          
          <h3><strong>Personal Details</strong></h3>
          <p><strong>Applicant:</strong> ${data?.firstName || "Not provided"} ${data?.lastName || "Not provided"}</p>
          <p><strong>Email:</strong> ${data?.email || "Not provided"}</p>
          <p><strong>Phone:</strong> ${data?.phone || "Not provided"}</p>
          
          <h3><strong>Organisation Details</strong></h3>
          <p><strong>Organisation Name:</strong> ${data?.organisationName || "Not provided"}</p>
          <p><strong>Details of Whānau/Organisation:</strong> ${data?.detailsOfWhanauOrOrganisation || "Not provided"}</p>
          <p><strong>Pōwhiri Required:</strong> ${data?.powhiri || "Not provided"}</p>
          
          <h3><strong>Booking Information</strong></h3>
          <p><strong>Booking Purpose:</strong> ${data?.bookingPurpose || "Not provided"}</p>
          <p><strong>Booking From:</strong> ${data?.bookingFrom || "Not provided"}</p>
          <p><strong>Booking To:</strong> ${data?.bookingTo || "Not provided"}</p>
          
          <h3><strong>Person Responsible During Occupation</strong></h3>
          <p><strong>Responsible Person:</strong> ${data?.firstNameResponsible || "Not provided"} ${data?.lastNameResponsible || "Not provided"}</p>
          <p><strong>Phone:</strong> ${data?.phoneResponsible || "Not provided"}</p>
          <p><strong>Email:</strong> ${data?.emailResponsible || "Not provided"}</p>
          
          <h3><strong>Facility Details</strong></h3>
          <h4><strong>Wharenui</strong></h4>
          <p><strong>Name:</strong> ${data?.firstNameWharenui || "Not provided"} ${data?.lastNameWharenui || "Not provided"}</p>
          
          <h4><strong>Wharekai</strong></h4>
          <p><strong>Name:</strong> ${data?.firstNameWharekai || "Not provided"} ${data?.lastNameWharekai || "Not provided"}</p>
          
          <h4><strong>Ablution Block & Other Areas</strong></h4>
          <p><strong>Name:</strong> ${data?.ablutionFirstName || "Not provided"} ${data?.ablutionLastName || "Not provided"}</p>
          
          <h3><strong>Acknowledgements</strong></h3>
          <p><strong>Terms & Conditions:</strong> ${data?.agreedToTerms ? "✅ Agreed" : "❌ Not agreed"}</p>
          <p><strong>Tikanga Info Sheet Read:</strong> ${data?.readTikangaInfoSheet ? "✅ Read" : "❌ Not read"}</p>
          
          <hr>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><em>Please review this booking application in your Strapi admin panel.</em></p>
        `,
          text: `New Matai Whetu booking application from ${data?.firstName} ${data?.lastName} (${data?.email}) for ${data?.bookingFrom} to ${data?.bookingTo}`,
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
