const app = require("./index")
const express = require("express")

//handle production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public'));
  
    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
  }
  
  const port = process.env.PORT || 5000;
  
  app.listen(port, () => console.log(`Server started on port ${port}`));