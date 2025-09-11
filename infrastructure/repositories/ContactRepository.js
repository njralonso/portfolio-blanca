import { supabase } from "../db/supabase.js";
import { IContactRepository } from "../../domain/repositories/IContactRepository.js";

export class ContactRepository extends IContactRepository {
	async save(contact) {
		const { error } = await supabase.from("contact").insert([contact]);
		if (error) throw new Error(error.message);

		console.log("Saving contact message to database:", contact);
		return;
	}
}