import { EntityManager } from "typeorm";
import Joi from "joi";
import { ValidationError } from "../../utils/error"; // Adjust the import path if necessary
import { Website } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";

const websiteSchema = Joi.object({
  name: Joi.string().max(255).required(),
  url: Joi.string().max(255).required(),
  status: Joi.string().valid("online", "offline").optional(),
});

class AddWebsiteService { static async run(entityManager: EntityManager, data: Partial<Website>): Promise<[Error | null, Website | null]> {
  try {
      const { error } = websiteSchema.validate(data);
      if (error) {
        throw new ValidationError(error.details);
      }

      const website = new Website();
      website.name = data.name!;
      website.url = data.url!;
      website.status = data.status;

      const result = await entityManager.save(website);
      return [null, result];
    } catch (error) {
      if (error.code === "23505") {
        // 23505 is the error code for unique violation in PostgreSQL
        return [
          new ValidationError([
            { message: "URL name already present !", path: ["url"] },
          ]),
          null,
        ];
      }
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default AddWebsiteService;
