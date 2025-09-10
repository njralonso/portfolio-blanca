export class ContactMessage {
	constructor(name, surname, phone, email, message) {
		this.name = name;
		this.surname = surname;
		this.phone = phone;
		this.email = email;
		this.message = message;
	}

	// validate() {
	// 	if (!this.name || !this.surname || !this.email || !this.message) {
	// 		throw new Error('Complete all required fields: name, surname, email, message.');
	// 	}

	// 	if (!/\S+@\S+\.\S+/.test(this.email)) {
	// 		throw new Error('Invalid email format.');
	// 	}

	// 	if (this.phone && !/^\+?[0-9\s\-()]+$/.test(this.phone)) {
	// 		throw new Error('Invalid phone number format.');
	// 	}
	// 	return true;
	// }
}