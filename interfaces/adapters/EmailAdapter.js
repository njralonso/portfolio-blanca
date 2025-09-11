import { Email } from "../../domain/entities/Email";

export class EmailAdapter {
	static fromRequest(body) {
		if (body instanceof FormData) {
			const obj = Object.fromEntries(body.entries());
			return new Email(obj.name, obj.email, obj.message);
		}
		return new Email(body.name, body.email, body.message);
	}
}