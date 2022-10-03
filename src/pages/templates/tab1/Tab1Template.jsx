import React, {useState} from 'react';
import {Flex, Image, Button, Text} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";
import { DataTemplate } from './DataTemplate';
import { StatusTemplate } from './StatusTemplate';
import { ProceduresTemplate } from './ProceduresTemplate';

export const Tab1Template = ({ data }) => {
	const [step, setStep] = useState(0)
    const Template = ({step}) => {
        switch(step){
            case 0:
                return <DataTemplate setStep={setStep} data={data}/>
            case 1:
                return <StatusTemplate setStep={setStep}/>
            case 2:
                return <ProceduresTemplate setStep={setStep}/>

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