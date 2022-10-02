import React, {useState} from 'react';
import {Flex, Image, Button, Text, Input} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";
import { Dropzone } from '../../../utils/Dropzone';
import { DraggableList } from '../../../utils/DraggableList';

export const DataTemplate = () => {
	const [title, setTitle] = useState("");
    const [hasFile, setHasFile] = useState(false);
    const [keysList, setKeysList] = useState([])

    const onHandleKeys = async() => {
        if(hasFile){
            await fetch("http://0.0.0.0:9999/get_keys",{
                method: "POST",
            })
            .then(response => response.json())
            .then(data => setKeysList(data.data))
            .catch(error => console.log(error))
        }
    }
    
    return (
		<Flex
			align="flex-start"
			px="2rem"
			justify="center"
            margin="15px"
            direction="column">
            <Text
                fontSize="1.5rem"
                fontWeight="bold"
                as="span"
                color="#000"
                ml="5px">
                Titulo
            </Text>
            <Input
                type="text"
                border="1px #000 solid"
                value={title}
                onChange={e => setTitle(e.target.value)}/>
            <Flex
                direction="row"
                align="center"
                py="1em">
                <Dropzone onHandleDrag={setHasFile}/>
                {hasFile && <Button
                    variant="outline"
                    flexDirection="column"
                    width="15em"
                    height="5em"
                    bg="#0a5779"
                    marginLeft="10px"
                    _hover={{
                        bg: "#5e8a9c56",
                        transition: ".4s ease",
                    }}
                    onClick={()=> onHandleKeys()}>
                    <Text
                        fontSize="1.09rem"
                        as="span"
                        color="#fff"
                        ml="5px"
                        fontWeight="thin">
                        Get Keys
                    </Text>
                </Button>}
            </Flex>
            <DraggableList list={keysList} setItemList={setKeysList}/>
		</Flex>
	);
};