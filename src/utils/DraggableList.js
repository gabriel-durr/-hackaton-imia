import {OrderedList, ListItem, IconButton} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

export const DraggableList = ({list, setItemList}) => {
	const handleDrop = droppedItem => {
		// Ignore drop outside droppable container
		if (!droppedItem.destination) return;
		var updatedList = [...list];
		// Remove dragged item
		const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
		// Add dropped item
		updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
		// Update State
		setItemList(updatedList);
	};

	function removeItemList(item) {
		const listFiltred = list.filter(value => value != item);
		setItemList(listFiltred);
	}

	return (
		<DragDropContext onDragEnd={handleDrop}>
			<Droppable droppableId="list-container">
				{(provided, snapshot) => (
					<OrderedList
						shadow="sm"
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{list.map((item, index) => (
							<Draggable
								key={item}
								draggableId={item}
								index={index}>
								{(provided, snapshot) => (
									<>
										<ListItem
											pos="relative"
											shadow="lg"
											listStyleType="none"
											rounded="lg"
											color={
												snapshot.isDragging
													? "#fff"
													: "whiteAlpha.900"
											}
											w="300px"
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
												icon={<DeleteIcon />}
												color="#fff"
												pos="absolute"
												shadow="sm"
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
										</ListItem>
									</>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</OrderedList>
				)}
			</Droppable>
		</DragDropContext>
	);
};
