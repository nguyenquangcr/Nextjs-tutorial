import { toast } from 'react-toastify';

export const openNotificationWithIcon = (status: any, key: any) => {
  switch (status) {
    case 200:
      return toast.success(key, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    case 400:
    case 401:
    case 402:
    case 500:
      return toast.error(key, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    default:
      return toast.warning(key, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
};
