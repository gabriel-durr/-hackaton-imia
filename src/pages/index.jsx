import React, {useState} from 'react'
import {Flex, Stack, Text} from "@chakra-ui/react";
import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Tabs} from "../components/Tabs";
import {ContentPanel} from "../components/ContentPanel";

export default function Home({ data }) {

	console.log(data)

	const [selected, setSelected] = useState("TAB1"); 

	const onSelected = (selected) => {
		setSelected(selected)
	}

	return (
		<Flex w="100vw" h="100vh" justify="space-between" direction="column" overflowY="scroll">
			<Header />
			<Stack h="100%" w="100%" maxW="container.xl" bg="whiteAlpha.800" align="center">
				<Tabs selected={selected} onSelect={ onSelected }/>
				<ContentPanel selectedTemplate={selected} data={data}/>
			</Stack>
			<Footer />
		</Flex>
	);
}



export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`http://localhost:3000/api/main`)
	const data = await res.json()
  
	// Pass data to the page via props
	return { props: { data } }
  }