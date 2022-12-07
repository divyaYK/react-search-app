import Accordion from "./Accordion";

const FilterNav = () => {
  return (
    <nav className="filter-nav">
      <div className="filter-header">Filters</div>
      <ul className="filter-list">
        <li>
          <Accordion title="Abn" />
        </li>
        <li>
          <Accordion title="Entity Category" />
        </li>
        <li>
          <Accordion title="Entity Code" />{" "}
        </li>
        <li>
          <Accordion title="Entity Name" />{" "}
        </li>
        <li>
          <Accordion title="ASIC Number" />{" "}
        </li>
        <li>
          <Accordion title="Address" />{" "}
        </li>
        <li>
          <Accordion title="GST" />{" "}
        </li>
        <li>
          <Accordion title="DGR" />{" "}
        </li>
        <li>
          <Accordion title="Other Entities" />{" "}
        </li>
      </ul>
    </nav>
  );
};

export default FilterNav;
