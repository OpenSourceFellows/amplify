declare class AirtableError {
    error: string;
    message: string;
    statusCode: number;
    constructor(error: string, message: string, statusCode: number);
    toString(): string;
}
export = AirtableError;
