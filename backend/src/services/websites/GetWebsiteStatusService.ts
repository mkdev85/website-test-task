import { Website, WebsiteStatus } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";
import { AppDataSource } from "../../data-source";
import { ERRORS } from "../../constant";

interface paramsType {
  id: string;
}

interface GetWebsiteStatusResponse {
  status: WebsiteStatus | null;
  message?: string;
}

class GetWebsiteStatusService {
  static async run(
    params: paramsType
  ): Promise<[Error | null, GetWebsiteStatusResponse | null]> {
    try {
      const { id } = params;
      const entityManager = AppDataSource.manager;

      const website = await entityManager.findOneBy(Website, { id });

      if (website) {
        return [null, { status: website.status }];
      } else {
        return [null, { status: null, message: ERRORS.NOT_FOUND }];
      }
    } catch (error) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default GetWebsiteStatusService;
