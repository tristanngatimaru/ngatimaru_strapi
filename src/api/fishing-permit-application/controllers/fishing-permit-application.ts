/**
 * fishing-permit-application controller
 */

import { factories } from "@strapi/strapi";
import { sendEmail } from "../../../services/email";

export default factories.createCoreController(
  "api::fishing-permit-application.fishing-permit-application",
  ({ strapi }) => ({
    async create(ctx) {
      // Call the default create method first
      const response = await super.create(ctx);

      try {
        console.log("✅ Fishing permit application created:", response.data.id);

        // Get the created data with populated fields
        const result = await strapi.entityService.findOne(
          "api::fishing-permit-application.fishing-permit-application",
          response.data.id,
          {
            populate: "*",
          }
        );

        console.log("📧 Preparing to send notification email...");

        // Send notification email after successful creation
        const data = result as any;

        // Use the custom email service
        await sendEmail({
          to: "tristanngatimaru@gmail.com", // Send to admin
          subject: "Fishing Permit Application",
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h2 style="text-align: center; color: #2c3e50; border-bottom: 3px solid #f39c12; padding-bottom: 10px;">
              Fishing Permit Application
            </h2>
            
            <h3 style="background-color: #3498db; color: white; padding: 10px; margin: 20px 0 10px 0;">👤 Personal Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">First Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.FirstName || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Last Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.LastName || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.EmailAddress || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.PhoneNumber || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Street Address</td>
                <td colspan="3" style="padding: 12px; border: 1px solid #ddd;">${data?.StreetAddress || "Not provided"}</td>
              </tr>
            </table>
            
            <h3 style="background-color: #e67e22; color: white; padding: 10px; margin: 20px 0 10px 0;">🏛️ Māori Rights & Claims</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 40%; font-weight: bold;">Applying Under Māori Rights</td>
                <td style="padding: 12px; border: 1px solid #ddd; color: ${data?.ApplyingUnderMaoriRights ? "#27ae60" : "#e74c3c"}; font-weight: bold;">
                  ${data?.ApplyingUnderMaoriRights ? "✅ Yes" : "❌ No"}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">What Iwi are you claiming under?</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.IwiClaim || "Not provided"}</td>
              </tr>
            </table>
            
            <h3 style="background-color: #8e44ad; color: white; padding: 10px; margin: 20px 0 10px 0;">🎯 Fishing Purpose Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Purpose for Hui</td>
                <td colspan="3" style="padding: 12px; border: 1px solid #ddd; white-space: pre-wrap;">
                  ${data?.PurposeForHui || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Number Attending</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.NumberAttending || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">To be used at (Address)</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.ToBeUsedAt || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Date of Hui</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.ToBeUsedWhen || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Venue Contact Number</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.VenueContactNumber || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Time of Harvest</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.TimeOfHarvest ? new Date(data.TimeOfHarvest).toLocaleString() : "Not provided"}</td>
              </tr>
            </table>
            
            <h3 style="background-color: #17a2b8; color: white; padding: 10px; margin: 20px 0 10px 0;">👥 Harvesters</h3>
            ${
              data?.Harvesters &&
              Array.isArray(data.Harvesters) &&
              data.Harvesters.length > 0
                ? data.Harvesters.map(
                    (harvester: any, index: number) => `
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; border: 2px solid #17a2b8;">
                    <tr style="background-color: #d1ecf1;">
                      <td colspan="2" style="text-align: center; padding: 12px; font-weight: bold; font-size: 16px;">
                        👤 Harvester ${index + 1}
                      </td>
                    </tr>
                    <tr style="background-color: #f8f9fa;">
                      <td style="padding: 12px; border: 1px solid #ddd; width: 50%; font-weight: bold;">First Name</td>
                      <td style="padding: 12px; border: 1px solid #ddd; width: 50%;">${harvester?.FirstName || "Not provided"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Last Name</td>
                      <td style="padding: 12px; border: 1px solid #ddd;">${harvester?.LastName || "Not provided"}</td>
                    </tr>
                  </table>
                  `
                  ).join("")
                : `<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
                    <tr style="background-color: #f8d7da; color: #721c24;">
                      <td style="padding: 15px; text-align: center; font-weight: bold;">
                        ⚠️ No harvester information provided in this application
                      </td>
                    </tr>
                  </table>`
            }
            
            <h3 style="background-color: #27ae60; color: white; padding: 10px; margin: 20px 0 10px 0;">🐟 Species Information</h3>
            ${
              data?.Species &&
              Array.isArray(data.Species) &&
              data.Species.length > 0
                ? data.Species.map(
                    (species: any, index: number) => `
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; border: 2px solid #27ae60;">
                    <tr style="background-color: #d5f4e6;">
                      <td colspan="4" style="text-align: center; padding: 12px; font-weight: bold; font-size: 16px;">
                        🐟 Species ${index + 1}
                      </td>
                    </tr>
                    <tr style="background-color: #f8f9fa;">
                      <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Species Name</td>
                      <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${species?.SpeciesName || "Not provided"}</td>
                      <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Harvest Method</td>
                      <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${species?.HarvestMethodDrop || "Not provided"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Area Taken</td>
                      <td style="padding: 12px; border: 1px solid #ddd;">${species?.AreaTaken || "Not provided"}</td>
                      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Area Landed</td>
                      <td style="padding: 12px; border: 1px solid #ddd;">${species?.AreaLanded || "Not provided"}</td>
                    </tr>
                    <tr style="background-color: #f8f9fa;">
                      <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Amount Requested</td>
                      <td colspan="3" style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: #e67e22;">${species?.AmountRequested || "Not provided"}</td>
                    </tr>
                  </table>
                  `
                  ).join("")
                : `<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
                    <tr style="background-color: #f8d7da; color: #721c24;">
                      <td style="padding: 15px; text-align: center; font-weight: bold;">
                        ⚠️ No species information provided in this application
                      </td>
                    </tr>
                  </table>`
            }
            
            <h3 style="background-color: #dc3545; color: white; padding: 10px; margin: 30px 0 10px 0;">📋 Permit Approval</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; border: 2px solid #dc3545;">
              <tr style="background-color: #f8d7da;">
                <td style="padding: 15px; text-align: center; font-weight: bold; font-size: 16px;">
                  This section is for official use only
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="width: 50%; padding: 15px; border: 1px solid #ccc;">
                        <strong>Permit Status:</strong><br><br>
                        ☐ Approved &nbsp;&nbsp;&nbsp; ☐ Declined &nbsp;&nbsp;&nbsp; ☐ Pending Review<br><br>
                        <strong>Permit Number:</strong><br>
                        <div style="border: 1px solid #ccc; min-height: 30px; padding: 5px; margin-top: 5px; background-color: #fff;">
                          &nbsp;
                        </div><br>
                        <strong>Conditions/Comments:</strong><br>
                        <div style="border: 1px solid #ccc; min-height: 60px; padding: 10px; margin-top: 10px; background-color: #fff;">
                          &nbsp;
                        </div>
                      </td>
                      <td style="width: 50%; padding: 15px; border: 1px solid #ccc;">
                        <strong>Approved By:</strong><br><br>
                        Name: ________________________________<br><br>
                        Position: _____________________________<br><br>
                        Signature: ____________________________<br><br>
                        Date: _________________________________
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          
          <hr>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><em>Please review this fishing permit application in your Strapi admin panel.</em></p>
        `,
          text: `New fishing permit application from ${data?.FirstName} ${data?.LastName} (${data?.EmailAddress})`,
        });

        console.log("✅ Fishing permit notification email sent successfully");
      } catch (emailError) {
        console.error(
          "❌ Failed to send fishing permit notification email:",
          emailError
        );
        // Don't throw error - we don't want to break the form submission
      }

      return response;
    },
  })
);
