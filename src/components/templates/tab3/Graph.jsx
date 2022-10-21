import {useEffect, useState, memo} from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
	loading: () => (
		<Spinner
			thickness="4px"
			speed="0.65s"
			emptyColor="gray.200"
			color="blue.500"
			size="xl"
		/>
	),
	ssr: false,
});

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
	Textarea,
	Spinner,
	Button,
	Flex,
} from "@chakra-ui/react";

export const Graph = ({data}) => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const [event, setEvent] = useState(null);
	const [title, setTitle] = useState("teste");

	const [points, setPoints] = useState([]);
	const [pointLine, setPointLine] = useState([]);
	const [limiarLine, setLimiarLine] = useState([]);
	const [canHover, setCanHover] = useState(true);
	const [lastEvent, setLastEvent] = useState(null);

	useEffect(() => {
		setPoints([...data.dataGraph]);
		setPointLine([...data.pointLine]);
		setLimiarLine([...data.limiarLine]);
		setTitle(data.title);
	}, []);

	const createFrameText = frame => {
		var title = [`Data da coleta: ${frame.x[0]}\n`];
		frame.text.forEach(label => {
			title.push(`${label}`);
		});
		return title;
	};

	const onHandleModal = events => {
		if (!isOpen) {
			console.log("on open");
			var modalText = createFrameText(events.points[0].data);
			setEvent(modalText);
			onOpen();
		}
	};

	//show line on hover
	const onHoverGraph = eventData => {
		pointLine[0].x = eventData.x.slice(0, eventData.x.length / 2, 0);
		pointLine[0].y = eventData.y.slice(0, eventData.y.length / 2, 0);
		pointLine[0].z = eventData.z.slice(0, eventData.z.length / 2, 0);
		pointLine[0].text = eventData.text;
		pointLine[0].textfont.size = 30;

		limiarLine[0].x = eventData.x.slice(
			eventData.x.length / 2,
			eventData.x.length,
			0
		);
		limiarLine[0].y = eventData.y.slice(
			eventData.y.length / 2,
			eventData.y.length,
			0
		);
		limiarLine[0].z = eventData.z.slice(
			eventData.z.length / 2,
			eventData.z.length,
			0
		);

		setPointLine([...pointLine]);
		setLimiarLine([...limiarLine]);
	};

	var graph = [...points, ...pointLine, ...limiarLine];

	return (
		<>
			<Plot
				style={{
					width: "60%",
					height: "650px",
				}}
				divId="myChart"
				data={graph}
				layout={{
					uirevision: true,
					autosize: true,
					title: {
						text: title,
						position: "bottom",
						y: "0.78",
						font: {
							size: 30,
						},
					},

					"xaxis.type": "log",

					scene: {
						xaxis: {
							zeroline: false,
							showgrid: false,
							visible: true,
							showticklabels: true,
							showline: false,
							showspikes: false,
							showtickprefix: false,
							color: "#000",
							range: "100",
						},
						yaxis: {
							zeroline: false,
							showgrid: false,
							visible: false,
							showticklabels: false,
							showline: false,
							showspikes: false,
							showtickprefix: false,
						},
						zaxis: {
							zeroline: false,
							showgrid: false,
							visible: false,
							showticklabels: false,
							showline: false,
							showspikes: false,
							showtickprefix: false,
						},
					},
				}}
				onClick={event => {
					console.log("click");
					if (canHover) {
						let timer;
						clearTimeout(timer);
						timer = setTimeout(() => {
							console.log("opa1");
							setCanHover(false);
							setLastEvent(event);
						}, 300);
					} else {
						let timer;
						clearTimeout(timer);
						timer = setTimeout(() => {
							console.log("opa");
							setCanHover(true);
							onHandleModal(lastEvent);
						}, 500);
					}
				}}
				onHover={event => {
					if (event.points[0].data.id === "points" && canHover) {
						onHoverGraph(event.points[0].data);
					}
				}}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				{console.log("dentro do modal")}
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Dados do evento</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{!!event &&
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
		</>
	);
};
