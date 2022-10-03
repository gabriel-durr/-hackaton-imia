import {Heading, Flex, Link, Image} from "@chakra-ui/react";
import NextLink from "next/link"


export const Footer = () => {
	return (
		<Flex
			as="footer"
			h="9rem"
			w="100vw"
			flexDir="row"
			align="center"
			justify="space-around"
			bgGradient="linear(90deg, #0a5779 0%,  #1976a2 100%, #21889b 100%)">
				<NextLink href="#" passHref>
					<Link>
						<Image src="cardboard.svg" w="50px" />
					</Link>
				</NextLink>
				<NextLink href="#" passHref>
					<Link>			
						<Image src="globe.svg" w="50px"  />
					</Link>
				</NextLink>

				<NextLink href="/form" passHref>
					<Link>
						<Image src="compass.svg" w="50px"  />
					</Link>
				</NextLink>
				
		
			
		</Flex>
	);
};
