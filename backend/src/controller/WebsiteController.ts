import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Website } from "../models/Website";
import { AppDataSource } from "../data-source";
import { handleError, handleSuccess } from "../utils/responseUtils";
import GetAllWebsitesService from "../services/websites/GetWebsitesService";
import AddWebsiteService from "../services/websites/AddWebsiteService";
import DeleteWebsiteService from "../services/websites/DeleteWebsiteService";

export class WebsiteController {
  static async getAllWebsites(req: Request, res: Response) {
    try {
     
      const entityManager = AppDataSource.manager; // or AppDataSource.getManager()
      const [error, users] = await GetAllWebsitesService.run(entityManager);
      if (error) {
        return handleError(res, error);
      }
      return handleSuccess(res, users);
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
