"use strict";
var AirtableError = /** @class */ (function () {
    function AirtableError(error, message, statusCode) {
        this.error = error;
        this.message = message;
        this.statusCode = statusCode;
    }
    AirtableError.prototype.toString = function () {
        return [
            this.message,
            '(',
            this.error,
            ')',
            this.statusCode ? "[Http code " + this.statusCode + "]" : '',
        ].join('');
    };
    return AirtableError;
}());
module.exports = AirtableError;
//# sourceMappingURL=airtable_error.js.map