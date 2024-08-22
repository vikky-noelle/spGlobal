import { SideNav } from "./components/sideNav/sideNav";
import { FlickrFeed } from "./types/image";
import { getImages } from "./api/images";
import { useReducer, useState } from "react";
import {
  ImageAction,
  imageReducer,
  ImageState,
  initialState,
} from "./reducers/imageReducer";

export default function App() {
  const [images, setImages] = useState<FlickrFeed>({
    title: "Recent Uploads tagged tag1 or tag2",
    link: "https://www.flickr.com/photos/",
    description: "",
    modified: "2024-07-12T19:19:42Z",
    generator: "https://www.flickr.com",
    items: [],
  });

  const [state, dispatch] = useReducer<React.Reducer<ImageState, ImageAction>>(
    imageReducer,
    initialState
  );
  const [fetchMode, setFetchMode] = useState<"append" | "replace">("append");

  const [tags, setTags] = useState("");
  const [dynamicTag, setDynamicTag] = useState("");

  const sortResult = (mode: "asc" | "desc") => {
    const sortedItems = images.items.sort((item1, item2) => {
      return mode === "asc"
        ? item1.title.localeCompare(item2.title)
        : item2.title.localeCompare(item1.title);
    });

    setImages((prevImages) => ({
      ...prevImages,
      items: sortedItems,
    }));

    // reducer code
    dispatch({ type: "SET_SORT_ORDER", payload: mode });
    dispatch({ type: "SORT_ITEMS" });
  };

  const clearImageFn = () => {
    setImages({
      title: "Recent Uploads tagged tag1 or tag2",
      link: "https://www.flickr.com/photos/",
      description: "",
      modified: "2024-07-12T19:19:42Z",
      generator: "https://www.flickr.com",
      items: [],
    });
  };

  const fetchImages = () => {
    if (tags.length === 0) alert("search field can't be empty");
    else {
      getImages(tags).then((res) => {
        updateImages(fetchMode, res.data);
      });
    }
  };

  const updateImages = (mode: "append" | "replace", data: FlickrFeed) => {
    if (mode === "append") {
      const temp = images.items.concat(data.items);
      setImages((prevImages) => ({
        ...prevImages, // Spread the previous state to retain other properties
        items: temp, // Overwrite the items with the new data
      }));
      dispatch({ type: "SET_ITEMS", payload: temp });
    } else setImages(data);
  };

  const dynamicSearch = () => {
    getImages(tags).then((res) => {
      updateImages(fetchMode, res.data);
    });
  };

  return (
    <div id="container">
      <SideNav
        clearImageFn={clearImageFn}
        tags={tags}
        setTags={setTags}
        fetchImages={fetchImages}
        fetchMode={fetchMode}
        setFetchMode={setFetchMode}
        sortResult={sortResult}
        dynamicSearch={dynamicSearch}
        dynamicTags={dynamicTag}
        setDynamicTags={setDynamicTag}
      />
      <div
        className="column"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "10px",
          height: "calc(100vh - 20px)",
          overflowY: "scroll",
        }}
      >
        {images.items.map((item, index) => (
          <div className="image-container" key={index}>
            <img src={item.media.m} alt={item.title} />
            <span className="title">{item.title}</span>
            <span className="author">{item.author}</span>
            <span className="date">{item.title}</span>
          </div>
        ))}
        {images.items.length === 0 && <div className="loading-icon"></div>}
      </div>
    </div>
  );
}
