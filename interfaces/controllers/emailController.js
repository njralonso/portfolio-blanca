import { SendEmail } from "../../domain/usecases/SendEmail";
import { EmailAdapter } from "../adapters/EmailAdapter";
import { GmailService } from "../../infrastructure/gmail/GmailService";

export async function emailController(requestBody) {
	const email = EmailAdapter.fromRequest(requestBody);
	const gmailService = new GmailService();
	const useCase = new SendEmail(gmailService);

	await useCase.execute(email);

	return { status: 200, message: "Email sent successfully" };
}