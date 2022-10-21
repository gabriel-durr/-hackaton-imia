import {Flex, Button, Image, Stack, Box} from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState} from "react";

import {Footer} from "../components/Footer";
import {Header} from "../components/Header";

import {Graph} from "../components/templates/tab3/Graph";

export default function Home({data}) {
	const [dataApi, setDataApi] = useState(data);
	const [page, setPage] = useState(data.page);

	function handleBack() {
		axios.post(dataApi, {
			page: page,
		});
	}

	return (
		<Flex
			pos="relative"
			w="100vw"
			h="100vh"
			justify="space-between"
			align="center"
			bg="whiteAlpha.800"
			direction="column"
			overflow="hidden">
			<Header />
			<Button
				pos="absolute"
				left="20"
				rounded="full"
				bottom="50%"
				top="50%"
				fontSize="1.1rem">
				<Image mr="2" src="back.svg" alt="Voltar" w="12" />
			</Button>

			<Stack
				pos="absolute"
				transform="translate(0%, 23%)"
				h="620px"
				w="90%"
				maxW="container.xl"
				direction="row"
				align="flex-start"
				justify="center"
				boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px">
				<Box w="100%" h="100%">
					<Graph data={dataApi.graphStruct} />
				</Box>
			</Stack>

			<Button
				pos="absolute"
				right="20"
				bottom="50%"
				top="50%"
				rounded="full">
				<Image ml="2" src="/next.svg" alt="Próximo" w="12" />
			</Button>

			<Footer />
		</Flex>
	);
}

export async function getStaticProps() {
	// Fetch data from external API

	let data = await axios
		.get(`https://hackacton-imia.herokuapp.com/`)
		.then(res => res.data);

	// Pass data to the page via props
	return {props: {data}};
}
