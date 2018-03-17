const express = require('express');
const myError = require('./error.js');
const router = express.Router();

let postsFunctionality = {
    getPosts(req, res) {
        res.send(req.store.posts);
    },
    addPost(req, res) {
        let newId = req.store.posts.length;
        req.store.posts.push(req.body);
        res.send({postId:newId});
    },
    updatePost(req, res) {
        if(req.store.posts[req.params.idPost] === undefined){
            res.status(404).send(new myError('Post id: '+req.params.idPost+' not found').simplify());
            return;
        }
        req.store.posts[req.params.idPost] = req.body;
        res.send({postId:req.params.idPost});
    },
    removePost(req, res) {
        if(req.store.posts[req.params.idPost] === undefined){
            res.status(404).send(new myError('Post id: '+req.params.idPost+' not found').simplify());
            return;
        }
        req.store.posts.splice(req.params.idPost,1);
        res.send({postId:req.params.idPost});
    }
}

router.get('/',postsFunctionality.getPosts);
router.post('/',postsFunctionality.addPost);
router.put('/:idPost',postsFunctionality.updatePost);
router.delete('/:idPost',postsFunctionality.removePost);

module.exports = router;
