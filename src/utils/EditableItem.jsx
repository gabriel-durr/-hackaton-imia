import {
	IconButton,
	ButtonGroup,
	Flex,
	Editable,
	EditablePreview,
	Input,
	EditableInput,
	useEditableControls,
} from "@chakra-ui/react";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";

export const EditableItem = props => {
	/* Here's a custom control */
	function EditableControls() {
		const {
			isEditing,
			getSubmitButtonProps,
			getCancelButtonProps,
			getEditButtonProps,
		} = useEditableControls();

		return isEditing ? (
			<ButtonGroup justifyContent="center" size="sm">
				<IconButton
					aria-label="Ícone Confirmar"
					color="green.400"
					icon={<CheckIcon />}
					{...getSubmitButtonProps()}
				/>
				<IconButton
					aria-label="Ícone Fechar"
					color="red.400"
					icon={<CloseIcon />}
					{...getCancelButtonProps()}
				/>
			</ButtonGroup>
		) : (
			<Flex justifyContent="center">
				<IconButton
					aria-label="Ícone Editar"
					color="cyan.400"
					size="md"
					icon={<EditIcon />}
					{...getEditButtonProps()}
				/>
			</Flex>
		);
	}

	return (
		<Editable
			pos="relative"
			right="-8"
			top="-2"
			textAlign="center"
			defaultValue={props.value}
			value={props.value}
			fontWeight="bold"
			display="flex"
			gap="7"
			flexDirection="row"
			isPreviewFocusable={false}
			{...props}>
			<EditablePreview />
			{/* Here is the custom input */}
			<Input
				as={EditableInput}
				onChange={e => props.setValue(e.target.value)}
			/>
			<EditableControls />
		</Editable>
	);
};
