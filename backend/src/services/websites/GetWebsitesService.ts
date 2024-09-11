import { Website, WebsiteStatus } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";
import { AppDataSource } from "../../data-source";

interface PageData {
  page: number;
  pageSize: number;
  searchByWebsiteKeyword: string;
  status: string;
}
interface GetAllWebsitesResponse {
  websites: Website[];
  totalCount: number;
  page: number;
  pageSize: number;
}

class GetAllWebsitesService {
  static async run(
    params: PageData
  ): Promise<[Error | null, GetAllWebsitesResponse | null]> {
    try {
      const { page, searchByWebsiteKeyword, pageSize, status } = params;
      const entityManager = AppDataSource.manager;
      const queryBuilder = entityManager.createQueryBuilder(Website, "website");

      if (searchByWebsiteKeyword) {
        queryBuilder.andWhere("website.name ILIKE :search OR website.url ILIKE :search", {
          search: `%${searchByWebsiteKeyword}%`,
        });
      }

      const validatedStatus = Object.values(WebsiteStatus).includes(status as WebsiteStatus)? (status as WebsiteStatus): "";

      if (validatedStatus) {
        queryBuilder.andWhere("website.status =:status", { status });
      }

      const [websites, count] = await queryBuilder
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .orderBy("website.createdAt", "DESC")
        .getManyAndCount();

      return [null, { websites, totalCount: count, page, pageSize }];
    } catch (error) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default GetAllWebsitesService;
