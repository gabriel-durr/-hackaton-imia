import {Flex, Stack} from "@chakra-ui/react";
import {useState} from "react";
import {Footer} from "../components/Footer";
import {Header} from "../components/Header";

import axios from "axios";

import {DataTab} from "../components/templates/tab1/DataTab";
import {StatusTab} from "../components/templates/tab1/StatusTab";
import {ActionsTab} from "../components/templates/tab1/ActionsTab";

import {ContentPanel} from "../components/ContentPanel";

import {Tabs} from "../components/Tabs";
import {IoExit} from "react-icons/io5";
import {ImEnter} from "react-icons/im";
import {BsBezier} from "react-icons/bs";

export default function Form({data}) {
	const [selected, setSelected] = useState("TAB1");
	const [list, setList] = useState([]);

	const [process, setProcess] = useState({
		statusList: ["Aguardando status..."],
		process: [
			"Notificação no Gráfico",
			"Notificação Push",
			"Botão Flutuante",
		],
	});

	const resultList = async result => {
		setList(result.map(result => result.label));
	};

	const onSelected = selected => {
		setSelected(selected);
	};

	const resultStatus = result => {
		setProcess({
			...process,
			statusList: Object.values(result),
		});
	};

	return (
		<Flex
			w="100vw"
			h="100vh"
			justify="space-between"
			align="center"
			boxShadow="inset 1px -1px 17px 0px rgba(0,0,0,1)"
			direction="column">
			<Header />
			<Stack h="100%" w="100%" maxW="container.xl" align="center">
				<Tabs
					selected={selected}
					onSelect={onSelected}
					label1="Dados"
					label2="status"
					label3="ações"
					icon1={ImEnter}
					icon2={BsBezier}
					icon3={IoExit}
				/>
				<ContentPanel
					selectedTemplate={selected}
					tab1={<DataTab resultList={resultList} />}
					tab2={<StatusTab list={list} resultStatus={resultStatus} />}
					tab3={
						<ActionsTab process={process} setProcess={setProcess} />
					}
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
