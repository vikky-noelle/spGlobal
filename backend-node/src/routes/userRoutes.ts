import { validateFlickrParams } from "./../validators/validator";
import express from "express";
import { getImages } from "../controllers/userController";

const router = express.Router();

router.get("/images", validateFlickrParams, getImages);

export default router;
