import {useState} from "react";
import {Flex, Stack} from "@chakra-ui/react";

import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Tabs} from "../components/Tabs";
import {ContentPanel} from "../components/ContentPanel";
import {Tab3Template} from "../components/templates/tab3/Tab3Template";
import {
	FaStepBackward,
	FaStepForward,
	FaDigitalTachograph,
} from "react-icons/fa";

export default function Home({data}) {
	const [selected, setSelected] = useState("TAB1");

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
					tab3={<Tab3Template data={data.graphStruct} />}
					tab2={<Tab3Template data={data.graphStruct} />}
					tab1={<Tab3Template data={data.graphStruct} />}
				/>
			</Stack>
			<Footer />
		</Flex>
	);
}

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`http://localhost:3000/api/main`);
	const data = await res.json();

	// Pass data to the page via props
	return {props: {data}};
}
