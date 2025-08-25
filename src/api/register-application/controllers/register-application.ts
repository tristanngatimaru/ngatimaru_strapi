/**
 * register-application controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::register-application.register-application', ({ strapi }) => ({
  async create(ctx) {
    // Call the default create method
    const response = await super.create(ctx);
    
    // Send notification email after successful creation
    try {
      const data = response.data;
      
      await strapi.plugins['email'].services.email.send({
        to: process.env.SMTP_DEFAULT_FROM, // Send to admin
        subject: '🎯 New Register Application Received',
        html: `
          <h2>New Registration Application</h2>
          <p><strong>Name:</strong> ${data.attributes?.PersonalFirstName || 'Not provided'} ${data.attributes?.PersonalLastName || 'Not provided'}</p>
          <p><strong>Email:</strong> ${data.attributes?.PersonalEmail || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.attributes?.PersonalMobilePhone || data.attributes?.PersonalHomePhone || 'Not provided'}</p>
          <p><strong>Hapu:</strong> ${data.attributes?.PrincipleHapu || 'Not provided'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${data.id}</p>
          
          <hr>
          <p><em>Please review this application in your Strapi admin panel.</em></p>
        `,
        text: `New Registration Application received from ${data.attributes?.PersonalFirstName} ${data.attributes?.PersonalLastName} (${data.attributes?.PersonalEmail})`
      });

      console.log('✅ Registration notification email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send registration notification email:', error);
      // Don't throw error - we don't want to break the form submission
    }

    return response;
  }
}));
