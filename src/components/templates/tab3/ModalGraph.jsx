import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text,
	Button,
	Textarea,
	Flex,
} from "@chakra-ui/react";

const ModalGraph = ({event, isOpen, onClose}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			{console.log("dentro do modal")}
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Dados do evento</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{event &&
						event.map((e, i) => {
							return i === 0 ? (
								<Flex
									key={i}
									direction="row"
									justify="center"
									align="center">
									<Text fontWeight="bold">{e}</Text>
								</Flex>
							) : (
								<Flex
									key={i}
									display="flex"
									flexDirection="row"
									justifyContent="space-between"
									align="center">
									<Text>{e}</Text>
									<Button
										colorScheme="blue"
										marginTop={5}
										mr={3}
										onClick={onClose}>
										Abrir Coleção
									</Button>
								</Flex>
							);
						})}
					<Text marginTop="10px" fontWeight="bold">
						Observações:
					</Text>
					<Textarea
						size="sm"
						placeholder="Coloque aqui suas observações ..."
					/>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Send
					</Button>
					<Button colorScheme="red" mr={3} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export const MemoizedModal = React.memo(ModalGraph)
