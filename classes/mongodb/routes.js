const Router = require('express');
const sample = require('./models/userdetails.js')
var router = Router();


router.post('/create', async (req, res) => {
    try {
        const data = req.body;
        const result = await sample.create(data);
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json();
    }
})
router.get('/read/:id', async (req, res) => {
    // router.get('/read',async(req,res)=>{


    const id = req.params.id;
    console.log(id);
    const details = await sample.findOne({ userid: id });
    //    const details = await sample.find({});
    console.log("details", details);

    res.json(details);

})

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await sample.updateOne({ userid: id }, data);
        res.json({ message: 'Updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await sample.deleteOne({ userid: id });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
})


module.exports = router;