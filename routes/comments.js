const express = require('express');
const myError = require('./error');
const router = express.Router({mergeParams:true});

let commentsFunctionality = {
    getComments(req, res) {
        let id = req.params.postId;
        let post = req.store.posts[id];
       if(post === undefined){
            res.status(404).send(new myError('Post id: '+req.params.postId+' not found').simplify());
            return;
       }
       if(post.comments === undefined)
            post.comments = [];
       
      res.send(post.comments);
    }, 
    addComment(req, res) {
        let id = req.params.postId;
        let post = req.store.posts[id];
        if(post === undefined){
                res.status(404).send(new myError('Post id: '+req.params.postId+' not found').simplify());
                return;
        }
        let newId = post.comments.length;
        post.comments.push(req.body.comment);

      res.send({commentId:newId});
    },
    updateComment(req, res) {
        let postId = req.params.postId;
        let post = req.store.posts[postId];
        if(post === undefined){
                res.status(404).send(new myError('Post id: '+postId+' not found').simplify());
                return;
        }

        let commentId = req.params.commentId;
        if(post.comments[commentId] === undefined){
            res.status(404).send(new myError('Comment id: '+commentId+' not found').simplify());
            return;
        }
        post.comments[commentId] =  req.body.comment;
        res.send({commentId:commentId});
    },
    removeComment(req, res) {
        let postId = req.params.postId;
        let post = req.store.posts[postId];
        if(post === undefined){
            res.status(404).send(new myError('Post id: '+postId+' not found').simplify());
            return;
        }
        let commentId = req.params.commentId;
        if(post.comments[commentId] === undefined || post.comments.length === 0){
            res.status(404).send(new myError('Comment id: '+commentId+' not found').simplify());
            return;
        }
        post.comments.splice(commentId,1);
        res.send({commentId:commentId});
    }  
}

router.get('/',commentsFunctionality.getComments);

router.post('/',commentsFunctionality.addComment);

router.put('/:commentId',commentsFunctionality.updateComment);

router.delete('/:commentId',commentsFunctionality.removeComment);


module.exports = router;
