class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  send(res) {
    res.status(this.statusCode).json({
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
      success: this.success,
    });
  }
}

export { ApiResponse };
