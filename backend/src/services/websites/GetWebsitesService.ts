import { EntityManager } from "typeorm";
import { Website } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";

class GetAllWebsitesService {
  static async run(
    entityManager: EntityManager,
    page: number,
    limit: number,
    search: string,
    status: string
  ): Promise<[Error | null, { websites: Website[], total: number } | null]> {
    try {
      const queryBuilder = entityManager.createQueryBuilder(Website, 'website');

      // Apply filters
      if (search) {
        queryBuilder.andWhere('website.name ILIKE :search', { search: `%${search}%` });
      }
      if (status) {
        queryBuilder.andWhere('website.status = :status', { status });
      }

      // Count total number of results for pagination
      const [websites, total] = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return [null, { websites, total }];
    } catch (error) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default GetAllWebsitesService;
