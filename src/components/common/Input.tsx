interface InputProps {
  "aria-label": string;
  type: string;
  placeholder: string;
  className: string;
}

const Input = (props: InputProps) => {
  return (
    <input
      className={props.className}
      aria-label={props["aria-label"]}
      type="search"
      placeholder={props.placeholder}
    />
  );
};

export default Input;
