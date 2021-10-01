import mongoose from 'mongoose';

const apiProcessingStepsSchema = mongoose.Schema({
    apiName: String,
    apiCode: String,
    apiProcessingStepsObject: Object,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var ApiProcessingSteps = mongoose.model('ApiProcessingSteps', apiProcessingStepsSchema);

export default ApiProcessingSteps;