/**
 * register-application controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::register-application.register-application",
  ({ strapi }) => ({
    async create(ctx) {
      // Debug the incoming request
        console.log("🔍 Raw request body:", JSON.stringify(ctx.request.body, null, 2));
        console.log("🔍 Request method:", ctx.request.method);
        console.log("🔍 Request headers:", JSON.stringify(ctx.request.headers, null, 2));

        // Let's also check if there are any relations or components we need to populate
        const result = await strapi.entityService.create("api::register-application.register-application", {
          data: ctx.request.body.data,
          populate: "*", // This should populate any nested components or relations
        });

        console.log("📧 Registration Full response data with population:", JSON.stringify(result, null, 2));
        
        // Call the default create method
        const response = await super.create(ctx);

        // Send notification email after successful creation
        try {
          const data = result as any; // Use populated result for nested components

          // Debug logging to see what data we're getting
          console.log(
            "📧 Full response data:",
            JSON.stringify(response, null, 2)
          );
          console.log(
            "📧 Data populated:",
            JSON.stringify(data, null, 2)
          );
          console.log(
            "📧 Response data keys:",
            Object.keys(response)
          );
          console.log(
            "📧 Data keys:",
            Object.keys(data)
          );        // Use Strapi Cloud's built-in email service
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
          
          <h3><strong>🌳 Family Tree (Whakatauki)</strong></h3>
          <div style="font-family: monospace; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            <h4><strong>👨 Father's Side (Tamatāne)</strong></h4>
            <div style="margin-left: 20px;">
              <p><strong>Great-Great Grandfathers:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.FatherGreatGrandFatherMen || "Not provided"} ♂</p>
                <p>└── ${data?.FatherGreatGrandMotherMen || "Not provided"} ♂</p>
              </div>
              <p><strong>Great Grandfathers:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.FatherGrandFather || "Not provided"} ♂</p>
              </div>
              <p><strong>Father:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.Father || "Not provided"} ♂</p>
              </div>
            </div>
            
            <h4><strong>👩 Father's Side (Tamawahine)</strong></h4>
            <div style="margin-left: 20px;">
              <p><strong>Great-Great Grandmothers:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.FatherGreatGrandFatherWomen || "Not provided"} ♀</p>
                <p>└── ${data?.FatherGreatGrandMotherWomen || "Not provided"} ♀</p>
              </div>
              <p><strong>Grandmother:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.FatherGrandMother || "Not provided"} ♀</p>
              </div>
            </div>

            <h4><strong>👨 Mother's Side (Whaeamātāne)</strong></h4>
            <div style="margin-left: 20px;">
              <p><strong>Great-Great Grandfathers:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.MotherGreatGrandFatherMen || "Not provided"} ♂</p>
                <p>└── ${data?.MotherGreatGrandMotherMen || "Not provided"} ♂</p>
              </div>
              <p><strong>Grandfather:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.MotherGrandFather || "Not provided"} ♂</p>
              </div>
            </div>
            
            <h4><strong>👩 Mother's Side (Whaeawahine)</strong></h4>
            <div style="margin-left: 20px;">
              <p><strong>Great-Great Grandmothers:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.MotherGreatGrandFatherWomen || "Not provided"} ♀</p>
                <p>└── ${data?.MotherGreatGrandMotherWomen || "Not provided"} ♀</p>
              </div>
              <p><strong>Grandmother:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.MotherGrandMother || "Not provided"} ♀</p>
              </div>
              <p><strong>Mother:</strong></p>
              <div style="margin-left: 20px;">
                <p>└── ${data?.Mother || "Not provided"} ♀</p>
              </div>
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
          <p><strong>⚠️ Spouse information not found in nested data.</strong></p>
          <p><strong>Debug:</strong> Spouse data structure: ${JSON.stringify(data?.Spouse || "Not found", null, 2)}</p>
          <p><strong>Note:</strong> Spouse might be stored as a different field name or nested differently.</p>
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
          <p><strong>DEBUG - Available Fields:</strong></p>
          <pre>${JSON.stringify(Object.keys(data || {}), null, 2)}</pre>
          <p><strong>DEBUG - Full Data Structure:</strong></p>
          <pre>${JSON.stringify(data, null, 2)}</pre>
          
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
