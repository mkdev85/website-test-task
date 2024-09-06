import { EntityManager } from "typeorm";
import { NotFoundError } from "../../utils/error"; // Adjust the import path if necessary
import { Website } from "../../models/Website";

class DeleteWebsiteService {
  static async run(entityManager: EntityManager, id: number): Promise<[Error | null, boolean]> {
    try {
      const result = await entityManager.delete(Website, id);

      if (result.affected === 0) {
        return [new NotFoundError('Website not found'), false];
      }

      return [null, true];
    } catch (error) {
      console.error('Error deleting website:', error);
      return [new Error('An unexpected error occurred'), false];
    }
  }
}

export default DeleteWebsiteService;
