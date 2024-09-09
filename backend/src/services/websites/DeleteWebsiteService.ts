import { Website } from "../../models/Website";
import { AppDataSource } from "../../data-source";
import { mapErrorToErrorType } from "../../utils/helper";
import { NotFoundError } from "../../utils/error";

interface DeleteWebsiteParams {
  id: number;
}

class DeleteWebsiteService {static async run(  params: DeleteWebsiteParams): Promise<[Error | null, boolean]> {
  try {
      const { id } = params;
      const entityManager = AppDataSource.manager;
      const result = await entityManager.delete(Website, id);

      if (result.affected === 0) {
        throw new NotFoundError("Website not found");
      }
      return [null, true];
    } catch (error) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default DeleteWebsiteService;
