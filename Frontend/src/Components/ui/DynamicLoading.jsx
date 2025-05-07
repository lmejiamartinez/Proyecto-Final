import { Backdrop, CircularProgress } from "@mui/material";

const DynamicLoading = ({ loading = false }) => {
  return (
    <Backdrop open={loading} sx={{ color: "#fff", zIndex: "2000" }}>
      <CircularProgress color="primary" size={120} />
    </Backdrop>
  );
};

export default DynamicLoading;
