/**
 * matai-whetu-application controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::matai-whetu-application.matai-whetu-application",
  ({ strapi }) => ({
    async create(ctx) {
      // Debug the incoming request
      console.log("🔍 Matai Whetu Raw request body:", JSON.stringify(ctx.request.body, null, 2));
      console.log("🔍 Matai Whetu Request method:", ctx.request.method);
      console.log("🔍 Matai Whetu Request headers:", JSON.stringify(ctx.request.headers, null, 2));

      // Call the default create method
      const response = await super.create(ctx);

      // Send notification email after successful creation
      try {
        const data = response.data;

        // Debug logging to see what data we're getting
        console.log(
          "📧 Matai Whetu Full response data:",
          JSON.stringify(response, null, 2)
        );
        console.log(
          "📧 Matai Whetu Data attributes:",
          JSON.stringify(data.attributes, null, 2)
        );
        console.log(
          "📧 Matai Whetu Response data keys:",
          Object.keys(response)
        );
        console.log(
          "📧 Matai Whetu Data keys:",
          Object.keys(data)
        );

        // Use Strapi Cloud's built-in email service
        await strapi.plugins["email"].services.email.send({
          to: "tristanngatimaru@gmail.com", // Send to admin
          subject: "🏛️ New Matai Whetu Booking Application",
          html: `
          <h2>New Matai Whetu Booking Application</h2>
          
          <h3><strong>Personal Details</strong></h3>
          <p><strong>Applicant:</strong> ${data.attributes?.firstName || "Not provided"} ${data.attributes?.lastName || "Not provided"}</p>
          <p><strong>Email:</strong> ${data.attributes?.email || "Not provided"}</p>
          <p><strong>Phone:</strong> ${data.attributes?.phone || "Not provided"}</p>
          
          <h3><strong>Organisation Details</strong></h3>
          <p><strong>Organisation Name:</strong> ${data.attributes?.organisationName || "Not provided"}</p>
          <p><strong>Details of Whānau/Organisation:</strong> ${data.attributes?.detailsOfWhanauOrOrganisation || "Not provided"}</p>
          <p><strong>Pōwhiri Required:</strong> ${data.attributes?.powhiri || "Not provided"}</p>
          
          <h3><strong>Booking Information</strong></h3>
          <p><strong>Booking Purpose:</strong> ${data.attributes?.bookingPurpose || "Not provided"}</p>
          <p><strong>Booking From:</strong> ${data.attributes?.bookingFrom || "Not provided"}</p>
          <p><strong>Booking To:</strong> ${data.attributes?.bookingTo || "Not provided"}</p>
          
          <h3><strong>Person Responsible During Occupation</strong></h3>
          <p><strong>Responsible Person:</strong> ${data.attributes?.firstNameResponsible || "Not provided"} ${data.attributes?.lastNameResponsible || "Not provided"}</p>
          <p><strong>Phone:</strong> ${data.attributes?.phoneResponsible || "Not provided"}</p>
          <p><strong>Email:</strong> ${data.attributes?.emailResponsible || "Not provided"}</p>
          
          <h3><strong>Facility Details</strong></h3>
          <h4><strong>Wharenui</strong></h4>
          <p><strong>Name:</strong> ${data.attributes?.firstNameWharenui || "Not provided"} ${data.attributes?.lastNameWharenui || "Not provided"}</p>
          
          <h4><strong>Wharekai</strong></h4>
          <p><strong>Name:</strong> ${data.attributes?.firstNameWharekai || "Not provided"} ${data.attributes?.lastNameWharekai || "Not provided"}</p>
          
          <h4><strong>Ablution Block & Other Areas</strong></h4>
          <p><strong>Name:</strong> ${data.attributes?.ablutionFirstName || "Not provided"} ${data.attributes?.ablutionLastName || "Not provided"}</p>
          
          <h3><strong>Acknowledgements</strong></h3>
          <p><strong>No Alcohol & Drugs:</strong> ${data.attributes?.acknowledgesNoAlcohol ? "✅ Acknowledged" : "❌ Not acknowledged"}</p>
          <p><strong>No Photos/Videos in Wharenui:</strong> ${data.attributes?.acknowledgesNoPhotos ? "✅ Acknowledged" : "❌ Not acknowledged"}</p>
          <p><strong>No Food/Drink in Wharenui:</strong> ${data.attributes?.acknowledgesNoFood ? "✅ Acknowledged" : "❌ Not acknowledged"}</p>
          <p><strong>Smoking/Vaping Policy:</strong> ${data.attributes?.acknowledgesSmokingArea ? "✅ Acknowledged" : "❌ Not acknowledged"}</p>
          <p><strong>Terms & Conditions:</strong> ${data.attributes?.agreedToTerms ? "✅ Agreed" : "❌ Not agreed"}</p>
          <p><strong>Tikanga Info Sheet Read:</strong> ${data.attributes?.readTikangaInfoSheet ? "✅ Read" : "❌ Not read"}</p>
          
          <hr>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><strong>DEBUG - Available Fields:</strong></p>
          <pre>${JSON.stringify(Object.keys(data.attributes || {}), null, 2)}</pre>
          <pre>${JSON.stringify(data.attributes, null, 2)}</pre>
          
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
