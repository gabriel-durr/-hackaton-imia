import {Flex} from "@chakra-ui/react";
import {Actions} from "./Actions";
import {Form} from "./Form";
import {Status} from "./Status";

export const Menu = () => {
	return (
		<Flex
			w="90%"
			h="90px"
			mt="30px"
			justify="center"
			bgGradient="linear(90deg, #0c4f6cbe 0%,  #26799fad 100%, #296d79aa 100%)">
			<Form />
			<Status />
			<Actions />
		</Flex>
	);
};
