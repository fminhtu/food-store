

class SitesController{

    //get//new
    home(req,res, next){
        res.render('home');
        // Course.find({}, function (err, courses) {
        //     // docs.forEach
        //     if(!err) {
        //         res.json(courses);
        //     }else{
        //         next(err);
        //     }
            
        // });

        
    }

    //get//course
    

    //get//new
    in(req,res){
        res.render('sign-in');
    }

    //get//new
    up(req,res){
        res.render('sign-up');
    }

    
}
module.exports = new SitesController;