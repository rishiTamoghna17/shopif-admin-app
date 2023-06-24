// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});
//*********************************start*******************************************/
app.get("/api/collections/450508325164", async (_req, res) => {
  try {
    const collection = await shopify.api.rest.Collection.find({
      session: res.locals.shopify.session,
      id: 450508325164,
    });
    res.status(200).send(collection);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/api/collections", async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    const client = new shopify.api.clients.Graphql({ session });
    const result = await client.query({
      data: `query{
            collections(first:5) {
              edges {
                node {
                  id
                  title
                  handle
                  updateAt
                  productsCount
                  sortOrder
                }
              }
            }
      }`,
    });
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

//need Shopify API access scopes- "https://shopify.dev/docs/api/usage/access-scopes"
app.get("/api/orders", async (_req, res) => {
  try {
    const orders = await shopify.api.rest.Order.all({
      session: res.locals.shopify.session,
      status: "any",
    });
    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/api/products/create", async (req, res) => {
  !req?.body?.title &&
    res.status(400).send({
      message: "field is missing",
      error: true,
    });
  const createProduct = `mutation {
      productCreate($input: {title:${req.body.title},productType:"physical",vender:"shopify"}) {
        product{
          id
        }
    }
  }`;
  try {
    const session = res.locals.shopify.session;
    const client = new shopify.api.clients.Graphql({ session });
    await client.query({
      data: createProduct,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    const data = await shopify.api.rest.Product.all({ session: session }); 
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/orders", async (_req, res) => {
  try {
    const session = res.locals.shopify.session;
    const client = new shopify.api.clients.Graphql({ session });
    const queryString = ` {
        orders(first:5){
          edges{
            node{
              id
              name
              note
              displayFinancialStatus
            }
          }
        }
      }`;
    const data = await client.query({
      data: queryString,
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//***********************end**********************/

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
