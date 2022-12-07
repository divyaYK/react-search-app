import { AiFillCaretDown } from "react-icons/ai";

interface IAccordionProps {
  title: string;
}

const Accordion = ({ title }: IAccordionProps) => {
  return (
    <div className="accordion">
      <div className="accordion-item">
        <div className="accordion-title">
          <div>{title}</div>
          <AiFillCaretDown className="caret-icon" />
        </div>
        <div className="accordion-content">content</div>
      </div>
    </div>
  );
};

export default Accordion;
