import {Flex, Stack, Text} from "@chakra-ui/react";
import {Footer} from "../components/Footer";

export default function Home() {
	return (
		<Flex w="100vw" h="100vh" justify="space-between" direction="column">
			<Stack w="100%" maxW="container.xl" bg="whiteAlpha.800">
				<Text></Text>
			</Stack>
			<Footer />
		</Flex>
	);
}
