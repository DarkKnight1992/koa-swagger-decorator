import fs from 'fs';
import path from 'path';
import { SwaggerRouter } from '../../../dist';

const swaggerHtml = path.resolve(__dirname, '../../swagger-ui/index.html');
const swaggerUI = fs.readFileSync(swaggerHtml).toString('utf8');

const koaRouterOpts = { prefix: '/api/v2' };
const swaggerRouterOpts = {
  title: 'API V2 Server',
  description: 'API DOC',
  version: '1.0.0',
  swaggerConfiguration: {
    ui: swaggerUI
  }
};
const router = new SwaggerRouter(koaRouterOpts, swaggerRouterOpts);

// swagger docs avaliable at http://localhost:3000/api/v2/swagger-html
router.swagger();

router.mapDir(__dirname);

export default router;
