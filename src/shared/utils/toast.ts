import { toast } from "sonner";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning"
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast(message);
  }
};

export { toast };
