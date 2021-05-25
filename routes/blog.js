
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
  
  exports.postList = (req,res,next) => {
    
        db.q('SELECT * FROM posts ORDER BY time_stamp desc', (err, rows) => {
            if(err){
                res.json(err);
            }
  
            const posts = rows;
            res.render('post-list-user', {
                title: 'Student Information Website',
                pageHeader: {
                    title: 'StudentInfo'
                },
                posts : posts
            });
        })
  }
  exports.postSearch = (req,res,next) => {
    
      db.q('SELECT * FROM posts WHERE time_stamp = ' + req.body.time_stamp, (err, rows) => {
          if(err){
              res.json(err);
          }
  
          const posts = rows;
          res.render('postbydate', {
              title: 'Student Information Website',
              pageHeader: {
                  title: 'StudentInfo'
              },
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
                }
  
                res.render('post-detail', {"post": post});
            }else{
                res.status(404).json({"status_code": 404, "status_message": "Not found"});
            }
        }
    }
    )};
  
  exports.add = (req, res, next) => {
    res.render('newpost-user', {
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
        res.redirect('/');
    })
  }
  