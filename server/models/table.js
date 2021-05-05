import mongoose from 'mongoose';

const tableSchema = mongoose.Schema({
    tableName: String,
    tableDesc: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    columns :[
        {
        columnName: String,
        columnType: String,
        }]
})

var Table = mongoose.model('Table', tableSchema);

export default Table;