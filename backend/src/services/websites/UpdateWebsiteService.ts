import Joi from "joi";
import { NotFoundError, ValidationError } from "../../utils/error";
import { Website } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";
import { AppDataSource } from "../../data-source";
import { ERRORS } from "../../constant";

const websiteUpdateSchema = Joi.object({
  name: Joi.string().trim().max(255).optional(),
  url: Joi.string().trim().uri().max(255).optional(),
}).or("name", "url");

interface UpdateWebsiteParams {
  id: string;
  name?: string;
  url?: string;
}

class UpdateWebsiteService {
  static async run(params: UpdateWebsiteParams): Promise<[Error | null, Website | null]> {
    try {
      const entityManager = AppDataSource.manager;
      const { id, name, url } = params;

      const { error } = websiteUpdateSchema.validate({ name, url });
      if (error) {
        throw new ValidationError(error);
      }
      const website = await entityManager.findOneBy(Website, { id });
      if (!website) {
        throw new NotFoundError(ERRORS.NOT_FOUND);
      }
      if (name) website.name = name;
      if (url) website.url = url;

      await entityManager.save(website);
      return [null, website];
    } catch (error) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default UpdateWebsiteService;
