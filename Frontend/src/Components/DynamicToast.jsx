import { CloseOutlined } from "@mui/icons-material";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import DynamicButton from "./ui/DynamicButton";

const DynamicToast = () => {
  return (
    <Toaster toastOptions={{ duration: 4000 }} position="bottom-left">
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <DynamicButton
                  color="black"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <CloseOutlined />
                </DynamicButton>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default DynamicToast;
