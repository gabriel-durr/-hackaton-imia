import {Heading, Flex, Link, Image, IconButton, Icon} from "@chakra-ui/react";
import {FaVrCardboard, FaGlobe, FaDraftingCompass} from "react-icons/fa";
import NextLink from "next/link";

export const Footer = () => {
	return (
		<Flex
			as="footer"
			h="90px"
			pos="fixed"
			bottom="0"
			w="100vw"
			flexDir="row"
			align="center"
			justify="space-around"
			bgGradient="linear(90deg, #0a5779 0%,  #1976a2 100%, #21889b 100%)">
			<NextLink href="/" passHref>
				<Link>
					<Icon boxSize="14" as={FaVrCardboard} color="#ffffffef" />
				</Link>
			</NextLink>
			<NextLink href="#" passHref>
				<Link>
					<Icon boxSize="14" as={FaGlobe} color="#ffffffef" />
				</Link>
			</NextLink>

			<NextLink href="/form" passHref>
				<Link>
					<Icon
						boxSize="14"
						as={FaDraftingCompass}
						color="#ffffffef"
					/>
				</Link>
			</NextLink>
		</Flex>
	);
};
