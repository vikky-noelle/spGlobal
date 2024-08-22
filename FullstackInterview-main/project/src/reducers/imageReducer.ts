// src/reducers/imageReducer.ts

import { FlickrFeed, FlickrPhoto } from "../types/image";

export interface ImageState {
  images: FlickrFeed;
  tags: string;
  sortOrder: "asc" | "desc";
  fetchMode: "append" | "replace";
}

export type ImageAction =
  | { type: "SET_ITEMS"; payload: FlickrPhoto[] }
  | { type: "SET_SORT_ORDER"; payload: "asc" | "desc" }
  | { type: "SET_TAGS"; payload: string }
  | { type: "SET_FETCH_MODE"; payload: "append" | "replace" }
  | { type: "SORT_ITEMS" }
  | { type: "CLEAR_IMAGES" };

export const initialState: ImageState = {
  images: {
    title: "Recent Uploads tagged tag1 or tag2",
    link: "https://www.flickr.com/photos/",
    description: "",
    modified: "2024-07-12T19:19:42Z",
    generator: "https://www.flickr.com",
    items: [],
  },
  tags: "",
  sortOrder: "asc",
  fetchMode: "append",
};

export function imageReducer(
  state: ImageState,
  action: ImageAction
): ImageState {
  switch (action.type) {
    case "SET_ITEMS":
      const updatedItems = action.payload;
      return {
        ...state,
        images: {
          ...state.images,
          items:
            state.fetchMode === "append"
              ? [...state.images.items, ...updatedItems]
              : updatedItems,
        },
      };
    case "SET_SORT_ORDER":
      return {
        ...state,
        sortOrder: action.payload,
      };
    case "SET_TAGS":
      return {
        ...state,
        tags: action.payload,
      };
    case "SET_FETCH_MODE":
      return {
        ...state,
        fetchMode: action.payload,
      };
    case "SORT_ITEMS":
      const sortedItems = [...state.images.items].sort((item1, item2) => {
        return state.sortOrder === "asc"
          ? item1.title.localeCompare(item2.title)
          : item2.title.localeCompare(item1.title);
      });
      return {
        ...state,
        images: {
          ...state.images,
          items: sortedItems,
        },
      };
    case "CLEAR_IMAGES":
      return {
        ...state,
        images: {
          ...state.images,
          items: [],
        },
      };
    default:
      return state;
  }
}
