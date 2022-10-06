// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const data = require("./data/data.json");
const datax = require("./data/datax.json");
import {Unpack, getLabels} from "../../utils/RadarChartUtils";

export default function handler(req, res) {
	var labels = getLabels(datax);

	const graphData = Unpack(datax, labels);

	res.status(200).json({
		data: data,
		dataObject: Object.keys(data[0]),
		graph: graphData,
	});
}
