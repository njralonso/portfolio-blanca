export const prerender = false;
import { ContactRepository } from "../../../infrastructure/repositories/ContactRepository.js";
import { SendContactMessage } from "../../../domain/usecases/SendContactMessage.js";

export const POST = async ({ request }) => {
	const data = await request.json();
	console.log("Received contact data:", data);
	const repo = new ContactRepository(data);
	const usecase = new SendContactMessage(repo);

	await usecase.execute(data);

	return new Response(JSON.stringify({ success: true }), {
		headers: { "Content-Type": "application/json" },
	});
};
