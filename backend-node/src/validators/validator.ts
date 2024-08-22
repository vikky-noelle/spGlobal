import { NextFunction, Request, Response } from "express";
import { query, validationResult } from "express-validator";

export const validateFlickrParams = [
  query("id").optional().isString().withMessage("id must be a string"),

  query("ids").optional().isString().withMessage("ids must be a string"),

  query("tags").optional().isString().withMessage("tags must be a string"),

  query("tagmode")
    .optional()
    .isIn(["all", "any"])
    .withMessage('tagmode must be either "all" or "any"'),

  query("format")
    .optional()
    .isString()
    .isIn(["json", "atom"])
    .withMessage('format must be either "json" or "atom"'),

  query("lang")
    .optional()
    .isString()
    .isIn(["en-us", "fr-fr", "es-es", "de-de", "it-it"])
    .withMessage("lang must be a valid language code"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, ids, tags } = req.query;
    if (!id && !ids && !tags) {
      return res
        .status(400)
        .json({ error: "At least one of id, ids, or tags is required" });
    }

    next();
  },
];
