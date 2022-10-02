import {Flex, Image, Button, Text} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";

export const Tabs = ({selected, onSelect}) => {
	return (
		<Flex
			h="100vh"
			w="100vw"
			align="flex-start"
			px="2rem"
			justify="center"
            marginTop="20px">
			<Button
				variant="outline"
                flexDirection="column"
                width="20rem"
                height="4rem"
                bg={selected == "TAB1" ? "#9c0c0c":"#0a5779"}
				_hover={{
					bg: "#5e8a9c56",
					transition: ".4s ease",
				}}
                onClick={()=> onSelect("TAB1")}>
				<MdOutlineAccountCircle size="1.8rem" color="#fff" />
				<Text
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					TAB1
				</Text>
			</Button>
            <Button
				variant="outline"
                flexDirection="column"
                width="20rem"
                height="4rem"
                bg={selected == "TAB2" ? "#9c0c0c":"#0a5779"}
				_hover={{
					bg: "#5e8a9c56",
					transition: ".4s ease",
				}}
                onClick={()=> onSelect("TAB2")}>
				<MdOutlineAccountCircle size="1.8rem" color="#fff" />
				<Text
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					TAB2
				</Text>
			</Button>
            <Button
				variant="outline"
                flexDirection="column"
                width="20rem"
                height="4rem"
                bg={selected == "TAB3" ? "#9c0c0c":"#0a5779"}
				_hover={{
					bg: "#5e8a9c56",
					transition: ".4s ease",
				}}
                onClick={()=> onSelect("TAB3")}>
				<MdOutlineAccountCircle size="1.8rem" color="#fff" />
				<Text
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					TAB3
				</Text>
			</Button>
		</Flex>
	);
};