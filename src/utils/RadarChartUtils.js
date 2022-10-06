const ty3 = [-1.0, 0, 1.0];
const tz3 = [-0.5, 1.0, -0.5];

export const getLabels = data => {
	var labels = Object.keys(data[0]);
	labels.shift();
	return labels;
};

export const selectTemplate = labels_list => {
	switch (labels_list.length) {
		case 3:
			return {y: ty3, z: tz3};
		default:
			return {y: ty3, z: tz3};
	}
};

export const generateFrames = data => {
	var lenValues = data[0].hoverValues.length;

	for (var i = 0; i < lenValues - 1; i++) {
		var values = [];
		data.forEach(element => {
			values.push(element.hoverValues[i]);
		});
	}
	return data;
};

export const Unpack = (row, labels) => {
	var result = [];
	var keys = [];

	const template = selectTemplate(labels);

	labels.forEach(label => {
		keys = Object.keys(row[0][label].Dados);
	});

	keys.forEach(element => {
		var arrX = [];
		var arrY = [];
		var arrZ = [];
		var lX = [];
		var lY = [];
		var lZ = [];
		var values = {};
		var limiar = [];

		labels.forEach((label, i) => {
			arrX.push(element);
			lX.push(element);
			arrY.push(row[0][label].Dados[element] * (template.y[i] / 1000));
			arrZ.push(row[0][label].Dados[element] * (template.z[i] / 1000));
			lY.push(row[0][label].Limiar * (template.y[i] / 1000));
			lZ.push(row[0][label].Limiar * (template.z[i] / 1000));
			values[label] = row[0][label].Dados[element];
			limiar.push(row[0][label].Limiar);
		});

		arrX.push(arrX[0]);
		arrY.push(arrY[0]);
		arrZ.push(arrZ[0]);

		lX.push(lX[0]);
		lY.push(lY[0]);
		lZ.push(lZ[0]);

		result.push({
			hoverLabels: labels,
			hoverValues: values,
			x: arrX,
			y: arrY,
			z: arrZ,
			limiarX: lX,
			limiarY: lY,
			limiarZ: lZ,
			limiarData: limiar,
			lineColor: "transparent",
			limiarColor: "transparent",
		});
	});

	return result;
};
