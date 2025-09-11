export class SendEmail {
	constructor(mailService) {
		this.mailService = mailService;
	}

	async execute(email) {
		console.log("Executing SendEmail use case with email:", email);
		await this.mailService.sendClientConfirmation(email);
		await this.mailService.sendAdminNotification(email);
	}
}