import { PerformanceConstant } from '../Temp/performanceConst.js';
import  exportToCSV  from './ExportToCSV.js';

export class performance {

	constructor(mode) {
		this._mode = mode;
		this._caller = null;
		this._header = '';
		this._body = '';

		new PerformanceConstant();
		
	}

	setMode(mode) {
		this._mode = mode;
	}

	setHeader(header) {
		this._header = header;
	}

	setBody(body) {
		this._body = body;
	}

	appendBody(body) {
		this._body += body;
	}

	Start(caller) {
		this._start = new Date();
		this._caller = caller;
	}

	End() {
		this._end = new Date();

		if(this._mode === PerformanceConstant.Log['None']) {

		}
		else if(this._mode === PerformanceConstant.Log['Minimum']) {
			this._body += this._caller + " ";
			this._body += this._end - this._start + "\n";
		}
		else if(this._mode === PerformanceConstant.Log['Maximum']) {

			this._body += this._caller + " ";
			this._body += this._start.getTime() + " ";
			this._body += this._end.getTime() + " ";
			this._body += this._end - this._start + "\n";
		}
	}

	ExportCSV() {
		let ex = new exportToCSV();
		ex.exportDataToCSVFile(this._header, this._body);
	}

}
/*
function Test() {
	for(let i=0; i<3000; ++i) 
		console.log("hello");
}
*/

// let a = new Performance();
// a.Start(Test);
// a.End();