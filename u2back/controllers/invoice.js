
const  {format, addMonths}  = require('date-fns')
const { request, response } = require('express');

const Invoice = require('../models/invoice')

const invoiceGet = async(req = request, res = response) => {
    const { status } = req.query;
    let invoces
    if (status) {
        invoices =  (await Invoice.find({status})).reverse();
    } else {
        invoices =  (await Invoice.find()).reverse();
    }

    res.json({
        invoices
     })
};
const invoicePut = async (req=request, res=response) => {
    const {id} = req.params;
    const { status } = req.body;

    const invoice = await Invoice.findByIdAndUpdate(id, { status }, { returnOriginal: false  });
    
    res.json({
        message:'invoice updated successfully',
        invoice
    });
};

const invoicePost = async (req=request, res=response) => {
    const body = req.body;
    const date = new Date();
    const invoice = new Invoice({
        ...body, 
        invoice_date: format(date, 'yyyy-MM-dd'),
        due_date:format(addMonths(date,1), 'yyyy-MM-dd'),
        status:'pending'
    });

   
    const invoiceExists = await Invoice.exists({ invoice_number: body.invoice_number })

    if (invoiceExists) {
        return res.json({ error: 'invoice number already exists' })
    }

    await invoice.save()

    res.json({
        message: 'invoice submitted successfully',
     });
};


module.exports = {
    invoiceGet,
    invoicePut,
    invoicePost,
    
}