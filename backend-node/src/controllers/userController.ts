import { Request, Response } from "express";
import https from "https";
import prisma from "../config/prismaClient";

export const getImages = async (req: Request, res: Response) => {
  const tags = req.query.tags || "tag1,tag2"; // Assuming tags are passed as query parameters
  const tagmode = "any";
  const format = "json";
  const nojsoncallback = "1";

  const url = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${encodeURIComponent(
    tags as string
  )}&tagmode=${tagmode}&format=${format}&nojsoncallback=${nojsoncallback}`;

  https
    .get(url, (response) => {
      let data = "";

      // Accumulate data chunks
      response.on("data", (chunk) => {
        data += chunk;
      });

      // Once all data is received
      response.on("end", () => {
        try {
          // Parse the JSON data
          const jsonData = JSON.parse(data);
          res.status(200).json(jsonData);
        } catch (error) {
          res
            .status(500)
            .json({ error: "Failed to parse JSON response from Flickr" });
        }
      });
    })
    .on("error", (error) => {
      console.error("Error fetching data from Flickr API:", error);
      res.status(500).json({ error: "Failed to fetch data from Flickr API" });
    });
};
