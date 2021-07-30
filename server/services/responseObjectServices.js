export const responseObject = (isSuccess, code, message, data) => {
    return {success: isSuccess, code, message, data: data};
}