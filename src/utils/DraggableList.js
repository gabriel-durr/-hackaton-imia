import {OrderedList, ListItem, IconButton} from "@chakra-ui/react";
import {AiOutlineCloseCircle} from "react-icons/ai";
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
						listStyleType="none"
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
											p="20px"
											pos="relative"
											shadow="lg"
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
												pos="absolute"
												rounded="full"
												size="sm"
												icon={
													<AiOutlineCloseCircle size="sm" />
												}
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
