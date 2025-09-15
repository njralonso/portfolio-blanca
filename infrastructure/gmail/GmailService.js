import { IEmailRepository } from "../../domain/repositories/IEmailRepository.js";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export class GmailService extends IEmailRepository {
	constructor() {
		super();

		this.oAuth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			process.env.GOOGLE_REDIRECT_URI
		);

		this.oAuth2Client.setCredentials({
			refresh_token: process.env.GOOGLE_REFRESH_TOKEN
		});

		this.transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GOOGLE_USER,
				pass: process.env.GOOGLE_PASS,
			}
		});
	}
	


	async sendClientConfirmation(email) {
		console.log("Sending client confirmation email to:", email.email);
const mailOptions = {
  from: `Blanca Portfolio <${process.env.GOOGLE_USER}>`,
  to: email.email,
  subject: "Thank you for contacting me!",
  text: `Hi ${email.name},\n\nThank you for reaching out! I will get back to you as soon as possible.\n\nBest regards,\nBlanca`,
  html: `
  <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 40px; text-align: center;">
    <div style="max-width: 600px; background: white; margin: auto; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <h2 style="color: #a87f3e; margin-bottom: 16px; font-weight: 600; font-size: 24px;">
        Hola ${email.name},
      </h2>
      
      <!-- Body -->
      <p style="font-size: 16px; color: #444; line-height: 1.6;">
        Muchas gracias por ponerte en contacto conmigo. Tu consulta será respondida a la máxima brevedad.
      </p>
      
      <!-- Divider -->
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      
      <!-- Footer -->
      <p style="color: #888; font-size: 14px; margin: 0;">
        Reciba un cordial saludo,<br/>
        <strong style="color: #000;">Blanca</strong>
      </p>
      
      <!-- Optional Button -->
      <a href="https://www.blancamiguel.makeup" target="_blank" 
        style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color:#7e8263; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
        Web
      </a>
      <a href="https://www.blancamiguel.makeup" target="_blank" 
        style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: linear-gradient(45deg,#a87f3e,#e9d7a2,#a87f3e); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
        Instagram
      </a>
    </div>
  </div>
  `
};


		const result = await this.transporter.sendMail(mailOptions);

		console.log("✅ Client confirmation sent:", result.messageId);
		console.log("RESULT", result)
		return result;
	}

	async sendAdminNotification(email) {
		console.log("Sending admin notification email to:", email.email);
		const mailOptions = {
			from: `Blanca Portfolio <${process.env.GOOGLE_USER}>`,
			to: process.env.GOOGLE_USER,
			subject: `New contact from ${email.name}`,
			text: `You have a new contact message from ${email.name} (${email.email}).\n\nMessage:\n${email.message}`,
			html: `<p>You have a new contact message from <strong>${email.name}</strong> (${email.email}).</p><p>Message:</p><p>${email.message}</p>`
		}

		const result = await this.transporter.sendMail(mailOptions);
		console.log("✅ Admin notification sent:", result.messageId);
		return result;
	}
}