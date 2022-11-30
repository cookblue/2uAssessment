const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { invoiceGet, 
        invoicePut, 
        invoicePost} = require('../controllers/invoice')

const router = Router();

router.get('/', invoiceGet );

router.put('/:id',[
     check('id','ID invalid').isMongoId(),
     check('status','Status invalid').isIn(['pending','approved']),
     validateFields
 ], invoicePut );

router.post('/',[
    check('invoice_number','The invoice number is required').not().isEmpty(),
    check('total','The total is required').not().isEmpty(),
    check('currency','The currency is required').not().isEmpty(),
    check('vendor_name','The vendor name is required').not().isEmpty(),
    check('remittance_address','The remittance address is required').not().isEmpty(),
    validateFields
],invoicePost );


module.exports = router;