import {Flex, Image, Button, Text} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";

export const Header = () => {
	return (
		<Flex
			h="9rem"
			w="100vw"
			align="center"
			px="2rem"
			justify="space-between"
			bgGradient="linear(90deg, #0a5779 0%,  #1976a2 100%, #21889b 100%)">
			<Image alt="iMia" src="/i-mia.png" w="290px" h="120px" />
			<Button
				rounded="full"
				variant="outline"
				p="1.6rem"
				_hover={{
					bg: "#5e8a9c56",
					transition: ".4s ease",
				}}>
				<MdOutlineAccountCircle size="1.8rem" color="#fff" />
				<Text
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					Dr. Ingo Hoffman
				</Text>
			</Button>
		</Flex>
	);
};
