import Joi from "joi";
import { ValidationError, UniqueConstraintError } from "../../utils/error";
import { Website, WebsiteStatus } from "../../models/Website";
import { mapErrorToErrorType } from "../../utils/helper";
import { AppDataSource } from "../../data-source";

const websiteSchema = Joi.object({
  name: Joi.string().max(255).required(),
  url: Joi.string().max(255).required(),
  status: Joi.string().valid("online", "offline").optional(),
});

interface AddWebsiteParams {
  data: Partial<Website>;
}

class AddWebsiteService {
  static async run(
    params: AddWebsiteParams
  ): Promise<[Error | null, Website | null]> {
    try {
      const entityManager = AppDataSource.manager;
      const { data } = params;
      const { error } = websiteSchema.validate(data);
      if (error) {
        console.log("errr", error);
        throw new ValidationError(error);
      }

      const website = new Website();
      website.name = data.name!;
      website.url = data.url!;
      website.status = data.status || WebsiteStatus.OFFLINE;

      const result = await entityManager.save(website);
      return [null, result];
    } catch (error: any) {
      if (error.code === "23505" && error.routine === "_bt_check_unique") {
        console.log("error", error.routine);
        
        const details = [
          {
            message: '"url" is required',
            path: ["url"],
            type: "any.required",
            context: { key: "url" },
          },
        ];

        // Throw UniqueConstraintError if a unique constraint is violated
        throw new ValidationError({ details });
      }
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default AddWebsiteService;
