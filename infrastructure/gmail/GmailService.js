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
			html: `<p>Hi ${email.name},</p><p>Thank you for reaching out! I will get back to you as soon as possible.</p><p>Best regards,<br/>Blanca</p>`
		}

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