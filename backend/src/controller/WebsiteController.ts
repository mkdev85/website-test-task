import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { handleError, handleSuccess } from "../utils/responseUtils";
import GetAllWebsitesService from "../services/websites/GetWebsitesService";
import AddWebsiteService from "../services/websites/AddWebsiteService";
import DeleteWebsiteService from "../services/websites/DeleteWebsiteService";

export class WebsiteController {
  static async getAllWebsites(req: Request, res: Response) {
    try {
      // Extract query parameters
      const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1); // Ensure page is at least 1
      const limit = Math.max(parseInt(req.query.limit as string, 10) || 10, 1); // Ensure limit is at least 1
      const search = (req.query.search as string) || "";
      const status = (req.query.status as string) || "";

      const entityManager = AppDataSource.manager; // or AppDataSource.getManager()
      const [error, websites] = await GetAllWebsitesService.run(
        entityManager,
        page,
        limit,
        search,
        status
      );
      if (error) {
        return handleError(res, error);
      }
      return handleSuccess(res, websites);
    } catch (err) {
      return handleError(res, err as Error);
    }
  }

  static async addWebsite(req: Request, res: Response) {
    try {
      const entityManager = AppDataSource.manager; // or AppDataSource.getManager()
      const [error, website] = await AddWebsiteService.run(
        entityManager,
        req.body
      );
      if (error) {
        return handleError(res, error);
      }
      return handleSuccess(res, website);
    } catch (err) {
      return handleError(res, err as Error);
    }
  }
  static async deleteWebsite(req: Request, res: Response) {
    try {
      const entityManager = AppDataSource.manager; // or AppDataSource.getManager()
      const id = parseInt(req.params.id, 10);
      const [error, success] = await DeleteWebsiteService.run(
        entityManager,
        id
      );
      if (error) {
        return handleError(res, error);
      }
      return success ? res.status(204).send() : res.status(500).send();
    } catch (err) {
      return handleError(res, err as Error);
    }
  }
}
