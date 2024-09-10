import Joi from "joi";
import { ValidationError, UniqueConstraintError } from "../../utils/error";
import { Website } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";
import { AppDataSource } from "../../data-source";
import { checkWebsiteStatus } from "../../utils/websiteUtils";
import { ERRORS } from "../../constant";

const websiteSchema = Joi.object({
  name: Joi.string().trim().max(255).required(),
  url: Joi.string().uri().trim().max(255).required(),
});

interface AddWebsiteParams {
  name: string;
  url: string;
}

class AddWebsiteService {
  static async run(params: AddWebsiteParams): Promise<[Error | null, Website | null]> {
    try {
      const entityManager = AppDataSource.manager;
      const { name, url } = params;

      const { error } = websiteSchema.validate({ name, url });
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const existingWebsite = await entityManager.findOneBy(Website, { url });
      if (existingWebsite) {
        throw new ValidationError(ERRORS.UNIQUE_CONSTRAINT);
      }

      const website = new Website();
      website.name = name;
      website.url = url;
      website.status = await checkWebsiteStatus(url);
      const result = await entityManager.save(website);
      return [null, result];
    } catch (error: any) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default AddWebsiteService;
