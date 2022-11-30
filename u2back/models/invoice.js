const { Schema, model} = require('mongoose')
const InvoiceSchema = Schema({
    invoice_number:{
        type: String,
        required: [true, 'The invoice number is required'],
        unique:true
    },
    total:{
        type: String,
        required: [true, 'The total is required'],
    },
    currency:{
        type: String,
        required: [true, 'The currency is required'],
    },
    invoice_date:{
        type: String,
    },
    due_date:{
        type: String,
    },
    vendor_name:{
        type: String,
        required: [true, 'The endor name is required'],
    },
    remittance_address:{
        type: String,
        required: [true, 'The remittance address is required'],
    },
    status:{
        type: String,
    }
})

InvoiceSchema.methods.toJSON =function () {
    const { __v, ...invoice} =this.toObject();
    return invoice
}

module.exports = model( 'Invoice', InvoiceSchema);





