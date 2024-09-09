
import { Router } from 'express';
import { WebsiteController } from '../../../controller/WebsiteController';

const websitesRouter = Router();

websitesRouter.get('/', WebsiteController.getAllWebsites);
websitesRouter.post('/', WebsiteController.addWebsite);
websitesRouter.delete('/:id', WebsiteController.deleteWebsite);
websitesRouter.patch('/:id', WebsiteController.updateWebsite);
// router.get('/websites/:id/status', WebsiteController.getWebsiteStatus);

export default websitesRouter;
