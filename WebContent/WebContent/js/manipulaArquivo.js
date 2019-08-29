var leitorDeCSV = new FileReader();
var leitorDeCSV2 = new FileReader();

var totalArquivoTipo1 = 0;
var totalArquivoTipo2 = 0;

window.onload = function init() {
	leitorDeCSV.onload = (evt) => lerQualquerCsv(evt, 'CSVsaida');
	leitorDeCSV2.onload = (evt) => lerQualquerCsv(evt, 'CSVsaida2');

}

function pegaCSV(inputFile, divSaida) {
	var file = inputFile.files[0];
	if (divSaida === 'CSVsaida') {
		leitorDeCSV.readAsText(file);
	} else {
		leitorDeCSV2.readAsText(file);
	}

}

function pegaCSV2(inputFile) {
	var file = inputFile.files[0];
	leitorDeCSV2.readAsText(file);
}

function lerQualquerCsv(evt, idDiv) {
	var fileArr = evt.target.result.split('\n');
	var strDiv = '<table>';
	let count = 0;
	const indexSaldo = obterIndexColunaSaldo(fileArr[0].split(';'));

	for ( var i = 1; i < fileArr.length; i++) {
		strDiv += '<tr>';
		var fileLine = fileArr[i].split(';');
		count += +fileLine[indexSaldo] ? +fileLine[indexSaldo] : 0;
		for ( var j = 0; j < fileLine.length; j++) {
			strDiv += '<td>' + fileLine[j].trim() + '</td>';
		}
		strDiv += '</tr>';
	}
	// Imprime total 2
	strDiv += '<tr>';
	strDiv += '<td>Total</td>';
	strDiv += '<td>' + count + '</td>';
	strDiv += '</tr>';

	strDiv += '</table>';

	var CSVsaida = document.getElementById(idDiv);
	CSVsaida.innerHTML = strDiv;
}

function obterIndexColunaSaldo(listaColunas = []) {
	return listaColunas.findIndex(coluna => coluna === 'saldo');
}
