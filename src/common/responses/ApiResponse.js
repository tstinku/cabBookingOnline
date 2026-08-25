class ApiResponse {

    constructor(
        success = true,
        message = "Success",
        data = null
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(message, data = null) {
        return new ApiResponse(true, message, data);
    }

    static created(message, data = null) {
        return new ApiResponse(true, message, data);
    }

}

export default ApiResponse;