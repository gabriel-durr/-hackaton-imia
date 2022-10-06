import {useEffect, useState} from "react";
import {Box} from "@chakra-ui/react";

import dynamic from "next/dynamic";
// Correction error Reference self is not defined ...
const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
});

export const Graph = ({data}) => {
	const [update, setUpdate] = useState([]);

	useEffect(() => {
		setUpdate([...data]);
	}, []);

	var graph = [];

	//show line on hover
	const onHoverGraph = (data, curvedNumber) => {
		data.forEach((d, i) => {
			if (i === curvedNumber) {
				data[curvedNumber].lineColor = "red";
			} else if (i !== curvedNumber) {
				data[i].lineColor = "transparent";
			}
		});

		setUpdate([...data]);
	};
	//hide line on hover
	const onUnhoverGraph = (data, pointNumber) => {
		data[pointNumber].lineColor = "transparent";

		setUpdate([...data]);
	};

	//create graph of converted pointers
	update.forEach((element, i) => {
		console.log(element);
		graph.push({
			id: "points",
			x: element.x,
			y: element.y,
			z: element.z,
			type: "scatter3d",
			mode: "markers+lines",
			//title: element.label,
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
			<br>
			${element.hoverLabels.map((label, i) => {
				return `${label}: ${element.hoverValues[label]}<br>`;
			})}
			Limiar: ${element.limiar}`,
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
			mode: "markers",
			marker: {
				color: "orange",
				opacity: 0.7,
			},
			showlegend: false,
		});
	});

	// update &&
	// 	graph.push({
	// 		x: update[0].limiarX,
	// 		y: update[0].limiarY,
	// 		z: update[0].limiarZ,
	// 		type: "scatter3d",
	// 		mode: "lines+text",
	// 		line: {
	// 			color: "red",
	// 			width: 7,
	// 		},
	// 		text: {
	// 			font_size: 50,
	// 			font_family: "Rockwell",
	// 		},
	// 		text: [...update[0].hoverLabels],
	// 		showlegend: false,
	// 		hoverlabel: {
	// 			display: "none",
	// 		},
	// 	});

	return (
		<Box>
			<Plot
				divId="myChart"
				data={graph}
				layout={{width: 800, height: 800, title: "3d graph"}}
				onClick={event => {
					// console.log(event);
				}}
				onHover={event => {
					if (event.points[0].data.id === "points") {
						console.log("event ==> ", event);
						setTimeout(() => {
							onHoverGraph(update, event.points[0].curveNumber);
						}, 50);
					}
				}}
				// onUnhover={event => {
				// 	if (event.points[0].data.id === "points") {
				// 		console.log("unhover => ", event.points[0]);
				// 		setTimeout(() => {
				// 			console.log("entrei2");
				// 			onUnhoverGraph(update, event.points[0].curveNumber);
				// 		}, 50);
				// 	}
				// }}
			/>
		</Box>
	);
};
