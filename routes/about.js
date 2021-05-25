function validateForm(form) {
  
    var name = form.name || "";
    var student_id = form.student_id || "";
    var department = form.department || "";
    var email = form.email || "";

    name = name.trim();
    student_id = student_id.trim();
    department = department.trim();
    email = email.trim();
    
    if (!name) {
      return 'title is required.';
    }
  
    if (!student_id) {
      return 'Student ID is required.';
    }

    if (!department) {
        return 'Department is required.';
      }
  
    if (!email) {
        return 'Email is required.';
      }
    return null;
  }
 

  exports.newuser = (req, res, next) => {
    reg_id = check.numeric(req.params.reg_id);
    res.render('about', {
        title: 'Registar',
        pageHeader: {ti: 'Register For Sign In'}
    }
    );
  }

  
exports.newusersave = (req, res, next) => {
    var err = validateForm(req.body);
    if(err){
        return res.redirect('back');
    }
    
    var name = req.body.name;
    var student_id = req.body.student_id;
    var department = req.body.department;
    var email = req.body.email;
   
  
    db.q('INSERT INTO reg(name, student_id, department, email) VALUES (?,?,?,?)', 
    [name, student_id, department, email], function(err, rows) {
        if (err) throw(err);
  
        req.flash('Success');
        res.redirect('/'); 
  
    })
  }
  