exports.about = (req, res, next) => {
    res.render('aboutweb', {
        title: 'About Student Web',
        content: 'This website is created for international students in Payap University. The website is used to post and read activites, seminars, and information related with University. In order for students to post on website, students need to register and get the login information from email. Students can sign up from the "Sign Up" menu.'
    }
    );
  }