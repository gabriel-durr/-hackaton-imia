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
		500: "#c40052",
		600: "#2694a3",
	},
};

const fonts = {
	heading: "DM Sans, sans-serif",
	body: "Maven Pro, sans-serif",
};

const theme = extendTheme({
	styles,
	colors,
	fonts,
	components: {},
});

export default theme;
