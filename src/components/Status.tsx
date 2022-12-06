import { StatusType } from "../utils/Schema";

interface IStatusProps {
  status?: string;
  date?: string | Date;
}

const Status = ({ status, date }: IStatusProps) => {
  const statusType =
    status === StatusType.active
      ? { className: "active", label: "Active" }
      : status === StatusType.cancelled
      ? { className: "cancelled", label: "Cancelled" }
      : status === StatusType.non
      ? { className: "non", label: "NON" }
      : { className: "", label: "" };
  return (
    <div className={`status-${statusType.className}`}>
      {`${statusType.label}${
        date ? ` from ${new Date(date).toDateString()}` : ""
      }`}
    </div>
  );
};

export default Status;
