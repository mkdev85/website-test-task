import Joi from "joi";
import { NotFoundError, ValidationError } from "../../utils/error"; // Adjust the import path if necessary
import { Website } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";
import { AppDataSource } from "../../data-source";

const websiteUpdateSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  url: Joi.string().max(255).optional(),
  status: Joi.string().valid("online", "offline").optional(),
});

interface UpdateWebsiteParams {
  id: number;
  data: Partial<Website>;
}

class UpdateWebsiteService {static async run(params: UpdateWebsiteParams): Promise<[Error | null, Website | null]> {
    try {
      const entityManager = AppDataSource.manager;
      const { id, data } = params;
      const { error } = websiteUpdateSchema.validate(data);
      if (error) {
        throw new ValidationError(error);
      }

      const website = await entityManager.findOneBy(Website, { id });
      if (!website) {
        throw new NotFoundError("Website not found");
      }
      const updatedWebsite = Object.assign(website, data);

      await entityManager.save(updatedWebsite);
      return [null, updatedWebsite];
    } catch (error) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default UpdateWebsiteService;
