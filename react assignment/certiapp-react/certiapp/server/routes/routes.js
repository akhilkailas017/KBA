const express = require("express");
const router = express.Router();
const certificates = require("../models/certificates");




router.get("/certificates/:id", async (req, res) => {
  const certificateid = req.params.id;
  const details = await certificates.findOne({ certificateid: certificateid });
  res.json(details);
});

router.post("/certificates", async (req, res) => {
  try {

   
      const data = req.body;
      const result = await certificates.create(data);
      res.status(201).json("Added successfull");
  

  } catch (error) {
    console.log(error);
    res.status(500).json("error while adding data");
  }
});



module.exports = router;
