module.exports=function(router,passport){
router.use(function(req,res,next){
  if (req.isAuthenticated())
      return next();

     res.redirect('/auth/login');
});
    router.get('/profile/settings',function(req,res){
        res.render('settings.ejs',{user:req.user});
    });

    router.post('/profile/settings',function(req,res){
        console.log(req.body.qualificationInfo);
        if(req.body.qualificationInfo && req.body.boardUniv && req.body.course && req.body.schoolCollegeName && req.body.completion && req.body.academicState && req.body.marks_cgpa)
          {var user=req.user;
           var obj= {
                qualification:req.body.qualificationInfo,
                board_univ:req.body.boardUniv,
                course:req.body.course,
                school_college:req.body.schoolCollegeName,
                state:req.body.academicState,
                percentage_cgpa:req.body.marks_cgpa,
                completion:req.body.completion
            };
              user.data.pInfo.education.educationQualification.push(obj);

            user.save(function(err,user) {
                if (err)
                    return err;
                else {
                    return user;
                }
            });
        }
        res.redirect('/profile/settings');
    });

router.get('/profile',  function(req, res) {
    res.render('profile.ejs', {
        user : req.user
    });
});

router.post('/profile',  function(req, res) {
if(req.body.title && req.body.description && req.body.content )
   {var user=req.user;
    var myBlog={
        title:req.body.title,
        description:req.body.description,
        content:req.body.content
      };
user.data.blogs.push(myBlog);

  user.save(function(err,user) {
      if (err)
          return err;
      else {
        return user;
      }

  });}
else if(req.body.name  && req.body.gender && req.body.DOB && req.body.state && req.body.contactNo && req.body.guardianName && req.body.guardianContactNo)
{var user=req.user;
      console.log(req.body);
      user.data.info={
          name:req.body.name,
          gender:req.body.gender,
          email:user.google.email || user.facebook.email || user.local.email,
          DOB:req.body.DOB,
          state:req.body.state,
          contact:req.body.contactNo ,
          guardian:req.body.guardianName,
          guardianContact:req.body.guardiancontactNo
          }

      user.save(function(err,user) {
          if (err)
              return err;
          else {
              return user;
          }
      });
  }
  if(req.body.field && req.body.experience  && req.body.description || (req.body.project1 || req.body.project2 || req.body.project3))
  {
      var user=req.user;
      console.log(user);
      var projectArray=new Array();
      if(req.body.project1){projectArray.push(req.body.project1);}
      if(req.body.project2){projectArray.push(req.body.project2);}
      if(req.body.project3){projectArray.push(req.body.project3);}
      var obj={
          field :req.body.field,
          experience:req.body.experience,
          projects:projectArray,
          description:req.body.description

      }
      console.log(user.data.pInfo.skills);
      user.data.pInfo.education.skills.push(obj);
      user.save(function(err,user) {
          if (err)
              return err;
          else {
              return user;
          }
      });
      console.log(req.body);
console.log(user);
  }
  res.redirect('/profile');

});




router.get('/connect/local',function(req,res){res.render('connect-local.ejs')});








router.get('/*',function(req,res){
  res.redirect('/profile');
})
}
