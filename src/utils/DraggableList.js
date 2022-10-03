import {useState} from "react";
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
		<div className="drag-app">
			<DragDropContext onDragEnd={handleDrop}>
				<Droppable droppableId="list-container">
					{provided => (
						<ol
							className="list-container"
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{list.map((item, index) => (
								<Draggable
									key={item}
									draggableId={item}
									index={index}>
									{provided => (
										<li
											className="item-container"
											ref={provided.innerRef}
											{...provided.dragHandleProps}
											{...provided.draggableProps}>
											{item}
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ol>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};
