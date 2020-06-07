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
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>ReDoc Interactive Demo</title>
  <meta name="description" content="ReDoc Interactive Demo. OpenAPI/Swagger-generated API Reference Documentation" />
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta property="og:title" content="ReDoc Interactive Demo">
  <meta property="og:description"
    content="ReDoc Interactive Demo. OpenAPI/Swagger-generated API Reference Documentation">
  <meta property="og:image"
    content="https://user-images.githubusercontent.com/3975738/37729752-8a9ea38a-2d46-11e8-8438-42ed26bf1751.png">
  <meta name="twitter:card" content="summary_large_image">

  <style>
    body {
      margin: 0;
      padding: 0;
    }

    redoc {
      display: block;
    }
    .hide {
      display: none;
    }
    .show {
      display: block;
    }
    .swagger-ui * {
      flex-wrap: wrap;
    }
    .try-out__btn {
      margin: 0 5px !important;
      padding: 0 !important;
      border-radius: 500px;
      overflow: hidden;
      width: 26px;
      height: 26px;
      background: #183647;
      border: 0;
      border: 2px solid #183647;
      box-sizing: border-box;
      cursor: pointer;

    }
    .try-out__btn:focus {
      outline: 0;
    }
    .try-out__btn img {
      display: block;
      position: relative;
      width: 26px;
      height: 26px;
      left: -2px;
      top: -2px;
    }
    .swagger-ui table, .swagger-ui table tr, .swagger-ui table tr td {
      display: block;
    }
    .swagger-ui span, .swagger-ui label {
      display: block !important;
      width: 100%;
    }
  </style>
  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
</head>

<body>
  <redoc id="redoc-container" spec-url="http://localhost:8081/swagger-json"> </redoc>


  <script src="http://127.0.0.1:8887/bundles/redoc.standalone.js"> </script>
  <script src="/try.js"></script>
  <script>
    initTry({
      openApi: '//petstore.swagger.io/v2/swagger.json',
      tryText: '<img src="https://avatars0.githubusercontent.com/u/7658037?s=400&v=4" />',
      trySwaggerInApi: true,
      onlySwagger: true
    })
  </script>
</body>
</html>
`;
// onlySwagger: true
// https://unpkg.com/redoc@2.0.0-rc.28/bundles/redoc.standalone.js
// http://127.0.0.1:8887/bundles/redoc.standalone.js
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
