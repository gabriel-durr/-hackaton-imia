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

import {Spinner, useDisclosure} from "@chakra-ui/react";
import {MemoizedModal} from "./ModalGraph";

export const Graph = ({data, title}) => {
	const [graph, setGraph] = useState(null);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const [event, setEvent] = useState(null);
	const [graphTitle, setGraphTitle] = useState("");

	const [points, setPoints] = useState([]);
	const [pointLine, setPointLine] = useState([]);
	const [limiarLine, setLimiarLine] = useState([]);
	const [canHover, setCanHover] = useState(true);
	const [lastEvent, setLastEvent] = useState(null);

	useEffect(() => {
		setPoints([...data.dataGraph]);
		setPointLine([...data.pointLine]);
		setLimiarLine([...data.limiarLine]);
		setGraphTitle(title);
		setGraph([...data.dataGraph, ...data.pointLine, ...data.limiarLine]);
	}, [data, title]);

	const createFrameText = frame => {
		var title = [`Data da coleta: ${frame.x[0]}\n`];
		frame.text.forEach(label => {
			title.push(`${label}`);
		});
		return title;
	};

	const onHandleModal = events => {
		if (!isOpen && !canHover) {
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
		// pointLine[0].textfont.size = 20;

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

	const closeModal = () => {
		onClose();
		setCanHover(true);
	};

	return (
		<>
			<Plot
				style={{
					height: "100%",
					width: "100%",
				}}
				divId="myChart"
				data={graph}
				layout={{
					uirevision: true,
					autosize: true,
					title: {
						text: graphTitle,
						position: "bottom",
						y: "0.9",
						font: {
							size: 30,
							weight: "bold",
						},
					},

					"xaxis.type": "date",

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

			<MemoizedModal
				event={event}
				isOpen={isOpen}
				onClose={() => closeModal()}
			/>
		</>
	);
};
