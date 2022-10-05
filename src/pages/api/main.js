// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const data = require('./data/data.json');
const datax = require('./data/datax.json');
import { Unpack } from "../../utils/RadarChartUtils";

export default function handler(req, res) {

  const data1 = Unpack(datax,0)
  const data2 = Unpack(datax,1)
  const data3 = Unpack(datax,2)


  res.status(200).json({ 
    data: data,
    dataObject: Object.keys(data[0]),
    data1: data1,
    data2: data2,
    data3: data3
  })
}
