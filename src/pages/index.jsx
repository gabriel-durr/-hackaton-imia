import {Flex, Stack, Text} from "@chakra-ui/react";
import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Menu} from "../components/Menu";

export default function Home({data}) {
	return (
		<Flex
			w="100vw"
			h="100vh"
			bg="whiteAlpha.800"
			justify="space-between"
			align="center"
			direction="column">
			<Header />
			<Stack
				align="center"
				justify="flex-start"
				w="100%"
				h="80%"
				maxW="container.xl">
				<Menu />
			</Stack>
			<Footer />
		</Flex>
	);
}

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`http://localhost:3000/api/hello`);
	const data = await res.json();

	// Pass data to the page via props
	return {props: {data}};
}
