import { FC, ChangeEvent } from "react";

interface Props {
  clearImageFn: () => void;
  tags: string;
  setTags: (tags: string) => void; // Update the type for setTags to be more specific
}

export const SideNav: FC<Props> = ({ clearImageFn, tags, setTags }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value); // Update the tags with the input's current value
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
              onChange={handleInputChange} // Use the handleInputChange function
            />
            <button id="fetch-button" type="button">
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
              defaultChecked
              onChange={console.log}
            />
            Append
          </li>
          <li>
            <input type="radio" name="fetch-mode" value="replace" />
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
      />
      <div id="sort">
        <span>Sort by title: </span>
        <button value="asc" type="button">
          ASC
        </button>
        <button value="desc" type="button">
          DESC
        </button>
      </div>
    </div>
  );
};
