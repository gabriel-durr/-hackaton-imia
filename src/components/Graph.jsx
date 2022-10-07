import {useEffect, useState} from "react";
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Box,
} from "@chakra-ui/react";

import dynamic from "next/dynamic";
// Correction error Reference self is not defined ...
const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
});

export const Graph = ({data}) => {
	const [update, setUpdate] = useState([]);
	const [labels, setLabels] = useState(null);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		setUpdate([...initGraph(data)]);
		setLabels(data[data.length - 1]);
	}, []);

	var graph = [];

	//init data graph
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
			{showAlert && (
				<Alert status="success" position="relative">
					<AlertIcon />
					<AlertTitle>Evento onClick:</AlertTitle>
					<AlertDescription></AlertDescription>
				</Alert>
			)}
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
					console.log("click");
					setShowAlert(true);
					setInterval(() => setShowAlert(false), 3000);
				}}
				onHover={event => {
					if (event.points[0].data.id === "points") {
						console.log("event ==> ", event);
						setTimeout(() => {
							onHoverGraph(update, event.points[0].curveNumber);
						}, 50);
					}
				}}
			/>
		</Box>
	);
};
