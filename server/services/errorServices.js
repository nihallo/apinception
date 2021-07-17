export const errorObject = (errorCode, errorMessage) => {
    return {success: false, object: {errorCode:errorCode,message:errorMessage}};
}