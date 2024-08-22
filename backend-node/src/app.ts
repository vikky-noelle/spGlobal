import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import morgan from "morgan";

import routes from "./routes";
import { createServer } from "http";
// uploading files
import multer from "multer";

const app = express();

const httpServer = createServer(app);

// Morgan middleware for logging HTTP requests
app.use(morgan("combined")); // 'combined' outputs the Apache style LOGs

// To identify json body passed on a post request or else the server will throw undefined
app.use(express.json());
// To identify body passed on a post request or else the server will throw undefined
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const uploadImage = () => {
  const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const imageFileFilter = (req: any, file: any, cb: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("You can upload image files only"));
    }
    cb(null, true);
  };

  return multer({ fileFilter: imageFileFilter, storage: imageStorage });
};

const upload = uploadImage();

app.post("/upload", cors(), upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  // Generate a URL for the file
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    file.filename
  }`;
  res.json({ imageUrl });
});
// health end point used to check the status of the server
app.get("/health", (req: Request, res: Response): Response => {
  return res.status(200).json({
    message: "Healthy",
  });
});

app.use("/api/", cors(), routes);

app.options("*", cors);
app.use((req: Request, res, next: NextFunction) => {
  res.header("Access_Control-Allow-Origin", "*");
  res.header(
    "Access_Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/// catch 404 and forwarding to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  var err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err,
  });
});

// assigning a port for the development
const port = process.env.PORT || 9000;

httpServer.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}...`)
);

module.exports = app;
