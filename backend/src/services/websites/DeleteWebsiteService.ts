import { Website } from "../../models/Website";
import { AppDataSource } from "../../data-source";
import { mapErrorToErrorType } from "../../utils/helper";
import { NotFoundError } from "../../utils/error";
import { ERRORS } from "../../constant";

interface DeleteWebsiteParams {
  id: string;
}

class DeleteWebsiteService {
  static async run(params: DeleteWebsiteParams): Promise<[Error | null, boolean]> {
    try {
      const id = params.id;
      const entityManager = AppDataSource.manager;
      const result = await entityManager.delete(Website, id);

      if (result.affected === 0) {
        throw new NotFoundError(ERRORS.NOT_FOUND);
      }
      return [null, true];
    } catch (error) {
      return [mapErrorToErrorType(error), false];
    }
  }
}

export default DeleteWebsiteService;
