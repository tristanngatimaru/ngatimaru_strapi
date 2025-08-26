/**
 * register-application controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::register-application.register-application",
  ({ strapi }) => ({
    async create(ctx) {
      // Debug the incoming request
      // Call the default create method first
      const response = await super.create(ctx);

      // Get populated data for nested components
      const result = await strapi.entityService.create("api::register-application.register-application", {
        data: ctx.request.body.data,
        populate: "*",
      });

      // Send notification email after successful creation
      try {
        const data = result as any;        // Use Strapi Cloud's built-in email service
        await strapi.plugins["email"].services.email.send({
          to: "tristanngatimaru@gmail.com", // Send to admin
          subject: "🎯 New Register Application Received",
          html: `
          <h2>New Registration Application</h2>
          
          <h3><strong>Personal Information</strong></h3>
          <p><strong>Name:</strong> ${data?.PersonalFirstName || "Not provided"} ${data?.PersonalLastName || "Not provided"}</p>
          <p><strong>Salutation:</strong> ${data?.PersonalSalutaion || "Not provided"}</p>
          <p><strong>Gender:</strong> ${data?.PersonalGender || "Not provided"}</p>
          <p><strong>Birth Date:</strong> ${data?.PersonalBirthDate || "Not provided"}</p>
          <p><strong>Maiden Name:</strong> ${data?.PersonalMaidenName || "Not provided"}</p>
          <p><strong>Also Known As:</strong> ${data?.PersonalAKA || "Not provided"}</p>
          <p><strong>Occupation:</strong> ${data?.PersonalOccupation || "Not provided"}</p>
          <p><strong>Has Spouse:</strong> ${data?.PersonalSpouce ? "Yes" : "No"}</p>
          
          <h3><strong>Contact Information</strong></h3>
          <p><strong>Email:</strong> ${data?.PersonalEmail || "Not provided"}</p>
          <p><strong>Home Phone:</strong> ${data?.PersonalHomePhone || "Not provided"}</p>
          <p><strong>Work Phone:</strong> ${data?.PersonalWorkPhone || "Not provided"}</p>
          <p><strong>Mobile Phone:</strong> ${data?.PersonalMobilePhone || "Not provided"}</p>
          <p><strong>Contact Details:</strong> ${data?.PersonalContactDetails || "Not provided"}</p>
          <p><strong>Postal Address:</strong> ${data?.PersonalPostalAddress || "Not provided"}</p>
          <p><strong>Has Different Postal Address:</strong> ${data?.PostalAddress ? "Yes" : "No"}</p>
          ${data?.PostalAddress ? `<p><strong>Postal Address Details:</strong> ${data?.PostalAddressYes || "Not provided"}</p>` : ""}
          
          <h3><strong>Hapū & Iwi Information</strong></h3>
          <p><strong>Principal Hapū:</strong> ${data?.PrincipleHapu || "Not provided"}</p>
          <p><strong>Principal Other Iwi Affiliation:</strong> ${data?.PrincipleOtherIwiAffiliation || "Not provided"}</p>
          <p><strong>Principal Marae:</strong> ${data?.PrincipleMarae || "Not provided"}</p>
          <p><strong>Other Hapū:</strong> ${data?.OtherHapu || "Not provided"}</p>
          <p><strong>Other Iwi Affiliation:</strong> ${data?.OtherIwiAffiliation || "Not provided"}</p>
          <p><strong>Other Marae:</strong> ${data?.OtherMarae || "Not provided"}</p>
          <p><strong>Descendant Affiliation:</strong> ${data?.DecendantAffiliation || "Not provided"}</p>
          
          <h3><strong>🌳 Whakatauki (Family Tree)</strong></h3>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <h4><strong>👨 Father's Side (Tamatāne)</strong></h4>
            
            <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
              <tr style="background-color: #e3f2fd;">
                <td colspan="4" style="text-align: center; padding: 10px; font-weight: bold; border: 1px solid #ddd;">
                  Grandfather's Side
                </td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;"><strong>Great-Grandfather:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;">${data?.FatherGreatGrandFatherMen || "Not provided"}</td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;"><strong>Great-Grandmother:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;">${data?.FatherGreatGrandMotherMen || "Not provided"}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align: center; padding: 8px; border: 1px solid #ddd;">
                  <strong>Grandfather:</strong> ${data?.FatherGrandFather || "Not provided"}
                </td>
              </tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
              <tr style="background-color: #fce4ec;">
                <td colspan="4" style="text-align: center; padding: 10px; font-weight: bold; border: 1px solid #ddd;">
                  Grandmother's Side
                </td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;"><strong>Great-Grandfather:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;">${data?.FatherGreatGrandFatherWomen || "Not provided"}</td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;"><strong>Great-Grandmother:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;">${data?.FatherGreatGrandMotherWomen || "Not provided"}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align: center; padding: 8px; border: 1px solid #ddd;">
                  <strong>Grandmother:</strong> ${data?.FatherGrandMother || "Not provided"}
                </td>
              </tr>
            </table>

            <div style="text-align: center; padding: 15px; background-color: #e8f5e8; border: 2px solid #4caf50; border-radius: 5px; margin: 10px 0;">
              <strong style="font-size: 18px;">👨 FATHER: ${data?.Father || "Not provided"}</strong>
            </div>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <h4><strong>� Mother's Side (Tamawahine)</strong></h4>
            
            <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
              <tr style="background-color: #e3f2fd;">
                <td colspan="4" style="text-align: center; padding: 10px; font-weight: bold; border: 1px solid #ddd;">
                  Grandfather's Side
                </td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;"><strong>Great-Grandfather:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;">${data?.MotherGreatGrandFatherMen || "Not provided"}</td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;"><strong>Great-Grandmother:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;">${data?.MotherGreatGrandMotherMen || "Not provided"}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align: center; padding: 8px; border: 1px solid #ddd;">
                  <strong>Grandfather:</strong> ${data?.MotherGrandFather || "Not provided"}
                </td>
              </tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
              <tr style="background-color: #fce4ec;">
                <td colspan="4" style="text-align: center; padding: 10px; font-weight: bold; border: 1px solid #ddd;">
                  Grandmother's Side
                </td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;"><strong>Great-Grandfather:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;">${data?.MotherGreatGrandFatherWomen || "Not provided"}</td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;"><strong>Great-Grandmother:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; width: 25%;">${data?.MotherGreatGrandMotherWomen || "Not provided"}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align: center; padding: 8px; border: 1px solid #ddd;">
                  <strong>Grandmother:</strong> ${data?.MotherGrandMother || "Not provided"}
                </td>
              </tr>
            </table>

            <div style="text-align: center; padding: 15px; background-color: #fff3e0; border: 2px solid #ff9800; border-radius: 5px; margin: 10px 0;">
              <strong style="font-size: 18px;">👩 MOTHER: ${data?.Mother || "Not provided"}</strong>
            </div>
          </div>
          
          ${
            data?.PersonalSpouce && data?.Spouse
              ? `
          <h3><strong>💒 Spouse/Partner Details</strong></h3>
          <p><strong>Spouse Name:</strong> ${data?.Spouse?.FirstName || "Not provided"} ${data?.Spouse?.LastName || "Not provided"}</p>
          <p><strong>Spouse Salutation:</strong> ${data?.Spouse?.Salutation || "Not provided"}</p>
          <p><strong>Spouse Gender:</strong> ${data?.Spouse?.Gender || "Not provided"}</p>
          <p><strong>Spouse Date of Birth:</strong> ${data?.Spouse?.DateOfBirth || "Not provided"}</p>
          <p><strong>Spouse Maiden Name:</strong> ${data?.Spouse?.MaidenName || "Not provided"}</p>
          <p><strong>Spouse Also Known As:</strong> ${data?.Spouse?.AlsoKnownAs || "Not provided"}</p>
          <p><strong>Spouse Iwi:</strong> ${data?.Spouse?.Iwi || "Not provided"}</p>
          `
              : data?.PersonalSpouce 
                ? `
          <h3><strong>💒 Spouse/Partner Details</strong></h3>
          <p><strong>Has spouse indicated but details not available.</strong></p>
          `
                : `
          <h3><strong>💒 Spouse/Partner Details</strong></h3>
          <p><strong>No spouse indicated.</strong></p>
          `
          }
          
          <h3><strong>Additional Information</strong></h3>
          <p><strong>Additional Comments:</strong> ${data?.AdditionalInformation || "Not provided"}</p>
          <p><strong>Agreed to Terms:</strong> ${data?.AgreeToTerms ? "Yes" : "No"}</p>
          
          <hr>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><em>Please review this application in your Strapi admin panel.</em></p>
        `,
          text: `New Registration Application received from ${data?.PersonalFirstName} ${data?.PersonalLastName} (${data?.PersonalEmail})`,
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
