// import fs from 'fs';
// import path from 'path';
import { SwaggerRouter } from '../../dist';

import ApiRouter from './v1';
import Api2Router from './v2';

const router = new SwaggerRouter();

router.use('/api/v1', ApiRouter.routes());

// const swaggerHtml = path.resolve(__dirname, '../swagger-ui/index.html');
// const swaggerUI = fs.readFileSync(swaggerHtml).toString('utf8');
// const swaggerUI = `<!DOCTYPE html>
// <html>

// <head>

// <title>API Docs</title>

// <!-- needed for mobile devices -->

// <meta name="viewport" content="width=device-width, initial-scale=1">
// <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

// </head>

// <body>

// <redoc spec-url="http://localhost:8081/swagger-json"></redoc>

// <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>

// </body>

// </html>
// `;
const swaggerUI = `
  <body>
  <div id="redoc-container"></div>
  <script src="https://unpkg.com/redoc@2.0.0-rc.28/bundles/redoc.standalone.js"> </script>
  <script src="https://cdn.jsdelivr.net/gh/wll8/redoc-try@1.0.0/try.js"></script>
  <script>
    initTry({
      openApi: '//petstore.swagger.io/v2/swagger.json',
      tryText: 'try',
      trySwaggerInApi: true,
    })
  </script>
</body>
`;
// openApi: 'http://localhost:8081/swagger-json',
router.use(Api2Router.routes());

// swagger docs avaliable at http://localhost:3000/swagger-html
router.swagger({
  title: 'API V2 Server',
  description: 'API DOC',
  version: '1.0.0',
  swaggerConfiguration: {
    ui: swaggerUI
  }
});
router.mapDir(__dirname);

export default router;
