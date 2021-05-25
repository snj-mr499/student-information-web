module.exports = function (app, admin) {
  
    // check access
    app.all('/adm/*', admin.access);
    // posts list
    app.get('/adm/postlist', admin.postList);
    app.get('/adm/postlist/:id', admin.detail);
    
    //insert post
    app.get('/adm/posts', admin.add);
    
  
    app.post('/adm/posts', admin.save);
    
    // edit
    app.get('/adm/lists', admin.postupdate);
    
    // delete update
    app.delete('/adm/lists/:id', admin.delete);
    app.get('/adm/lists/:post_id', admin.edit);
    app.put('/adm/lists/:id', admin.update);
  }
  