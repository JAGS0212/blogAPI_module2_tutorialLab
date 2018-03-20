const express = require('express');
const myError = require('./error.js');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const router = express.Router();

let inputValidators = {
    postValidator : [
        check('name','Invalid name')
            .exists().withMessage('You have to specify a post\'s name.')
            .not().isEmpty().withMessage('The name of the post cannot be empty.'),
        check('url')
            .exists().withMessage('You have to specify a url for the new post.')
            .isURL().withMessage('The provided url has an invalid format.')
            .not().isEmpty().withMessage('The post\'s url cannot be empty'),
        check('text','You have to specify a descriptive text for the new post.')
            .exists()
            .not().isEmpty().withMessage('The descriptive text for the new post cannot be empty')
    ],
    idValidator:[
        check('idPost')
        .exists().withMessage('You have to supply a post id.')
        .not().isEmpty().withMessage('The post id cannot be empty.')
        .isInt().withMessage('The post id has to be an integer.')
        .custom((value,{req,location,path})=>{
            let id = parseInt(value);
            if(id === NaN)
                return false;

            if(req.store.posts.length <= id)
                return false;
            
            return true;
        }).withMessage('The post id does not exists in db.')
    ]
}

let inputSanitizers = {
    postSanitizer:[
        sanitize(['name','url','text']).escape().trim(),
    ],
    idSanitazer:[
        sanitize('idPost').trim().toInt()
    ]
}


let postsFunctionality = {
    getPosts(req, res) {
        res.send(req.store.posts);
    },
    addPost(req, res) {
        const result = validationResult(req);
        if(!result.isEmpty()){
            res.status(400).json({errors:result.mapped()});
            return;
        }
        let newId = req.store.posts.length;
        req.store.posts.push(req.body);
        res.send({postId:newId});
    },
    updatePost(req, res) {
        const result = validationResult(req);
        if(!result.isEmpty()){
            res.status(400).json({errors:result.mapped()});
            return;
        }
        req.store.posts[req.params.idPost] = req.body;
        res.send({postId:req.params.idPost});
    },
    removePost(req, res) {
        const result = validationResult(req);
        if(!result.isEmpty()){
            res.status(400).json({errors:result.mapped()});
            return;
        }
        req.store.posts.splice(req.params.idPost,1);
        res.send({postId:req.params.idPost});
    }
}

router.get('/',
    postsFunctionality.getPosts);
router.post('/',
    inputValidators.postValidator,
    inputSanitizers.postSanitizer,
    postsFunctionality.addPost);
router.put('/:idPost',
[
    inputValidators.postValidator,
    inputValidators.idValidator,
    inputSanitizers.postSanitizer,
    inputSanitizers.idSanitazer
],
postsFunctionality.updatePost);
router.delete('/:idPost',
    inputValidators.idValidator,
    inputSanitizers.idSanitazer,
    postsFunctionality.removePost);

module.exports = router;
