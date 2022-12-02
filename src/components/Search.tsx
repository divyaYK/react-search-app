import Input from "./common/Input";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div className="nav-top">
      <div className="search-wrapper">
        <div className="search-content">
          <BsSearch size={25} />
          <Input
            className="input-search"
            type="search"
            aria-label="search entities"
            placeholder="Search entities"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
