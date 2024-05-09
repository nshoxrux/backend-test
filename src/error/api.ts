export class ApiError {
    message: string
    status: number
    constructor(message: string, status: number) {
        this.message = message
        this.status = status
    }

    static badRequest(message: string) {
        return new ApiError(message, 400)
    }
    static notFound(message: string) {
        return new ApiError(message, 404)
    }
    static internal(message: string) {
        return new ApiError(message, 500)
    }
}