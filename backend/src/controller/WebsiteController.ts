import { Request, Response } from "express";
import GetAllWebsitesService from "../services/websites/GetWebsitesService";
import AddWebsiteService from "../services/websites/AddWebsiteService";
import DeleteWebsiteService from "../services/websites/DeleteWebsiteService";
import UpdateWebsiteService from "../services/websites/UpdateWebsiteService";
import { responseHandler } from "../utils/helper";
import GetWebsiteStatusService from "../services/websites/GetWebsiteStatusService";

export class WebsiteController {
  static async getAllWebsites(req: Request, res: Response) {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const pageSize = Math.max(Number(req.query.page_size) || 10, 1);
    const searchByWebsiteKeyword =
      (req.query.search_by_website_keyword as string) || "";
    const status = (req.query.status as string) || "";

    return responseHandler({
      service: GetAllWebsitesService,
      params: { page, pageSize, searchByWebsiteKeyword, status },
      response: res,
    });
  }
  static async getWebsiteStatus(req: Request, res: Response) {
    const id = req.params.id;
    return responseHandler({
      service: GetWebsiteStatusService,
      params: { id },
      response: res,
    });
  }


  static async addWebsite(req: Request, res: Response) {
    const data = {
      name: req.body.name,
      url: req.body.url,
    };
    return responseHandler({
      service: AddWebsiteService,
      params: data,
      response: res,
    });
  }

  static async deleteWebsite(req: Request, res: Response) {
    const id = req.params.id;
    return responseHandler({
      service: DeleteWebsiteService,
      params: { id },
      response: res,
    });
  }

  static async updateWebsite(req: Request, res: Response) {
    const updateData = {
      name: req.body.name,
      url: req.body.url,
      id: req.params.id,
    };
    return responseHandler({
      service: UpdateWebsiteService,
      params: updateData,
      response: res,
    });
  }
}
