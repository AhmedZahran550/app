import connectDB from "./../DB/connection/connection.js";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import { fileURLToPath } from "url";
import { globalError } from "./middleware/errorHandling.js";
import adminRouter from "./modules/auth/auth.routes.js";
import productRouter from "./modules/product/product.routes.js";
import codeRouter from "./modules/codes/code.routes.js";
import apiRouter from "./modules/kit/api.routes.js";
import mongoDBStore from "connect-mongodb-session";
import cors from 'cors'



const MongoDBStore = mongoDBStore(session);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fullPath = path.join(__dirname, "./views/shared");

export const initApp = (app, express) => {
  connectDB();
  app.use(cors())
  app.use(express.json({})); 
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname,"./views"));
  app.use("/shared", express.static(fullPath));
  const store = new MongoDBStore({
    uri: process.env.DB_LOCAL,
    collection: "Sessions",
  }); 
  store.on('error', function(error) {

  });
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store,
    })
  );
  
  app.use(flash());
  app.use("/api", apiRouter);
  app.use("/admin", adminRouter);
  app.use("/", productRouter);
  app.use("/code", codeRouter);


  app.use(globalError);
};
