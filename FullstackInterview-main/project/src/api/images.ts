import axios, { AxiosError, AxiosResponse } from "axios";
import { FlickrFeed } from "../types/image";

export const getImages = (
  tags: string
): Promise<AxiosResponse<FlickrFeed, AxiosError>> => {
  return axios.get("http://localhost:9000/api/users/images", {
    params: {
      tags: tags,
    },
  });
};
