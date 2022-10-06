import React, {useState} from "react";
import {Flex, Button, Text, Input} from "@chakra-ui/react";
import {Dropzone} from "../../../utils/Dropzone";
import {DraggableList} from "../../../utils/DraggableList";

export const Forms = ({data}) => {
	const [title, setTitle] = useState("");
	const [hasFile, setHasFile] = useState(false);
	const [keysList, setKeysList] = useState([]);

	const onHandleKeys = async () => {
		if (hasFile) {
			setKeysList(data);
		}
	};

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
				onChange={e => setTitle(e.target.value)}
			/>
			<Flex direction="row" align="center" py="1em">
				<Dropzone onHandleDrag={setHasFile} />
				{hasFile && (
					<Button
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
						onClick={() => onHandleKeys()}>
						<Text
							fontSize="1.09rem"
							as="span"
							color="#fff"
							ml="5px"
							fontWeight="thin">
							Import document
						</Text>
					</Button>
				)}
			</Flex>
			<Flex
				direction="row"
				justifyContent="space-between"
				w="40em"
				alignItems="flex-end">
				<DraggableList list={keysList} setItemList={setKeysList} />
			</Flex>
		</Flex>
	);
};
