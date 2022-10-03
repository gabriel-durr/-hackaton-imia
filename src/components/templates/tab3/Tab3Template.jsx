import {useState} from "react";
import {Flex} from "@chakra-ui/react";

import {Frequency} from "../../../components/Frequency";
import {Graph} from "../../../components/Graph";

export const Tab3Template = ({data1, data2, data3}) => {
	const [frequency, setFrequency] = useState("MES");

	return (
		<Flex
			align="center"
			px="2rem"
			w="100%"
			justify="flex-start"
			margin="15px"
			direction="column">
			<Frequency selected={frequency} onSelect={setFrequency} />
			<Graph data1={data1} data2={data2} data3={data3} />
		</Flex>
	);
};
