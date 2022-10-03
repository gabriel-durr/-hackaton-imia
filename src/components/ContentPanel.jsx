import {Flex, Image, Button, Text} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";
import { Tab1Template } from "../pages/templates/tab1/Tab1Template";
import { Tab3Template } from "../pages/templates/tab3/Tab3Template";


export const ContentPanel = ({selectedTemplate, data}) => {
	
    const Template = ({selected}) => {
        switch(selected){
            case "TAB1":
                return <Tab1Template data={data.dataObject}/>
            case "TAB2":
                return <Image alt="iMia" src="/i-mia.png" w="290px" h="120px" bg="#00f"/>
            case "TAB3":
                return <Tab3Template data1={data.data1} data2={data.data2} data3={data.data3}/>

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
			justify="flex-start"
            marginTop="20px"
            border="1px #000 solid"
            direction="column">
			
            <Template selected={selectedTemplate}/>
		</Flex>
	);
};