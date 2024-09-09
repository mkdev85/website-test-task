import { Request, Response } from "express";
import GetAllWebsitesService from "../services/websites/GetWebsitesService";
import AddWebsiteService from "../services/websites/AddWebsiteService";
import DeleteWebsiteService from "../services/websites/DeleteWebsiteService";
import UpdateWebsiteService from "../services/websites/UpdateWebsiteService";
import { responseHandler } from "../utils/helper";

export class WebsiteController {
  static async getAllWebsites(req: Request, res: Response) {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const pageSize = Math.max(Number(req.query.page_size) || 10, 1);
    const search = (req.query.search as string) || "";
    const status = (req.query.status as string) || "";

    return responseHandler({
      service: GetAllWebsitesService,
      params: { page, pageSize, search, status },
      response: res
    });
  }

  static async addWebsite(req: Request, res: Response) {
    return responseHandler({
      service: AddWebsiteService,
      params: { data: req.body },
      response: res
    });
  }

  static async deleteWebsite(req: Request, res: Response) {
    const id = Number(req.params.id);
    return responseHandler({
      service: DeleteWebsiteService,
      params: { id },
      response: res
    });
  }

  static async updateWebsite(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updateData = req.body;
    return responseHandler({
      service: UpdateWebsiteService,
      params: { id, data: updateData },
      response: res
    });
  }
}
