import {useEffect, useState} from "react";
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
	const [limiar, setLimiar] = useState([]);
	const [labels, setLabels] = useState([]);
	const [actualPoint, setActualPoint] = useState(data.dataGraph.length - 1);
	const [canHover, setCanHover] = useState(true);
	const [lastEvent, setLastEvent] = useState(null);

	useEffect(() => {
		setPoints([...initPointsGraph(data.dataGraph)]);
		setLimiar([...initLimiarGraph(data.limiarGraph)]);
		setLabels([...data.labels]);
		setTitle(data.title);
	}, []);

	const createFrameText = frame => {
		var text = [`Data da coleta: ${frame.x[0]}\n`];
		frame.hoverLabels.forEach((label, i) => {
			text.push(`${label}`);
		});
		return text;
	};

	const onHandleModal = events => {
		if (!isOpen) {
			var modalText = createFrameText(events.points[0].data.frame);
			setEvent(modalText);
			onOpen();
		}
	};

	//init data graph
	const initPointsGraph = data => {
		data[data.length - 1].line.color = "red";
		data[data.length - 1].marker.opacity = 1;
		data[data.length - 1].textfont.color = "black";

		return data;
	};

	const initLimiarGraph = data => {
		data[data.length - 1].line.color = "salmon";
		data[data.length - 1].marker.opacity = 1;

		return data;
	};

	//show line on hover
	const onHoverGraph = (dataGraph, dataLimiar, curvedNumber) => {
		if (actualPoint !== curvedNumber) {
			dataGraph.forEach((element, i) => {
				if (i === curvedNumber) {
					element.line.color = "red";
					element.marker.opacity = 1;
					element.textfont.color = "black";
				} else {
					element.line.color = "transparent";
					element.marker.opacity = 0.6;
					element.textfont.color = "transparent";
				}
			});
			dataLimiar.forEach((element, i) => {
				if (i === curvedNumber) {
					element.line.color = "darkorange";
					element.marker.opacity = 1;
				} else {
					element.line.color = "transparent";
					element.marker.opacity = 0.6;
				}
			});

			setActualPoint(curvedNumber);
		}

		setPoints([...dataGraph]);
		setLimiar([...dataLimiar]);
	};

	var graph = [...points, ...limiar, ...labels];

	return (
		<>
			<Plot
				divId="myChart"
				data={graph}
				style={{
					marginTop: "-15rem",
				}}
				layout={{
					width: 800,
					height: 900,
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
					if (canHover) {
						let timer;
						clearTimeout(timer);
						timer = setTimeout(() => {
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
						setTimeout(() => {
							onHoverGraph(
								points,
								limiar,
								event.points[0].curveNumber
							);
						}, 50);
					}
				}}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Dados do evento</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{event &&
							event.map((e, i) => {
								if (i === 0) {
									return (
										<Flex
											key={i}
											direction="row"
											justify="center"
											align="center">
											<Text fontWeight="bold">{e}</Text>
										</Flex>
									);
								}
								return (
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
