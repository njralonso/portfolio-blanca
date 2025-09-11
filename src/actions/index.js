import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { ContactRepository } from "../../infrastructure/repositories/ContactRepository.js";
import { SendContactMessage } from "../../domain/usecases/SendContactMessage.js";
import { emailController } from "../../interfaces/controllers/emailController.js";

export const server = {
	sendContact: defineAction({
		accept: 'form',
		schema: z.object({
			name: z.string().min(1, "Name is required"),
			surname: z.string().min(1, "Surname is required"),
			phone: z.coerce.number().optional(),
			email: z.string().min(1, "Email is required").email("Invalid email format"),
			message: z.string().min(1, "Message is required"),
		}),
		async handler(data) {
			try {
				const repo = new ContactRepository();
				const usecase = new SendContactMessage(repo);

				await usecase.execute(data);

				if (!response.ok) {
					return { error: `Error en la API: ${response.statusText}` };
				}

				const result = await response.json();
				return { data: result };
			} catch (err) {
				console.error(err);
				return { error: 'Error al enviar los datos' };
			}
		}
	}),
	sendEmail: defineAction({
		accept: 'form',
		schema: z.object({
			name: z.string().min(1, "Name is required"),
			email: z.string().min(1, "Email is required").email("Invalid email format"),
			message: z.string().min(1, "Message is required"),
		}),
		async handler(data) {
			try {
				const response = await emailController(data);
				if (!response.ok) {
					return { error: `Error en la API: ${response.statusText}` };
				}
			} catch (err) {
				console.error(err);
				return { error: 'Error al enviar los datos' };
			}
		}
	}),
}