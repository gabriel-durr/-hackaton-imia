import {Flex, Image, Button, Text} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";

export const ContentPanel = ({selectedTemplate}) => {
	
    const Template = ({selected}) => {
        console.log(selected)
        switch(selected){
            case "TAB1":
                return null;
            case "TAB2":
                return <Image alt="iMia" src="/i-mia.png" w="290px" h="120px" bg="#00f"/>
            case "TAB3":
                return null;

            default:
                return null;
        }
    }
    
    return (
		<Flex
			h="150rem"
			w="60rem"
			align="center"
			px="2rem"
			justify="center"
            marginTop="20px"
            border="1px #000 solid">
			
            <Template selected={selectedTemplate}/>
		</Flex>
	);
};