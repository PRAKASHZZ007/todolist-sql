import { FaSearch, FaCheckCircle, FaClock, FaInbox } from "react-icons/fa";
import { Box, Typography } from "@mui/material";

function EmptyState({ search, filter }) {
  return (
    <Box sx={{ textAlign: "center", mt: 5, opacity: 0.8 }}>
      {search ? (
        <>
          <FaSearch size={40} style={{ marginBottom: "10px" }} />
          <Typography sx={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>
            No items found
          </Typography>
        </>
      ) : filter === "completed" ? (
        <>
          <FaCheckCircle size={40} color="#2ecc71" />
          <Typography sx={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>
            No completed tasks
          </Typography>
        </>
      ) : filter === "pending" ? (
        <>
          <FaClock size={40} color="#f39c12" />
          <Typography sx={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>
            No pending tasks
          </Typography>
        </>
      ) : (
        <>
          <FaInbox size={40} style={{ marginBottom: "10px" }} />
          <Typography sx={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>
            No tasks available
          </Typography>
        </>
      )}
    </Box>
  );
}

export default EmptyState;