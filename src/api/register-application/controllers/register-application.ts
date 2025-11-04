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
      const result = await strapi.entityService.create(
        "api::register-application.register-application",
        {
          data: ctx.request.body.data,
          populate: "*",
        }
      );

      // Send notification email after successful creation
      try {
        const data = result as any; // Use Strapi Cloud's built-in email service
        await strapi.plugins["email"].services.email.send({
          to: "tristanngatimaru@gmail.com", // Send to admin
          subject: "🎯 New Register Application Received",
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h2 style="text-align: center; color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
              🎯 New Registration Application
            </h2>
            
            <h3 style="background-color: #3498db; color: white; padding: 10px; margin: 20px 0 10px 0;">📋 Personal Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">First Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.PersonalFirstName || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Last Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.PersonalLastName || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Salutation</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalSalutaion || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Gender</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalGender || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Birth Date</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalBirthDate || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Maiden Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalMaidenName || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Also Known As</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalAKA || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Occupation</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalOccupation || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Has Spouse</td>
                <td style="padding: 12px; border: 1px solid #ddd; color: ${data?.PersonalSpouce ? "#27ae60" : "#e74c3c"}; font-weight: bold;">${data?.PersonalSpouce ? "✓ Yes" : "✗ No"}</td>
                <td style="padding: 12px; border: 1px solid #ddd;"></td>
                <td style="padding: 12px; border: 1px solid #ddd;"></td>
              </tr>
            </table>
            
            <h3 style="background-color: #e67e22; color: white; padding: 10px; margin: 20px 0 10px 0;">📞 Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 75%;">${data?.PersonalEmail || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Home Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalHomePhone || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Work Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalWorkPhone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Mobile Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalMobilePhone || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Contact Details</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalContactDetails || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Postal Address</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PersonalPostalAddress || "Not provided"}</td>
              </tr>
              ${
                data?.PostalAddress
                  ? `
              <tr style="background-color: #fff3cd;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Alternative Postal Address</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PostalAddressYes || "Not provided"}</td>
              </tr>
              `
                  : ""
              }
            </table>
            
            <h3 style="background-color: #8e44ad; color: white; padding: 10px; margin: 20px 0 10px 0;">🏔️ Hapū & Iwi Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 50%; font-weight: bold;">Principal Hapū</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 50%;">${data?.PrincipleHapu || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Principal Other Iwi Affiliation</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PrincipleOtherIwiAffiliation || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Principal Marae</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PrincipleMarae || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Other Hapū</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.OtherHapu || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Other Iwi Affiliation</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.OtherIwiAffiliation || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Other Marae</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.OtherMarae || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Descendant Affiliation</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.DecendantAffiliation || "Not provided"}</td>
              </tr>
            </table>
          
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
          
          <div style="margin-top: 40px; padding: 20px; border: 2px solid #333; background-color: #f9f9f9;">
            <h3 style="text-align: center; margin-bottom: 30px;"><strong>📋 APPROVAL SECTION</strong></h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="width: 50%; padding: 15px; vertical-align: top;">
                  <strong>Approved by:</strong><br>
                  <div style="border-bottom: 2px solid #333; height: 40px; margin: 10px 0;"></div>
                  <em>(Print Name)</em>
                </td>
                <td style="width: 50%; padding: 15px; vertical-align: top;">
                  <strong>Position/Title:</strong><br>
                  <div style="border-bottom: 2px solid #333; height: 40px; margin: 10px 0;"></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; vertical-align: top;">
                  <strong>Signature:</strong><br>
                  <div style="border-bottom: 2px solid #333; height: 50px; margin: 10px 0;"></div>
                </td>
                <td style="padding: 15px; vertical-align: top;">
                  <strong>Date:</strong><br>
                  <div style="border-bottom: 2px solid #333; height: 50px; margin: 10px 0;"></div>
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 10px; background-color: #e3f2fd; border-left: 4px solid #2196f3;">
              <strong>Status:</strong>
              <div style="margin: 10px 0;">
                ☐ Approved &nbsp;&nbsp;&nbsp; ☐ Rejected &nbsp;&nbsp;&nbsp; ☐ Requires Additional Information
              </div>
            </div>
            
            <div style="margin-top: 15px;">
              <strong>Comments/Notes:</strong><br>
              <div style="border: 1px solid #ccc; height: 60px; margin: 5px 0; background-color: white;"></div>
            </div>
          </div>
          </div>
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
