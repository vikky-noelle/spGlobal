import { FC, ChangeEvent } from "react";

interface Props {
  clearImageFn: () => void;
  tags: string;
  setTags: (tags: string) => void;
  dynamicTags: string;
  setDynamicTags: (tags: string) => void;
  fetchMode: "append" | "replace";
  setFetchMode: (mode: "append" | "replace") => void;
  fetchImages: () => void;
  dynamicSearch: () => void;
  sortResult: (mode: "asc" | "desc") => void;
}

export const SideNav: FC<Props> = ({
  clearImageFn,
  tags,
  setTags,
  fetchMode,
  setFetchMode,
  fetchImages,
  sortResult,
  dynamicSearch,
  dynamicTags,
  setDynamicTags,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const handleFetchModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFetchMode(e.target.value as "append" | "replace");
  };

  const handleDynamicInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDynamicTags(e.target.value);
    dynamicSearch();
  };

  return (
    <div
      className="column"
      style={{
        height: "100vh",
        background: "#252c39",
        padding: "10px",
        width: "40% !important",
        display: "flex",
        flexDirection: "column",
        gap: "4em",
      }}
    >
      <img
        src="https://www.cappitech.com/wp-content/uploads/2021/01/cappitech-alt-logo.svg"
        alt=""
      />
      <div id="fetcher">
        <div id="tags">
          <form>
            <input
              type="text"
              id="fetch-tags"
              placeholder="Type one or more tags to fetch"
              name="tags"
              value={tags}
              onChange={handleInputChange}
            />
            <button id="fetch-button" type="button" onClick={fetchImages}>
              Fetch
            </button>
          </form>
        </div>
        <ul id="fetch-modes">
          <li>
            <input
              type="radio"
              name="fetch-mode"
              value="append"
              checked={fetchMode === "append"}
              onChange={handleFetchModeChange}
            />
            Append
          </li>
          <li>
            <input
              type="radio"
              name="fetch-mode"
              value="replace"
              checked={fetchMode === "replace"}
              onChange={handleFetchModeChange}
            />
            Replace
          </li>
        </ul>
        <button id="clear-images" onClick={clearImageFn}>
          Clear images
        </button>
      </div>
      <input
        type="text"
        placeholder="Type to search for an image"
        id="search-input"
        value={dynamicTags}
        onChange={handleDynamicInputChange}
      />
      <div id="sort">
        <span>Sort by title: </span>
        <button value="asc" type="button" onClick={() => sortResult("asc")}>
          ASC
        </button>
        <button value="desc" type="button" onClick={() => sortResult("desc")}>
          DESC
        </button>
      </div>
    </div>
  );
};
