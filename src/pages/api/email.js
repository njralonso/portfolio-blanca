export const prerender = false
import { EmailController } from "../../../infrastructure/repositories/EmailRepository";

export async function POST({ request }) {
	const body = await request.json();

	try {
		const result = await EmailController(body);
		return new Response(JSON.stringify(result), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
}