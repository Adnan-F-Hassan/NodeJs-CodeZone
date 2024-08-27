class AppError extends Error {
    constructor(){
        super();
    }

    create(message, statusCode, statusText) {
        this.message = message;
        this.statusCode = statusCode;
        this.statusText = statusText;
        return this;
    }
}

// instead of exporting the class // export an object // instance of the class
// to use it like this : appError.create() 
module.exports = new AppError();

