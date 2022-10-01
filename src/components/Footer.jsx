import {Heading, Flex} from "@chakra-ui/react";

export const Footer = () => {
	return (
		<Flex
			as="footer"
			h="9rem"
			w="100vw"
			align="center"
			justify="center"
			bgGradient="linear(90deg, #061253 0%, #254473 20%, #1976a2 100%, #00d9ff 100%)">
			<Heading color="#fff">Footer</Heading>
		</Flex>
	);
};
