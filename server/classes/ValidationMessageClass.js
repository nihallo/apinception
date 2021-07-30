export default class ValidationMessageClass {

    constructor(validationStepName, errorType, errorMessage) {
      this.validationStepName = validationStepName;
      this.errorType = errorType;
      this.errorMessage = errorMessage;
    }
  }

  //var myClass = new MyClass()
  //console.log(JSON.stringify(myClass));