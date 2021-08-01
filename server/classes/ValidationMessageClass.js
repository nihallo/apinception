export default class ValidationMessageClass {

    constructor(validationStepName, errorType, errorMessage) {
      this.validationStepName = validationStepName;
      this.errorType = errorType;
      this.errorMessage = errorMessage;
    }
    getJosn(){
      return {validationStepName: this.validationStepName, errorType: this.errorType, errorMessage: this.errorMessage}
    }

  }

  //var myClass = new MyClass()
  //console.log(JSON.stringify(myClass));