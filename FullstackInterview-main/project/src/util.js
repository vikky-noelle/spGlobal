import axios from "axios";

export const getFlickrImages = function (tags) {
  const flickerAPIEndpoint =
    "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  return axios
    .get(flickerAPIEndpoint, {
      tags: tags.join(","),
      tagmode: "any",
      format: "json",
    })
    .then((r) => r.items);
};
