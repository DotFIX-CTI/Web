import { Slide, toast, ToastOptions } from "react-toastify";
import Icon from "./icon";

const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 10000,
  closeOnClick: true,
  draggable: true,
  transition: Slide,
};

export const toastSucesso = (msg: string) =>
  toast.success(msg, {
    ...defaultOptions,
    icon: <Icon name="save" />,
  });

export const toastErro = (msg: string) =>
  toast.error(msg, {
    ...defaultOptions,
    icon: <Icon name="info" />,
  });
