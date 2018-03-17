function myError(errorMsg){
    let newErr = new Error(errorMsg);
    this.name = newErr.name;
    this.message = newErr.message;
    this.stack = newErr.stack;
}
myError.prototype.simplify = function(){
    return {
        name:this.name,
        message:this.message,
    };
}

module.exports = myError;