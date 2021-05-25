
exports.usersList = function (req, res, next) {
    db.q("SELECT * \
      FROM users \
      ORDER BY `user_id`",
      function (err, qres) {
        res.render('userslist', {
          title: 'users list',
          users: qres
        });
      });
  };
  
  exports.setUserRole = function (req, res, next) {
  
    // all roles list hardcoded
    var availRoles = ['user', 'admin'];
  
    // params for change role
    var userId = check.numeric(req.params.user_id, 0);
    var userRole = (availRoles.indexOf(req.params.role) >= 0) ? req.params.role : null;
  
    // check current user role
    if (userRole !== null) {
      if (req.userInfo.role == 'admin') {
        db.q("UPDATE users \
          SET role=? \
          WHERE user_id=?",
        [
          userRole,
          userId
        ], function (err, qres) {
            if (err) return next(err);
  
            res.json({
              result: true,
              role: userRole,
              userId: userId});
          });
      } else {
        res.json({ result: false});
      }
    } else {
      res.json({ result: false});
    }
  };
  
  