import { Website } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";
import { AppDataSource } from "../../data-source";

interface PageData {
  page: number;
  pageSize: number;
  search: string;
  status: string;
}

class GetAllWebsitesService {
  static async run(params: PageData): Promise<[Error | null, { websites: Website[]; totalCount: number; page: number; pageSize: number } | null]> {
    try {
      const { page, search, pageSize, status } = params;
      const entityManager = AppDataSource.manager;
      const queryBuilder = entityManager.createQueryBuilder(Website, "website");

      // Apply filters
      if (search) {
        queryBuilder.andWhere("website.name ILIKE :search", {
          search: `%${search}%`,
        });
      }
      if (status) {
        queryBuilder.andWhere("website.status = :status", { status });
      }

      const [websites, count] = await queryBuilder
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
