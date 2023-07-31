

export default class exportToCSV {

    constructor() {
    }

    exportDataToCSVFile(header, body) {

        var csv = ''
        if(header && header.length > 0) {
            csv = header.split(' ').join(',');
            csv += '\n';
        }

        if(body && body.length > 0) {
            csv += body.split(' ').join(',');
            csv += '\n';
        }
        

        // Data URI
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.download = 'temp.csv';
        a.target = '_blank';
        a.href = csvData;

        a.click();
    }
}