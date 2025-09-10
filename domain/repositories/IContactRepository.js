/**
 * @interface IContactRepository
 * @method save(contact)
 * @param {Object} contact
 * @returns {Promise<void>}
 */

export class IContactRepository {
	async save(contact) {
		throw new Error('Method not implemented.');
	}
}