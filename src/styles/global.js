import {extendTheme} from "@chakra-ui/react";

const styles = {
	global: {
		"html, body": {
			bg: "whiteAlpha.900",
			color: "grey.900",
			fontSize: "0.95rem",
			overflowX: "hidden",
			scrollBehavior: "smooth",
			scrollPaddingTop: "120px",
			"&::-webkit-scrollbar": {
				width: "8px",
				backgroundColor: "whiteAlpha.900",
			},
			"&::-webkit-scrollbar-thumb": {
				width: "8px",
				bgColor: "gray.600",
				borderRadius: "4px",
			},
		},

		a: {
			color: "grey.900",
			_hover: {
				textDecoration: "none !important",
				outline: "none",
				border: "none",
			},
		},
		"*::placeholder": {
			color: "gray.500",
		},
		".drop-area": {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: "15em",
			height: "5em",
			border: "1px #000 dashed",
		},
		".drag-app": {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		"list-container": {
			display: "flex",
			fontSize: "10px",
			flexDirection: "column",
		},
		".list-container": {
			display: "flex",
			fontSize: "18px",
			flexDirection: "column",
		},
		".item-container": {
			diplay: "flex",
			textAlign: "center",
			border: "1px #000 solid",
			padding: "15px 30px",
			margin: "5px 10px",
		},
	},
};

export const colors = {
	grey: {
		900: "#181B23",
		800: "#212529",
		700: "#343A40",
		600: "#495057",
		500: "#6C757D",
		400: "#ADB5BD",
		300: "#CED4DA",
		200: "#DEE2E6",
		100: "#E9ECEF",
		50: "#dad9d6",
	},
	mia: {
		50: "#00232f",
		100: "#034d72",
		200: "#0F1B31",
		300: "#20879a",
		400: "#e0245e",
	},
};

const fonts = {
	heading: "DM Sans, sans-serif",
	body: "DM Sans, sans-serif",
};

const theme = extendTheme({
	styles,
	colors,
	fonts,
	components: {},
});

export default theme;
