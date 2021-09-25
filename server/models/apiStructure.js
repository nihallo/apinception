import mongoose from 'mongoose';

const apiStructureSchema = mongoose.Schema({
    apiName: String,
    apiCode: String,
    apiSanitization: Object,
    apiValidation: Object,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var ApiStructure = mongoose.model('ApiStructure', apiStructureSchema);

export default ApiStructure;