
function validateForm(form) {
  
    var title = form.title || "";
    var about = form.about || "";
    var detail_information = form.detail_information || "";
    var upload_pic = form.upload_pic || "";
    var time_stamp = form.time_stamp || "";
    
    title = title.trim();
    about = about.trim();
    detail_information = detail_information.trim();
    upload_pic = upload_pic.trim();
    time_stamp = time_stamp.trim();
    
    if (!title) {
      return 'title is required.';
    }
  
    if (!detail_information) {
      return 'Information is required.';
    }
  
    
    return null;
  }
  exports.access = function (req, res, next) {
    if (req.userInfo.role != 'admin') {
        res.redirect('/');
        return;
    }
    next();
  }
  
  exports.postList = (req,res,next) => {
    
        db.q('SELECT * FROM posts ORDER BY time_stamp desc', (err, rows) => {
            if(err){
                res.json(err);
            }
  
            const posts = rows;
            res.render('post-list', {
                title: 'Student Information Website',
                pageHeader: {
                    title: 'StudentInfo'
                },
                //sidebar: "Information",
                posts : posts
            });
        })
  }
  
  exports.detail = (req, res, next) => {
    db.q('SELECT * FROM posts WHERE post_id = ' + req.params.id, function(err, rows, fields) {
        var post;
        if (err) {
            res.status(500).json({"status_code": 500, "status_message": "internal server error"});
  
        }else{
            if(rows.length==1){
                var post = {
                    'title': rows[0].title,
                    'about': rows[0].about,
                    'detail_information': rows[0].detail_information,
                    'upload_pic': rows[0].upload_pic,
                    'time_stamp' : rows[0].time_stamp,
                }
  
                res.render('post-detail', {"post": post});
            }else{
                res.status(404).json({"status_code": 404, "status_message": "Not found"});
                return;
            }
        }
    }
    )};
  
  exports.add = (req, res, next) => {
      post_id = check.numeric(req.params.post_id);
    res.render('newpost', {
        title: 'Post new information',
        pageHeader: {ti: 'Insert new post'}
    }
    );
  }
  
  exports.save = (req, res, next) => {
    var err = validateForm(req.body);
    if(err){
        return res.redirect('back');
    }
    
    var title = req.body.title;
    var about = req.body.about;
    var detail_information = req.body.detail_information;
    var upload_pic = req.body.upload_pic;
    var time_stamp = req.body.time_stamp;
  
    db.q('INSERT INTO posts(title, about, detail_information, upload_pic, time_stamp) VALUES (?,?,?,?,NOW())', 
    [title, about, detail_information, upload_pic, time_stamp], function(err, rows) {
        if (err) throw(err);
  
        req.flash('Success');
        res.redirect('/adm/postlist'); 
  
    })
  }
  
  exports.postupdate = (req,res,next) => {
    
    db.q('SELECT * FROM posts', (err, rows) => {
        if(err){
            res.json(err);
            return;
        }
  
        const posts = rows;
        res.render('edit', {
            title: 'Student Information Website',
            pageHeader: {
                title: 'StudentInfo'
            },
            posts : posts
        });
    })
  }
  
  exports.edit = (req, res, next) => {
    db.q('SELECT * FROM posts WHERE post_id = ' + req.params.id, function(err, rows, fields) {
        var post;
        if (err) {
            res.status(500).json({"status_code": 500, "status_message": "internal server error"});
  
        }else{
            if(rows.length==1){
                var post = {
                    'title': rows[0].title,
                    'about': rows[0].about,
                    'detail_information': rows[0].detail_information,
                    'upload_pic': rows[0].upload_pic,
                    
                }
  
                res.render('updatepost', {"post": post});
                next();
            }else{
                res.status(404).json({"status_code": 404, "status_message": "Not found"});
                return;
            }
        }
    }
    )}
  
    exports.update = (req, res, next) => {
      //var err = validateForm(req.body);
      //if (err) {
          //req.flash('danger', err);
          //res.redirect('/');
     // }
      const post_id = req.body.post_id;
      const title = req.body.title;
      const about = req.body.about;
      const detail_information = req.body.detail_information;
      
  
         db.q('UPDATE posts SET title= ?, about= ?, detail_information= ? WHERE post_id = ?', [title, about, detail_information, post_id] , function (err, result){
          //conn.query ("UPDATE posts SET title= 'Students' WHERE post_id = 13 ",  function (err, result){
             // if (err) throw err;
             if(err){
              res.json(err);
              return;
          }
    
                  req.flash('success', 'Data updated sucessfully');
                  res.send('Post updated in ID with: ' + req.params.post_id);
                  res.redirect('/');
                  
              
          });
      }
  
  exports.delete = (req, res, next) => {
        db.q('DELETE FROM posts WHERE post_id = ' +  req.params.id, function(err,rows) {
            if (err) {
                req.flash('danger', err);
                
              }
              req.flash('success', 'Updated successfully.');
              
              res.redirect('/adm/lists');
        }) 
  }
  