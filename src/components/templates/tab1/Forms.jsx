import {useState} from "react";
import {Flex, Button, Text, Input} from "@chakra-ui/react";
import {DraggableList} from "../../../utils/DraggableList";
import {mock} from "../../../utils/mock";

export const Forms = ({}) => {
	return (
		<Flex
			w="100%"
			h="100%"
			align="center"
			px="2rem"
			justify="flex-start"
			overflow="hidden"
			direction="column">
			<DraggableList data={mock} />
		</Flex>
	);
};
