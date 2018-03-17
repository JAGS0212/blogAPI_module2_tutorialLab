const express = require('express');
const router = express.Router({mergeParams:true});

let commentsFunctionality = {
    getComments(req, res) {
    
    }, 
    addComment(req, res) {
      
    },
    updateComment(req, res) {
      
    },
    removeComment(req, res) {
      
    }  
}

router.get('/',(req,res)=>{
    console.log(req.params);
    res.send('Hello from comments');
})

router.get('/commentId',(req,res)=>{
    console.log(req.params);
    res.send('Hello from comments/commendId');
})

module.exports = router;
