module.exports = function(app, about)
{
    app.get('/submitform', about.newuser);
    app.post('/submitform', about.newusersave);
}