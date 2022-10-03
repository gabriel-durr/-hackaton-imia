import {ImEnter, ImPlus, ImCross} from "react-icons/im";
import {
	Box,
	Icon,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	Flex,
	Heading,
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
	VStack,
	HStack,
	Stack,
} from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import {useState} from "react";

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
		<>
			<VStack bg="#ffff" w="500px" h="300px" shadow="lg">
				<Heading>Titulo do Formulário</Heading>
				<Editable
					textAlign="center"
					defaultValue="Fluxo"
					fontSize="2xl"
					isPreviewFocusable={false}>
					<HStack>
						<EditablePreview />
						{/* Here is the custom input */}
						<Input as={EditableInput} />
						<EditableControls />
					</HStack>
				</Editable>

				<Editable
					textAlign="center"
					defaultValue="Propriedade"
					fontSize="2xl"
					isPreviewFocusable={false}>
					<HStack>
						<EditablePreview />
						{/* Here is the custom input */}
						<Input as={EditableInput} />
						<EditableControls />
					</HStack>
				</Editable>
				<Editable
					textAlign="center"
					defaultValue="Colaborador"
					fontSize="2xl"
					isPreviewFocusable={false}>
					<HStack>
						<EditablePreview />
						{/* Here is the custom input */}
						<Input as={EditableInput} />
						<EditableControls />
					</HStack>
				</Editable>
			</VStack>
		</>
	);
}

export const Form = () => {
	const {onOpen, onClose, isOpen} = useDisclosure();
	const [newForm, setNewForm] = useState([<CustomControlsExample key="1" />]);

	return (
		<>
			<Popover
				trigger="hover"
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				placement="bottom-end"
				closeOnBlur={false}>
				<PopoverTrigger>
					<Box
						w="33.3%"
						display="flex"
						bg={isOpen ? "#d00d17" : ""}
						justifyContent="center"
						flexDirection="column"
						fontWeight="hairline"
						fontSize="md"
						color="#ffffffff"
						gap="2"
						alignItems="center">
						<Icon boxSize="7" color="#fff" as={ImEnter} />
						Formulários
					</Box>
				</PopoverTrigger>
				<PopoverContent p="2" w="1000px" h="2xl" shadow="dark-lg">
					<Stack
						h="100%"
						w="100%"
						justify="flex-start"
						overflow="scroll"
						sx={{
							"&::-webkit-scrollbar": {
								width: "0px",
							},
						}}>
						<FocusLock returnFocus persistentFocus={false}>
							<PopoverArrow />

							<PopoverCloseButton
								pos="fixed"
								right="10"
								size="20"
							/>
							<VStack spacing="7" my="10">
								{newForm}
							</VStack>
							<ButtonGroup
								bg="#fff"
								rounded="md"
								justifyContent="center"
								pos="fixed"
								w="160px"
								bottom="20"
								right="50%"
								left="42%">
								<IconButton
									rounded="full"
									aria-label="Add new Value"
									onClick={() =>
										setNewForm(prevState => [
											...prevState,
											<CustomControlsExample
												key={prevState.length + 1}
											/>,
										])
									}
									icon={<ImPlus />}
								/>
								<IconButton
									rounded="full"
									aria-label="Remove Value"
									variant="outline"
									onClick={() =>
										setNewForm(
											newForm.splice(
												0,
												newForm.length - 1
											)
										)
									}
									icon={<ImCross />}
								/>

								<Button onClick={onClose} colorScheme="teal">
									Save
								</Button>
							</ButtonGroup>
						</FocusLock>
					</Stack>
				</PopoverContent>
			</Popover>
		</>
	);
};
