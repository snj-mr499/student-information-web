module.exports = function(app, blog)
{
    app.get('/', blog.postList);
    app.get('/user/postsearch/', blog.postSearch);
    app.get('/post/:id', blog.detail);
    app.get('/post', blog.add);
    app.post('/post', blog.save);
}