// read .env
require('dotenv').config()

let express = require('express')
    , app = express()
    , path = require('path')
    , flash = require('connect-flash')
    , expressValidator = require('express-validator')
    , colors = require('colors')
    , compress = require('compression')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    ;

    dbPool = require('./libs/db')
  , check = require('./libs/check')
  , app_env = process.env.APP_ENV || 'development';

dbPool.getConn(function(dbConn) {
  app.set('port', process.env.APP_PORT);

  // main global db connect
  db = dbConn;

  // pug custom functions
  require('./libs/helpers')(app);
    
  // gzip all
  app.use(compress());

  // error handler
  app.use(require('errorhandler')({ dumpExceptions: true, showStack: true }));

  // etc settings
  app.set('port', process.env.APP_PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');
  app.use(morgan('short')); 
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use(methodOverride('_method', {methods: ['POST', 'GET']}));
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

  // init session
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // sessions mysql store
  var MysqlStore = require('connect-mysql')({session: session});
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MysqlStore({
      config: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        table: 'sessions'
      }
    })
  }));

  // flash messages
  app.use(flash());

  // static
  app.use(express.static(path.join(__dirname, 'public')));

  // passport init & conf 
  require('./config/pass-conf')(app);
  require('./config/pass-local-conf')(app);

  // global config here
  appConfig = {};
 

  // auth module
  require('./routes/auth-routes')(app, require('./routes/auth'));

  // blog module
  require('./routes/blog-routes')(app, require('./routes/blog'));

   //register router
   require('./routes/about-routes')(app, require('./routes/about'));

  // admin BASE module (main routing check)
  require('./routes/admin/admin-routes')(app, require('./routes/admin/admin'));

   // admin users module
  require('./routes/admin/user-routes')(app, require('./routes/admin/user'));

  // about page
  require('./routes/aboutweb-routes')(app, require('./routes/aboutweb'));

  // start server here
  app.listen(app.get('port'));
  console.log("simple node web listening on port " + app.get('port') + " --");
});