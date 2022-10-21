import {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

export const DraggableStatus = ({children}) => {
	const [characters, updateCharacters] = useState(children);

	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(characters);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateCharacters(items);
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="characters">
				{provided => (
					<ul
						className="characters"
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{children.map((item, index) => {
							return (
								<Draggable
									key={item.key}
									draggableId={item.key}
									index={index}>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}>
											{item}
										</div>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
};
