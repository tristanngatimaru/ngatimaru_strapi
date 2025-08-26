/**
 * register-application controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::register-application.register-application",
  ({ strapi }) => ({
    async create(ctx) {
      // Call the default create method
      const response = await super.create(ctx);

      // Send notification email after successful creation
      try {
        const data = response.data;

        // Debug logging to see what data we're getting
        console.log(
          "📧 Full response data:",
          JSON.stringify(response, null, 2)
        );
        console.log(
          "📧 Data attributes:",
          JSON.stringify(data.attributes, null, 2)
        );

        // Use Strapi Cloud's built-in email service
        await strapi.plugins["email"].services.email.send({
          to: "tristanngatimaru@gmail.com", // Send to admin
          subject: "🎯 New Register Application Received",
          html: `
          <h2>New Registration Application</h2>
          
          <h3><strong>Personal Information</strong></h3>
          <p><strong>Name:</strong> ${data.attributes?.PersonalFirstName || "Not provided"} ${data.attributes?.PersonalLastName || "Not provided"}</p>
          <p><strong>Salutation:</strong> ${data.attributes?.PersonalSalutaion || "Not provided"}</p>
          <p><strong>Gender:</strong> ${data.attributes?.PersonalGender || "Not provided"}</p>
          <p><strong>Birth Date:</strong> ${data.attributes?.PersonalBirthDate || "Not provided"}</p>
          <p><strong>Maiden Name:</strong> ${data.attributes?.PersonalMaidenName || "Not provided"}</p>
          <p><strong>Also Known As:</strong> ${data.attributes?.PersonalAKA || "Not provided"}</p>
          <p><strong>Occupation:</strong> ${data.attributes?.PersonalOccupation || "Not provided"}</p>
          <p><strong>Has Spouse:</strong> ${data.attributes?.PersonalSpouce ? "Yes" : "No"}</p>
          
          <h3><strong>Contact Information</strong></h3>
          <p><strong>Email:</strong> ${data.attributes?.PersonalEmail || "Not provided"}</p>
          <p><strong>Home Phone:</strong> ${data.attributes?.PersonalHomePhone || "Not provided"}</p>
          <p><strong>Work Phone:</strong> ${data.attributes?.PersonalWorkPhone || "Not provided"}</p>
          <p><strong>Mobile Phone:</strong> ${data.attributes?.PersonalMobilePhone || "Not provided"}</p>
          <p><strong>Contact Details:</strong> ${data.attributes?.PersonalContactDetails || "Not provided"}</p>
          <p><strong>Postal Address:</strong> ${data.attributes?.PersonalPostalAddress || "Not provided"}</p>
          <p><strong>Has Different Postal Address:</strong> ${data.attributes?.PostalAddress ? "Yes" : "No"}</p>
          ${data.attributes?.PostalAddress ? `<p><strong>Postal Address Details:</strong> ${data.attributes?.PostalAddressYes || "Not provided"}</p>` : ""}
          
          <h3><strong>Hapū & Iwi Information</strong></h3>
          <p><strong>Principal Hapū:</strong> ${data.attributes?.PrincipleHapu || "Not provided"}</p>
          <p><strong>Principal Other Iwi Affiliation:</strong> ${data.attributes?.PrincipleOtherIwiAffiliation || "Not provided"}</p>
          <p><strong>Principal Marae:</strong> ${data.attributes?.PrincipleMarae || "Not provided"}</p>
          <p><strong>Other Hapū:</strong> ${data.attributes?.OtherHapu || "Not provided"}</p>
          <p><strong>Other Iwi Affiliation:</strong> ${data.attributes?.OtherIwiAffiliation || "Not provided"}</p>
          <p><strong>Other Marae:</strong> ${data.attributes?.OtherMarae || "Not provided"}</p>
          <p><strong>Descendant Affiliation:</strong> ${data.attributes?.DecendantAffiliation || "Not provided"}</p>
          
          <h3><strong>Genealogy - Father's Side (Men)</strong></h3>
          <p><strong>Father's Great Grandfather:</strong> ${data.attributes?.FatherGreatGrandFatherMen || "Not provided"}</p>
          <p><strong>Father's Great Grandmother (Men line):</strong> ${data.attributes?.FatherGreatGrandMotherMen || "Not provided"}</p>
          <p><strong>Father's Grandfather:</strong> ${data.attributes?.FatherGrandFather || "Not provided"}</p>
          <p><strong>Father:</strong> ${data.attributes?.Father || "Not provided"}</p>
          
          <h3><strong>Genealogy - Father's Side (Women)</strong></h3>
          <p><strong>Father's Great Grandfather (Women line):</strong> ${data.attributes?.FatherGreatGrandFatherWomen || "Not provided"}</p>
          <p><strong>Father's Great Grandmother (Women line):</strong> ${data.attributes?.FatherGreatGrandMotherWomen || "Not provided"}</p>
          <p><strong>Father's Grandmother:</strong> ${data.attributes?.FatherGrandMother || "Not provided"}</p>
          
          <h3><strong>Genealogy - Mother's Side (Men)</strong></h3>
          <p><strong>Mother's Great Grandfather:</strong> ${data.attributes?.MotherGreatGrandFatherMen || "Not provided"}</p>
          <p><strong>Mother's Great Grandmother (Men line):</strong> ${data.attributes?.MotherGreatGrandMotherMen || "Not provided"}</p>
          <p><strong>Mother's Grandfather:</strong> ${data.attributes?.MotherGrandFather || "Not provided"}</p>
          
          <h3><strong>Genealogy - Mother's Side (Women)</strong></h3>
          <p><strong>Mother's Great Grandfather (Women line):</strong> ${data.attributes?.MotherGreatGrandFatherWomen || "Not provided"}</p>
          <p><strong>Mother's Great Grandmother (Women line):</strong> ${data.attributes?.MotherGreatGrandMotherWomen || "Not provided"}</p>
          <p><strong>Mother's Grandmother:</strong> ${data.attributes?.MotherGrandMother || "Not provided"}</p>
          <p><strong>Mother:</strong> ${data.attributes?.Mother || "Not provided"}</p>
          
          ${
            data.attributes?.PersonalSpouce && data.attributes?.Spouse
              ? `
          <h3><strong>Spouse/Partner Details</strong></h3>
          <p><strong>Spouse Name:</strong> ${data.attributes?.Spouse?.FirstName || "Not provided"} ${data.attributes?.Spouse?.LastName || "Not provided"}</p>
          <p><strong>Spouse Salutation:</strong> ${data.attributes?.Spouse?.Salutation || "Not provided"}</p>
          <p><strong>Spouse Gender:</strong> ${data.attributes?.Spouse?.Gender || "Not provided"}</p>
          <p><strong>Spouse Date of Birth:</strong> ${data.attributes?.Spouse?.DateOfBirth || "Not provided"}</p>
          <p><strong>Spouse Maiden Name:</strong> ${data.attributes?.Spouse?.MaidenName || "Not provided"}</p>
          <p><strong>Spouse Also Known As:</strong> ${data.attributes?.Spouse?.AlsoKnownAs || "Not provided"}</p>
          <p><strong>Spouse Iwi:</strong> ${data.attributes?.Spouse?.Iwi || "Not provided"}</p>
          `
              : ""
          }
          
          <h3><strong>Additional Information</strong></h3>
          <p><strong>Additional Comments:</strong> ${data.attributes?.AdditionalInformation || "Not provided"}</p>
          <p><strong>Agreed to Terms:</strong> ${data.attributes?.AgreeToTerms ? "Yes" : "No"}</p>
          
          <hr>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><strong>DEBUG - Available Fields:</strong></p>
          <pre>${JSON.stringify(Object.keys(data.attributes || {}), null, 2)}</pre>
          
          <hr>
          <p><em>Please review this application in your Strapi admin panel.</em></p>
        `,
          text: `New Registration Application received from ${data.attributes?.PersonalFirstName} ${data.attributes?.PersonalLastName} (${data.attributes?.PersonalEmail})`,
        });

        console.log("✅ Registration notification email sent successfully");
      } catch (error) {
        console.error(
          "❌ Failed to send registration notification email:",
          error
        );
        // Don't throw error - we don't want to break the form submission
      }

      return response;
    },
  })
);
