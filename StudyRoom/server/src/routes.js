  
const UserAuthenController = require('./controllers/UserAuthenController');
const UserControllers = require('./controllers/UserControllers')
const isAuthenController = require('./authen/isAuthenController')
const BlogController = require('./controllers/BlogController')
const CommentController = require('./controllers/CommentController')

module.exports = (app) =>{
     //create user
    app.post('/user',UserControllers.create);
     //edit user
    app.put('/user/:userId',UserControllers.put);
    //delete user
    app.delete('./user/:userId',UserControllers.remove);
    //show user
    app.get('/user/:userId',UserControllers.show);
    //index page user
    app.get('/users',isAuthenController, UserControllers.index);
    
    //login
    app.post('/login',UserAuthenController.login);


    //create blog
    app.post('/blog', BlogController.create);
    //edit blog
    app.put('/blog/:blogId', BlogController.put);
    //delete blog
    app.delete('/blog/:blogId', BlogController.remove);
    //show blog
    app.get('/blog/:blogId', BlogController.show);
    //index page blog
    app.get('/blogs', BlogController.index);

    //create comment
    app.post('/comment', CommentController.create);
    //edit comment
    app.put('/comment/:commentId', CommentController.put);
    //delete comment
    app.delete('/comment/:blogId', CommentController.remove);
    //show comment
    app.get('/comment/:blogId', CommentController.show);
    //index page comment
    app.get('/comments', CommentController.index);
}