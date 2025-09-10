import { supabase } from "../db/supabase.js";

export class ContactRepository {
	async save(contact) {
		console.log("Saving contact message to database:", contact);
		const { error } = await supabase.from("contact").insert([contact]);
		if (error) throw new Error(error.message);
		return;
	}
}