import { FaListUl, FaCheckCircle, FaClock } from "react-icons/fa";

function StatusFilter({ total, completed, pending, setFilter }) {
  return (
    <div className="status status-font">
      <p onClick={() => setFilter("all")}>
        <FaListUl className="icon total" /> Total: {total}
      </p>

      <p onClick={() => setFilter("completed")}>
        <FaCheckCircle className="icon completed" /> Completed: {completed}
      </p>

      <p onClick={() => setFilter("pending")}>
        <FaClock className="icon pending" /> Pending: {pending}
      </p>
    </div>
  );
}

export default StatusFilter;