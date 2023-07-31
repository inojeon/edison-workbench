import exportToCSV from "./ExportToCSV.js";




class validate {

  constructor() {
    this._header = '';
    this._body = '';
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

  getRange(caller, value, validator_string) {
    let tokens = validator_string.split(',');
    let values = new Set();

    switch (tokens[0]) {
      case '=':
        for (let i = 1; i < tokens.length; ++i) {
          values.add(parseFloat(tokens[i]));
        }

        if (values.has(value))
          return true;
        break;

      case '<':
        if (value < parseFloat(tokens[1]))
          return true;
        break;

      case '>':
        if (value > parseFloat(tokens[1]))
          return true;
        break;

      case '[':
        if (parseFloat(tokens[1]) <= value && value <= parseFloat(tokens[2]))
          return true;
        break;

      case '(':
        if (parseFloat(tokens[1]) < value && value < parseFloat(tokens[2]))
          return true;
        break;
    }

    return false;
  }

  ExportCSV() {
    let ex = new exportToCSV();
    ex.exportDataToCSVFile(this._header, this._body);
  }
}

// console.log(getRange(null, 2, '=,3,2'));