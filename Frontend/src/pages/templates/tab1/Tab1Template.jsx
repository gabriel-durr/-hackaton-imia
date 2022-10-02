import React, {useState} from 'react';
import {Flex, Image, Button, Text} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";
import { DataTemplate } from './DataTemplate';

export const Tab1Template = () => {
	const [step, setStep] = useState(0)
    const Template = ({step}) => {
        switch(step){
            case 0:
                return <DataTemplate/>
            case 1:
                return <Image alt="iMia" src="/i-mia.png" w="290px" h="120px" bg="#00f"/>
            case 2:
                return null;

            default:
                return null;
        }
    }
    
    return (
		<Flex
			align="center"
			px="2rem"
            w="100%"
			justify="flex-start"
            margin="15px">
			
            <Template step={step}/>
		</Flex>
	);
};