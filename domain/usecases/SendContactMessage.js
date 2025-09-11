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

		const contact = {
			name: obj.name,
			surname: obj.surname,
			phone: obj.phone,
			email: obj.email,
			message: obj.message
		}

		console.log("Validated contact entity:", contact);
		// Guardamos en infraestructura (Supabase en este caso)
		await this.contactRepository.save(contact);
	}
}