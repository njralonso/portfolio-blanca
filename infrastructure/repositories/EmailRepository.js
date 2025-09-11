export class EmailRepository {
	async sendClientConfirmation(email) {
		// Lógica para enviar confirmación al cliente
		console.log("Sending client confirmation email to:", email.email);
		// Aquí iría la integración con un servicio de email real
		return;
	}

	async sendAdminNotification(email) {
		// Lógica para enviar notificación al administrador
		console.log("Sending admin notification email to:", email.email);
		// Aquí iría la integración con un servicio de email real
		return;
	}

}