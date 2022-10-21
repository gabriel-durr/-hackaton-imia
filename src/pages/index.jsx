import {Flex, Button, Image, Stack, Box} from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState} from "react";

import {Footer} from "../components/Footer";
import {Header} from "../components/Header";

import {Graph} from "../components/templates/tab3/Graph";

export default function Home({}) {
	const [dataApi, setDataApi] = useState(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		axios
			.get("https://hackacton-imia.herokuapp.com")
			.then(res => setDataApi(res.data));
	}, []);

	function handleForward() {
		axios
			.post("https://hackacton-imia.herokuapp.com/next", {
				page: page,
			})
			.then(res => {
				setDataApi(res.data);
				setPage(res.data.page);
			});
	}

	function handleBack() {
		axios
			.post("https://hackacton-imia.herokuapp.com/prev", {
				page: page,
			})
			.then(res => {
				setDataApi(res.data);
				setPage(res.data.page);
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
				fontSize="1.1rem"
				onClick={handleBack}>
				<Image mr="2" src="back.svg" alt="Voltar" w="12" />
			</Button>

			<Stack
				pos="absolute"
				transform="translate(0%, 23%)"
				h="620px"
				w="90%"
				maxW="container.xl"
				direction="row"
				align="center"
				justify="center"
				boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px">
				{dataApi && (
					<Graph data={dataApi.graphStruct} title={dataApi.title} />
				)}
			</Stack>

			<Button
				pos="absolute"
				right="20"
				bottom="50%"
				top="50%"
				rounded="full"
				onClick={handleForward}>
				<Image ml="2" src="/next.svg" alt="Próximo" w="12" />
			</Button>

			<Footer />
		</Flex>
	);
}

// export async function getServerSideProps() {
// 	// Fetch data from external API

// 	let data = await axios
// 		.get(`https://hackacton-imia.herokuapp.com/`)
// 		.then(res => res.data);

// 	// Pass data to the page via props
// 	return {props: {data}};
// }
