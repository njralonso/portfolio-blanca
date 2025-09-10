import { ContactMessage } from "../entities/ContactMessage.js";

export class SendContactMessage {
	constructor(contactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(data) {
		console.log("Executing SendContactMessage with data:", data);
		// Creamos entidad y validamos reglas de negocio

		const obj = data instanceof FormData
			? Object.fromEntries(data.entries())
			: data;

		const contact = new ContactMessage(
			obj.name,
			obj.surname,
			obj.phone,
			obj.email,
			obj.message
		);

		console.log("Validated contact entity:", contact);
		// Guardamos en infraestructura (Supabase en este caso)
		await this.contactRepository.save(contact);
	}
}