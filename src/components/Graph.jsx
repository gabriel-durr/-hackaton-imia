import {Box} from "@chakra-ui/react";

import dynamic from "next/dynamic";
// Correction error Reference self is not defined ...
const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
});

export const Graph = ({data1, data2, data3}) => {
	return (
		<Box>
			<Plot
				data={[
					{
						x: data1.x,
						y: data1.y,
						z: data1.z,
						type: "scatter3d",
						mode: "markers",
						marker: {
							color: "#dc1e1e0",
							opacity: "0.2",
							"&:hover": {color: "red"},
						},
						hoverinfo: "ola mundo",
						hovertext: "olamundo",
					},
					{
						x: data2.x,
						y: data2.y,
						z: data2.z,
						type: "scatter3d",
						mode: "markers",
						marker: {
							color: "#dc1e1e0",
							opacity: "0.2",
							"&:hover": {color: "red"},
						},
						hoverinfo: "ola mundo",
						hovertext: "olamundo",
					},
					{
						x: data3.x,
						y: data3.y,
						z: data3.z,
						type: "scatter3d",
						mode: "markers",
						marker: {
							color: "#dc1e1e0",
							opacity: "0.2",
							"&:hover": {color: "red"},
						},
						hoverinfo: "ola mundo",
						hovertext: "olamundo",
					},
				]}
				layout={{width: 600, height: 600, title: "3d graph"}}
			/>
		</Box>
	);
};
