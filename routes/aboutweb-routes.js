module.exports = function(app, aboutweb)
{
    app.get('/web', aboutweb.about);
    
}