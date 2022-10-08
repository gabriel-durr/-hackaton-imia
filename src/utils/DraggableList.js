import {HStack, Box, IconButton, VStack} from "@chakra-ui/react";
import {useState} from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

export const DraggableList = ({list, setItemList}) => {
	const [endList, setEndList] = useState([]);

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
		const listFiltred = list.filter(value => value != item);
		setItemList(listFiltred);
		const listFiltred2 = endList.filter(value => value != item);
		setEndList(listFiltred2);
	}

	return (
		<DragDropContext onDragEnd={handleDrop}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided, snapshot) => (
					<HStack
						wrap="wrap"
						p="17px"
						bg="red"
						shadow="sm"
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{list.map((item, index) => (
							<Draggable
								key={item}
								draggableId={item}
								index={index}>
								{(provided, snapshot) => (
									<Box
										p="5px"
										pos="relative"
										minW="120px"
										shadow="lg"
										rounded="lg"
										color="#fff"
										my="1rem"
										fontSize="1rem"
										border="none"
										bg={
											snapshot.isDragging
												? "mia.400"
												: "mia.300"
										}
										className="item-container"
										ref={provided.innerRef}
										{...provided.dragHandleProps}
										{...provided.draggableProps}>
										{item}
										<IconButton
											pos="absolute"
											rounded="full"
											size="xs"
											icon={<AiOutlineCloseCircle />}
											color="#fff"
											shadow="md"
											_hover={{
												color: "red.400",
												transition: ".4s ease",
											}}
											right="2"
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
						bg="blue.100"
						w="100%"
						minH="300px"
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
						{endList.map((item, index) => (
							<Draggable
								key={item}
								draggableId={item}
								index={index}>
								{(provided, snapshot) => (
									<Box
										p="5px"
										pos="relative"
										minW="170px"
										shadow="lg"
										rounded="lg"
										color="#fff"
										my="1rem"
										fontSize="1.3rem"
										border="none"
										bg={
											snapshot.isDragging
												? "mia.400"
												: "mia.300"
										}
										className="item-container"
										ref={provided.innerRef}
										{...provided.dragHandleProps}
										{...provided.draggableProps}>
										{item}
										<IconButton
											pos="absolute"
											rounded="full"
											size="xs"
											icon={<AiOutlineCloseCircle />}
											color="#fff"
											shadow="md"
											_hover={{
												color: "red.400",
												transition: ".4s ease",
											}}
											right="2"
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
