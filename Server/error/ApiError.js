class ApiError extends Error{
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }
    static badrequest(message){
        return new ApiError(404, message)
    }

    static internal(message){
        return new ApiError(500, message)
    }

    static unAutorizade(){
        return new ApiError(401, 'пользователь не аторизован!')
    }
}
 module.exports = ApiError 