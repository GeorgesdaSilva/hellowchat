import { toast } from "react-toastify";
import { i18n } from "../translate/i18n";


const toastError = err => {
	const errorMsg = err.response?.data?.message || err.response.data.error;


	if (errorMsg) {
		if (i18n.exists(`backendErrors.${errorMsg}`)) {

			if (errorMsg === "ERR_OTHER_OPEN_TICKET") {
				toast.error(i18n.t(`backendErrors.${errorMsg}`) + ` ${err.response?.data.user}`, {
					toastId: errorMsg,
					style: {
						backgroundColor: '#FFC1CE',
						color: "#93344A",
						// fontWeight:"bold"
					}

				});
			} else {
				toast.error(i18n.t(`backendErrors.${errorMsg}`), {
					toastId: errorMsg,
					className: "error",
					style: {
						backgroundColor: '#FFC1CE',
						color: "#93344A",
						// fontWeight:"bold"
					}
				});
			}

		} else {
			toast.error(errorMsg, {
				toastId: errorMsg,
				className: "error",
				style: {
					backgroundColor: '#FFC1CE',
					color: "#93344A",
					// fontWeight:"bold"
				}
			});
		}
	} else {
		toast.error("An error occurred!", {
			style: {
				backgroundColor: '#FFC1CE',
				color: "#93344A",
				// fontWeight:"bold"
			}
		});
	}
};

export default toastError;
