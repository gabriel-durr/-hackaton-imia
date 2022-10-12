import {useEffect, useState} from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Box,
	useDisclosure,
	Text,
	Textarea,
	Button,
} from "@chakra-ui/react";

import dynamic from "next/dynamic";
// Correction error Reference self is not defined ...
const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
});

export const Graph = ({data}) => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const [event, setEvent] = useState(null);

	const [points, setPoints] = useState([]);
	const [limiar, setLimiar] = useState([]);
	const [labels, setLabels] = useState([]);
	const [actualPoint, setActualPoint] = useState(data.dataGraph.length - 1);
	const [canHover, setCanHover] = useState(true);
	const [lastEvent, setLastEvent] = useState(null);

	var graph = [];

	useEffect(() => {
		setPoints([...initPointsGraph(data.dataGraph)]);
		setLimiar([...initLimiarGraph(data.limiarGraph)]);
		setLabels([...data.labels]);
	}, []);

	const createFrameText = frame => {
		var text = [`Data da coleta: ${frame.x[0]}\n`];
		frame.hoverLabels.forEach((label, i) => {
			text.push(
				`${label}: ${frame.hoverValues[label]} - Limiar: ${frame.limiarData[i]}\n`
			);
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
				console.log("element", element);
				if (i === curvedNumber) {
					element.line.color = "red";
					element.marker.opacity = 1;
				} else {
					element.line.color = "transparent";
					element.marker.opacity = 0.6;
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
		<Box>
			<Plot
				divId="myChart"
				data={graph}
				layout={{
					width: 800,
					height: 800,
					uirevision: true,
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
				onDoubleClick={() => console.log("doubleClick")}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Dados do evento</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{event &&
							event.map((e, i) => {
								return <Text key={i}>{e}</Text>;
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
		</Box>
	);
};
