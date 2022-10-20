import {useState} from "react";
import {Flex, IconButton, Stack} from "@chakra-ui/react";
import axios from "axios";
import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";

import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Tabs} from "../components/Tabs";
import {ContentPanel} from "../components/ContentPanel";

import {
	FaStepBackward,
	FaStepForward,
	FaDigitalTachograph,
} from "react-icons/fa";
import {Graph} from "../components/templates/tab3/Graph";

export default function Home({data}) {
	const [selected, setSelected] = useState("TAB2");

	const onSelected = selected => {
		setSelected(selected);
	};
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

			<Stack
				pos="absolute"
				transform="translate(0%, 23%)"
				h="670px"
				w="100%"
				maxW="container.xl"
				direction="row"
				align="center"
				justify="space-between"
				boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px">
				<IconButton icon={<ArrowLeftIcon />} />
				<Graph data={data.graphStruct} />
				<IconButton icon={<ArrowRightIcon />} />
			</Stack>

			<Footer />
		</Flex>
	);
}

export async function getStaticProps() {
	// Fetch data from external API
	let data = await axios
		.get("https://hackacton-imia.herokuapp.com/")
		.then(res => res.data);

	// Pass data to the page via props
	return {props: {data}};
}
