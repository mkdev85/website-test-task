import { Website } from "../../models/Website";
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
  static async run(params: PageData): Promise<[Error | null, GetAllWebsitesResponse | null]> {
    try {
      const { page, searchByWebsiteKeyword, pageSize, status } = params;
      const entityManager = AppDataSource.manager;
      const queryBuilder = entityManager.createQueryBuilder(Website, "website");

      if (searchByWebsiteKeyword) {
        queryBuilder.andWhere("website.name ILIKE :search", {
          search: `%${searchByWebsiteKeyword}%`,
        });
      }
      if (status) {
        queryBuilder.andWhere("website.status = :status", { status });
      }

      const [websites, count] = await queryBuilder
        .orderBy("website.createdAt", "DESC")
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();

      return [null, { websites, totalCount: count, page, pageSize }];
    } catch (error) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default GetAllWebsitesService;
