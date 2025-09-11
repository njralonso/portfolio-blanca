export class IEmailRepository {
	async sendClientConfirmation(email) {
		throw new Error('sendClientConfirmation(), Method not implemented.');
	}
	async sendAdminNotification(email) {
		throw new Error('sendAdminNotification(), Method not implemented.');
	}
}