import {HStack, Box, IconButton, Text, VStack, Image} from "@chakra-ui/react";
import {motion} from "framer-motion";

import {IoMdCloseCircle} from "react-icons/io";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

export const DraggableList = ({list, setItemList, endList, setEndList}) => {
	const handleDrop = droppedItem => {
		// Ignore drop outside droppable container

		if (!droppedItem.destination) return;

		if (
			droppedItem.source.droppableId ===
			droppedItem.destination.droppableId
		) {
			const result = reorder(droppedItem);
			if (droppedItem.source.droppableId === "droppable") {
				setItemList(result);
			} else {
				setEndList(result);
			}
		} else {
			//inter lists
			var result = [];
			if (droppedItem.destination.droppableId === "droppable2") {
				result = move(list, endList, droppedItem);
			} else {
				result = move(endList, list, droppedItem);
			}

			setItemList(result.droppable);
			setEndList(result.droppable2);
		}
	};

	const reorder = droppedItem => {
		switch (droppedItem.source.droppableId) {
			case "droppable":
				const result = Array.from(list);
				const [removed] = result.splice(droppedItem.source.index, 1);
				result.splice(droppedItem.destination.index, 0, removed);
				return result;
			case "droppable2":
				const result2 = Array.from(endList);
				const [removed2] = result2.splice(droppedItem.source.index, 1);
				result2.splice(droppedItem.destination.index, 0, removed2);
				return result2;
		}
	};

	const move = (source, destination, droppedItem) => {
		var sourceClone = Array.from(source);
		var destinationClone = Array.from(destination);

		const [removed] = sourceClone.splice(droppedItem.source.index, 1);

		destinationClone.splice(droppedItem.destination.index, 0, removed);

		const result = {};

		result[droppedItem.source.droppableId] = sourceClone;
		result[droppedItem.destination.droppableId] = destinationClone;

		return result;
	};

	function removeItemList(item) {
		const arrList = Array.from(list);
		const arrEnd = Array.from(endList);
		const listFiltred = arrList.filter(value => value != item);
		setItemList(listFiltred);
		const listFiltred2 = arrEnd.filter(value => value != item);
		setEndList(listFiltred2);
	}

	return (
		<DragDropContext onDragEnd={handleDrop}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided, snapshot) => (
					<HStack
						wrap="wrap"
						w="100%"
						p="17px"
						shadow="sm"
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{list.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={item.id}
								index={index}>
								{(provided, snapshot) => (
									<Box
										p="6px"
										pos="relative"
										minW="140px"
										shadow="lg"
										rounded="lg"
										color="#fff"
										my="20px"
										fontSize="1rem"
										border="none"
										bg={
											snapshot.isDragging
												? "blue.400"
												: "blue.300"
										}
										className="item-container"
										ref={provided.innerRef}
										{...provided.dragHandleProps}
										{...provided.draggableProps}>
										{item.label}
										<IconButton
											pos="absolute"
											rounded="full"
											size="xs"
											fontSize="25px"
											icon={<IoMdCloseCircle />}
											color="rgba(245, 91, 91, 0.63)"
											shadow="md"
											_hover={{
												color: "red.400",
												transition: ".4s ease",
											}}
											right="0"
											variant="unstyled"
											onClick={() =>
												removeItemList(item, index)
											}
										/>
									</Box>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</HStack>
				)}
			</Droppable>
			<Droppable droppableId="droppable2" direction="vertical">
				{(provided, snapshot) => (
					<VStack
						pos="relative"
						border="2px dotted #949494"
						align="center"
						justify="center"
						bg="#f7f7f7"
						rounded="lg"
						w="100%"
						minH="270px"
						p="20px"
						overflow="scroll"
						sx={{
							"&::-webkit-scrollbar": {
								width: "0px",
							},
						}}
						shadow="sm"
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{(endList.length < 1) & !!list.length && (
							<>
								<Image
									w="120px"
									h="120px"
									as={motion.img}
									src="/drag-scroll.svg"
									alt=""
									animate={{
										translateY: -10,
										opacity: 1,
										scale: 1.04,
										transition: {
											yoyo: Infinity,
											duration: 1.5,
										},
									}}
								/>

								<Text
									color="gray.500"
									fontWeight="hairline"
									fontSize="2xl">
									Arraste aqui os Itens
								</Text>
							</>
						)}

						{endList.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={item.id}
								index={index}>
								{(provided, snapshot) => (
									<Box
										p="5px"
										pos="relative"
										minW="200px"
										shadow="lg"
										rounded="lg"
										color="#fff"
										my="1rem"
										fontSize="1.3rem"
										border="none"
										bg="blue.400"
										bgGradient={
											snapshot.isDragging &&
											"linear-gradient(90deg, #355c7d 0%, #6c5b7b 50%, #c06c84 100%)"
										}
										className="item-container"
										ref={provided.innerRef}
										{...provided.dragHandleProps}
										{...provided.draggableProps}>
										{item.label}
										<IconButton
											pos="absolute"
											rounded="full"
											size="sm"
											fontSize="32px"
											icon={<IoMdCloseCircle />}
											color="rgba(245, 91, 91, 0.63)"
											shadow="md"
											_hover={{
												color: "red.400",
												transition: ".4s ease",
											}}
											right="0"
											variant="unstyled"
											onClick={() =>
												removeItemList(item, index)
											}
										/>
									</Box>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</VStack>
				)}
			</Droppable>
		</DragDropContext>
	);
};
