/**
 * fishing-permit-application controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::fishing-permit-application.fishing-permit-application', ({ strapi }) => ({
  async create(ctx) {
    // Call the default create method
    const response = await super.create(ctx);
    
    // Send notification email after successful creation
    try {
      const data = response.data;
      
      await strapi.plugins['email'].services.email.send({
        to: process.env.SMTP_DEFAULT_FROM, // Send to admin
        subject: '🎣 New Fishing Permit Application',
        html: `
          <h2>New Fishing Permit Application</h2>
          <p><strong>Applicant:</strong> ${data.attributes?.firstName || 'Not provided'} ${data.attributes?.lastName || 'Not provided'}</p>
          <p><strong>Email:</strong> ${data.attributes?.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.attributes?.phone || 'Not provided'}</p>
          <p><strong>Boat Name:</strong> ${data.attributes?.boatName || 'Not provided'}</p>
          <p><strong>Fishing Purpose:</strong> ${data.attributes?.fishingPurpose || 'Not provided'}</p>
          <p><strong>Species:</strong> ${data.attributes?.fishingSpecies || 'Not provided'}</p>
          <p><strong>Fishing Method:</strong> ${data.attributes?.fishingMethod || 'Not provided'}</p>
          <p><strong>Location:</strong> ${data.attributes?.fishingLocation || 'Not provided'}</p>
          <p><strong>Duration:</strong> ${data.attributes?.fishingDuration || 'Not provided'}</p>
          <p><strong>People Count:</strong> ${data.attributes?.fishingPeopleCount || 'Not provided'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><em>Please review this fishing permit application in your Strapi admin panel.</em></p>
        `,
        text: `New fishing permit application from ${data.attributes?.firstName} ${data.attributes?.lastName} (${data.attributes?.email}) for ${data.attributes?.fishingPurpose}`
      });

      console.log('✅ Fishing permit notification email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send fishing permit notification email:', error);
      // Don't throw error - we don't want to break the form submission
    }

    return response;
  }
}));
