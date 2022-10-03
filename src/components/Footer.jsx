import {Heading, Flex} from "@chakra-ui/react";

export const Footer = () => {
	return (
		<Flex
			as="footer"
			h="9rem"
			w="100vw"
			align="center"
			justify="center"
			bgGradient="linear(90deg, #0a5779 0%,  #1976a2 100%, #21889b 100%)">
			<Heading color="#fff">Footer</Heading>
		</Flex>
	);
};
