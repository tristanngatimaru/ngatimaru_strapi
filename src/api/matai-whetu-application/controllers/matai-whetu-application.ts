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
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h2 style="text-align: center; color: #2c3e50; border-bottom: 3px solid #f39c12; padding-bottom: 10px;">
              🏛️ New Matai Whetu Booking Application
            </h2>
            
            <h3 style="background-color: #3498db; color: white; padding: 10px; margin: 20px 0 10px 0;">👤 Personal Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">First Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.firstName || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Last Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.lastName || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.email || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.phone || "Not provided"}</td>
              </tr>
            </table>
            
            <h3 style="background-color: #e67e22; color: white; padding: 10px; margin: 20px 0 10px 0;">🏢 Organisation Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Organisation Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 75%;">${data?.organisationName || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Details of Whānau/Organisation</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.detailsOfWhanauOrOrganisation || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Pōwhiri Required</td>
                <td style="padding: 12px; border: 1px solid #ddd; color: ${data?.powhiri ? "#27ae60" : "#e74c3c"}; font-weight: bold;">
                  ${data?.powhiri ? "✓ Yes" : "✗ No"}
                </td>
              </tr>
            </table>
            
            <h3 style="background-color: #8e44ad; color: white; padding: 10px; margin: 20px 0 10px 0;">📅 Booking Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Booking Purpose</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 75%;">${data?.bookingPurpose || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">From Date</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.bookingFrom || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">To Date</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.bookingTo || "Not provided"}</td>
              </tr>
            </table>
            
            <h3 style="background-color: #e91e63; color: white; padding: 10px; margin: 20px 0 10px 0;">👨‍💼 Person Responsible During Occupation</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">First Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.firstNameResponsible || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Last Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.lastNameResponsible || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.phoneResponsible || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.emailResponsible || "Not provided"}</td>
              </tr>
            </table>
            
            <h3 style="background-color: #27ae60; color: white; padding: 10px; margin: 20px 0 10px 0;">🏘️ Facility Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #e8f5e8;">
                <td colspan="4" style="text-align: center; padding: 10px; font-weight: bold; border: 1px solid #ddd;">
                  🏛️ Wharenui
                </td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">First Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.firstNameWharenui || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%; font-weight: bold;">Last Name</td>
                <td style="padding: 12px; border: 1px solid #ddd; width: 25%;">${data?.lastNameWharenui || "Not provided"}</td>
              </tr>
              <tr style="background-color: #fff3e0;">
                <td colspan="4" style="text-align: center; padding: 10px; font-weight: bold; border: 1px solid #ddd;">
                  🍽️ Wharekai
                </td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">First Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.firstNameWharekai || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Last Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.lastNameWharekai || "Not provided"}</td>
              </tr>
              <tr style="background-color: #e3f2fd;">
                <td colspan="4" style="text-align: center; padding: 10px; font-weight: bold; border: 1px solid #ddd;">
                  🚿 Ablution Block & Other Areas
                </td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">First Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.ablutionFirstName || "Not provided"}</td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Last Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data?.ablutionLastName || "Not provided"}</td>
              </tr>
            </table>
            
            <h3 style="background-color: #17a2b8; color: white; padding: 10px; margin: 20px 0 10px 0;">✅ Acknowledgements</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 50%; font-weight: bold;">Terms & Conditions Agreed</td>
                <td style="padding: 12px; border: 1px solid #ddd; color: ${data?.agreedToTerms ? "#27ae60" : "#e74c3c"}; font-weight: bold;">
                  ${data?.agreedToTerms ? "✅ Agreed" : "❌ Not Agreed"}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Tikanga Info Sheet Read</td>
                <td style="padding: 12px; border: 1px solid #ddd; color: ${data?.readTikangaInfoSheet ? "#27ae60" : "#e74c3c"}; font-weight: bold;">
                  ${data?.readTikangaInfoSheet ? "✅ Read" : "❌ Not Read"}
                </td>
              </tr>
            </table>
            
            <h3 style="background-color: #dc3545; color: white; padding: 10px; margin: 30px 0 10px 0;">📋 Application Approval</h3>
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
                        <strong>Booking Status:</strong><br><br>
                        ☐ Approved &nbsp;&nbsp;&nbsp; ☐ Declined &nbsp;&nbsp;&nbsp; ☐ Pending Review<br><br>
                        <strong>Comments:</strong><br>
                        <div style="border: 1px solid #ccc; min-height: 80px; padding: 10px; margin-top: 10px; background-color: #fff;">
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
