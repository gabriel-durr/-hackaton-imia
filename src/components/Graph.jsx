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
	const [update, setUpdate] = useState([]);
	const [labels, setLabels] = useState(null);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const [event, setEvent] = useState(null);

	useEffect(() => {
		setUpdate([...initGraph(data)]);
		setLabels(data[data.length - 1]);
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

	var graph = [];

	//init data graph.
	const initGraph = data => {
		data.forEach((d, i) => {
			if (i === data.length - 1) {
				data[i].lineColor = "red";
				data[i].limiarColor = "orange";
			}
		});
		return data;
	};

	//show line on hover
	const onHoverGraph = (data, curvedNumber) => {
		data.forEach((d, i) => {
			if (i === curvedNumber) {
				data[curvedNumber].lineColor = "red";
				data[curvedNumber].limiarColor = "orange";
			} else if (i !== curvedNumber) {
				data[i].lineColor = "transparent";
				data[i].limiarColor = "transparent";
			}
		});

		setUpdate([...data]);
	};

	//create hover data template
	const createHoverLabels = (hoverLabels, hoverValues, limiar) => {
		var text = "<br>";
		hoverLabels.forEach((label, i) => {
			text =
				text +
				`${label}: ${hoverValues[label]} Limiar: ${limiar[i]}<br>`;
		});
		return text;
	};

	//create graph of converted pointers
	update.forEach((element, i) => {
		graph.push({
			id: "points",
			frame: element,
			x: element.x,
			y: element.y,
			z: element.z,
			type: "scatter3d",
			mode: "markers+lines",
			text: element.hoverLabels,
			marker: {
				color: "blue",
				opacity: 0.7,
			},
			line: {
				color: element.lineColor,
				width: 7,
			},
			showlegend: false,
			hovertemplate: `<b>Data da coleta: %{x}</b>
			${createHoverLabels(
				element.hoverLabels,
				element.hoverValues,
				element.limiarData
			)}`,
			hoverlabel: {
				bgcolor: "#FFF",
			},
		});
	});

	//create limiar graph
	update.forEach(element => {
		graph.push({
			id: "limiar",
			frame: element,

			x: element.limiarX,
			y: element.limiarY,
			z: element.limiarZ,
			type: "scatter3d",
			mode: "markers+lines",
			marker: {
				color: "orange",
				opacity: 0.7,
			},
			line: {
				color: element.limiarColor,
				width: 7,
			},
			hovertemplate: `<b>Data da coleta: %{x}</b>
			${createHoverLabels(
				element.hoverLabels,
				element.hoverValues,
				element.limiarData
			)}`,
			hoverlabel: {
				bgcolor: "#FFF",
			},
			showlegend: false,
		});
	});

	//Creating labels
	labels &&
		graph.push({
			id: "Label",
			frame: labels,
			x: labels.limiarX,
			y: labels.limiarY,
			z: labels.limiarZ,
			type: "scatter3d",
			mode: "text",
			text: {
				font_size: 50,
				font_family: "Rockwell",
			},
			text: [...labels.hoverLabels],
			showlegend: false,
			hovertemplate: `<b>Data da coleta: %{x}</b>
			${createHoverLabels(
				labels.hoverLabels,
				labels.hoverValues,
				labels.limiarData
			)}`,
			hoverlabel: {
				bgcolor: "#FFF",
			},
		});

	return (
		<Box>
			<Plot
				divId="myChart"
				data={graph}
				layout={{
					width: 800,
					height: 800,
					title: "3d graph",
					uirevision: true,
				}}
				onClick={event => {
					onHandleModal(event);
				}}
				onHover={event => {
					if (event.points[0].data.id === "points") {
						setTimeout(() => {
							onHoverGraph(update, event.points[0].curveNumber);
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
