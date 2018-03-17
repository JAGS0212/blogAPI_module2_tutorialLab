//Imports
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');

const port = 3000;
const host = 'localhost';

//Instantiations
const app = express();

let store = {
    posts: [
      {name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
         'Cruel…..var { house, mouse} = No type optimization at all',
         'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
         '(p1,p2)=>{ … } ,i understand this ,thank you !'      
      ]
      }
    ]
  }

//Middleware
app.use(bodyParser.json());
app.use(logger('dev'));
app.use((req,res,next)=>{
    req.store = store; //DB reference into request object
    next();
})

//Routes
app.use('/posts',routes.postsRouter);
app.use('/posts/:postId/comments',routes.commentsRouter);

//ErrorHandlers
app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).end();
});

//Server Bootup
app.listen(3000,host,()=>{
    console.log('Server started @ ' + host + ':' + port);
});