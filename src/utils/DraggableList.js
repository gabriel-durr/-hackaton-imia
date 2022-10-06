import {Box, OrderedList, ListItem} from "@chakra-ui/react";
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

	return (
		<Box className="drag-app">
			<DragDropContext onDragEnd={handleDrop}>
				<Droppable droppableId="list-container">
					{provided => (
						<OrderedList
							className="list-container"
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{list.map((item, index) => (
								<Draggable
									key={item}
									draggableId={item}
									index={index}>
									{provided => (
										<ListItem
											rounded="md"
											color="gray.900"
											sx={{
												bg: "gray.100",
												color: "gray.900",
												border: "none",
											}}
											className="item-container"
											ref={provided.innerRef}
											{...provided.dragHandleProps}
											{...provided.draggableProps}>
											{item}
										</ListItem>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</OrderedList>
					)}
				</Droppable>
			</DragDropContext>
		</Box>
	);
};
