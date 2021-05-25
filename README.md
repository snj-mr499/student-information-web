# senior-project-web

## Create Database first 
```
CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `about` varchar(100) DEFAULT NULL,
  `detail_information` text,
  `upload_pic` blob,
  `time_stamp` datetime DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

```
```
CREATE TABLE `sessions` (
  `sid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `session` text COLLATE utf8_unicode_ci NOT NULL,
  `expires` int(11) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

```
```
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `login` varchar(32) DEFAULT NULL,
  `pass` char(32) DEFAULT NULL,
  `role` set('admin','user') DEFAULT NULL,
<<<<<<< HEAD
  `login_date` datetime DEFAULT DEFAULT CURRENT_TIMESTAMP,
=======
  `login_date` datetime DEFAULT NULL,
>>>>>>> dce32463b5018c4f2541c9db617356125cf1458b
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

```
```
INSERT INTO `users` VALUES (1,'admin','admin','21232f297a57a5a743894a0e4a801fc3','admin',NOW()),
                           (2,'snj','snj','827CCB0EEA8A706C4C34A16891F84E7B','user',NOw());

```
```
CREATE TABLE `reg` (
  `reg_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `student_id` int(11) NOT NULL,
  `department` varchar(32) NOT NULL,
  `email` varchar(50) NOT NULL,
  `reg_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reg_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

```
## To run the program
```
node app.js 
or 
npm install nodemon then
npm start
```
## To login 
```
admin: admin (user1)
snj : 12345 (user2)

```
## Current Proplem
```
Cannot update
```
