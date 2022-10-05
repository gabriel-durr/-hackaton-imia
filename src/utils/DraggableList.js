import {useEffect, useState} from "react";
import {
	Box,
	Stack,
	Text,
	ListItem,
	OrderedList,
	VStack,
} from "@chakra-ui/react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

export const DraggableList = ({data}) => {
	const [items, setItems] = useState([]);
	const [groups, setGroups] = useState({});

	useEffect(() => {
		// Mock an API call.
		buildAndSave(data);
	}, [data]);

	function buildAndSave(items) {
		const groups = {};
		for (let i = 0; i < Object.keys(items).length; ++i) {
			const currentGroup = items[i];
			groups[currentGroup.id] = i;
		}

		// Set the data.
		setItems(items);

		// Makes the groups searchable via their id.
		setGroups(groups);
	}

	return (
		<DragDropContext
			onDragEnd={result => {
				const {destination, draggableId, source, type} = result;

				if (!destination) {
					return;
				}

				if (
					destination.droppableId === source.droppableId &&
					destination.index === source.index
				) {
					return;
				}

				if ("group" === type) {
					const sourceIndex = source.index;
					const targetIndex = destination.index;

					const workValue = items.slice();
					const [deletedItem] = workValue.splice(sourceIndex, 1);
					workValue.splice(targetIndex, 0, deletedItem);

					buildAndSave(workValue);

					return;
				}

				const sourceDroppableIndex = groups[source.droppableId];
				const targetDroppableIndex = groups[destination.droppableId];
				const sourceItems = items[sourceDroppableIndex].items.slice();
				const targetItems =
					source.droppableId !== destination.droppableId
						? items[targetDroppableIndex].items.slice()
						: sourceItems;

				// Pull the item from the source.
				const [deletedItem] = sourceItems.splice(source.index, 1);
				targetItems.splice(destination.index, 0, deletedItem);

				const workValue = items.slice();
				workValue[sourceDroppableIndex] = {
					...items[sourceDroppableIndex],
					items: sourceItems,
				};
				workValue[targetDroppableIndex] = {
					...items[targetDroppableIndex],
					items: targetItems,
				};

				setItems(workValue);
			}}>
			<Droppable droppableId="ROOT" type="group">
				{provided => (
					<Stack
						bg="#aebeef1f"
						py="2rem"
						w="100%"
						h="95%"
						spacing="7"
						align="center"
						overflow="scroll"
						sx={{
							"&::-webkit-scrollbar": {
								width: "0px",
							},
						}}
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{items.map((item, index) => (
							<Draggable
								draggableId={item.id}
								key={item.id}
								index={index}>
								{provided => (
									<Box
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}>
										<DroppableList
											key={item.id}
											{...item}
										/>
									</Box>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</Stack>
				)}
			</Droppable>
		</DragDropContext>
	);
};

function DroppableList({id, items, label}) {
	return (
		<Droppable droppableId={id}>
			{(provided, snapshot) => (
				<VStack
					w="400px"
					h="300px"
					bg="#fdf1f5"
					spacing="2"
					p="0.5rem"
					{...provided.droppableProps}
					ref={provided.innerRef}>
					<Text
						fontSize="2xl"
						color="mia.400"
						fontWeight="extrabold"
						textTransform="uppercase">
						{label}
					</Text>
					<Stack
						w="100%"
						h="100%"
						fontSize="xl"
						overflow="scroll"
						sx={{
							"&::-webkit-scrollbar": {
								width: "0px",
							},
						}}
						bg="#fff">
						<OrderedList px="1rem">
							{items.map((item, index) => (
								<ListItem
									my="1rem"
									key={item.id}
									border={
										snapshot.isDraggingOver &&
										"1px dotted #000"
									}>
									<Draggable
										draggableId={item.id}
										index={index}>
										{(provided, snapshot) => (
											<Box
												px="1rem"
												py="1rem"
												rounded="sm"
												bg={
													snapshot.isDragging
														? "#0c407f"
														: "#6690ae"
												}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												ref={provided.innerRef}>
												{item.label}
											</Box>
										)}
									</Draggable>
								</ListItem>
							))}
							{provided.placeholder}
						</OrderedList>
					</Stack>
				</VStack>
			)}
		</Droppable>
	);
}
