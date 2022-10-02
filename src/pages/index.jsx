import React, {useState} from 'react'
import {Flex, Stack, Text} from "@chakra-ui/react";
import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Tabs} from "../components/Tabs";

export default function Home() {

	const [selected, setSelected] = useState("TAB1");

	const onSelected = (selected) => {
		setSelected(selected)
	}

	return (
		<Flex w="100vw" h="100vh" justify="space-between" direction="column">
			<Header />
			<Stack w="100%" maxW="container.xl" bg="whiteAlpha.800">
				<Tabs selected={selected} onSelect={ onSelected }/>
				<Text></Text>
			</Stack>
			<Footer />
		</Flex>
	);
}
