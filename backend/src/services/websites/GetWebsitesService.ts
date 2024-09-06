import { EntityManager } from "typeorm";
import { ValidationError, NotFoundError } from "../../utils/error"; // Adjust the import path if necessary
import { Website } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";

class GetAllWebsitesService {
  static async run(
    entityManager: EntityManager
  ): Promise<[Error | null, Website[] | null]> {
    try {
      const websites = await entityManager.find(Website);
      return [null, websites];
    } catch (error) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default GetAllWebsitesService;
