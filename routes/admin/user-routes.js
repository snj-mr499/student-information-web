module.exports = function (app, admin) {
    // users list
    app.get('/adm/users/', admin.usersList);
  
    // change user role
    app.get('/adm/setuserrole/:id/:role', admin.setUserRole);
  
  }
  