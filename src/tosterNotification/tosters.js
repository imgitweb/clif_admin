import { Slide, toast } from "react-toastify"

export const SuccessNotification = (message) =>{
    toast.success(message,{
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition : Slide
    })
}

export const ErrorNotification = (message) =>{
    toast.error(message,{
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition : Slide
    })
}