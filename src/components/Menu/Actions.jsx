import {IoExit} from "react-icons/io5";

import {
	Box,
	Icon,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	Flex,
	ButtonGroup,
	useDisclosure,
	IconButton,
	Button,
	useEditableControls,
	PopoverCloseButton,
	Editable,
	EditablePreview,
	Input,
	EditableInput,
} from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";

function CustomControlsExample() {
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
				<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
				<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
			</ButtonGroup>
		) : (
			<Flex justifyContent="center">
				<IconButton
					size="sm"
					icon={<EditIcon />}
					{...getEditButtonProps()}
				/>
			</Flex>
		);
	}

	return (
		<Editable
			textAlign="center"
			defaultValue="Rasengan ⚡️"
			fontSize="2xl"
			isPreviewFocusable={false}>
			<EditablePreview />
			{/* Here is the custom input */}
			<Input as={EditableInput} />
			<EditableControls />
		</Editable>
	);
}

export const Actions = () => {
	const {onOpen, onClose, isOpen} = useDisclosure();

	return (
		<>
			<Popover
				trigger="hover"
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				placement="bottom-start"
				closeOnBlur={false}>
				<PopoverTrigger>
					<Box
						w="33.3%"
						display="flex"
						justifyContent="center"
						flexDirection="column"
						bg={isOpen ? "#d00d17" : ""}
						fontWeight="hairline"
						fontSize="md"
						color="#ffffffff"
						gap="2"
						alignItems="center">
						<Icon boxSize="7" color="#fff" as={IoExit} />
						Ações
					</Box>
				</PopoverTrigger>
				<PopoverContent p={5} w="1000px" h="2xl" shadow="dark-lg">
					<FocusLock returnFocus persistentFocus={false}>
						<PopoverArrow />
						<PopoverCloseButton />
						<CustomControlsExample />
						<CustomControlsExample />
						<ButtonGroup display="flex" justifyContent="flex-end">
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="teal">Save</Button>
						</ButtonGroup>
					</FocusLock>
				</PopoverContent>
			</Popover>
		</>
	);
};
