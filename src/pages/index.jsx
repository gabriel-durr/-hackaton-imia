import {useState} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import axios from "axios";

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
			w="100vw"
			h="100vh"
			justify="space-between"
			align="center"
			direction="column">
			<Header />
			<Stack
				h="100%"
				w="100%"
				maxW="container.xl"
				bg="whiteAlpha.800"
				align="center">
				<Tabs
					selected={selected}
					onSelect={onSelected}
					label1="anterior"
					label2="agora"
					label3="próximo"
					icon1={FaStepBackward}
					icon2={FaDigitalTachograph}
					icon3={FaStepForward}
				/>
				<ContentPanel
					selectedTemplate={selected}
					tab1={<></>}
					tab2={<Graph data={data.graphStruct} />}
					tab3={<></>}
				/>
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
