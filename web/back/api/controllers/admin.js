const User = require('./../models/user');
const Survey = require('./../models/survey');
const Result = require('./../models/result');

module.exports.getAllUsers = (req, res, next) => {
    // use find() method to return all users
    User.find((err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
    })
};

module.exports.getUserID = (req, res, next) => {
    let id = req.params._id;
    // use findOne() method to return user by id
    User.findOne({id:id}, (err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
    })
};

module.exports.removeUser = (req, res, next) => {
    // remove user 
    let id = req.params._id
    User.remove({id:id}, (err, result) => {
        if(err) { console.log(err) }
        else { res.json(result) }
    })
};

module.exports.displaySurvey = (req, res, next) => {
   
    let id = req.params.id;

    console.log(id)

    // Survey findOne() method to return user by id
    Survey.findById({_id:id}, (err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
    })
};

module.exports.displaySurveyList = (req, res, next) => {
     console.log('survey list')
       // Survey list find() method to return all list
       Survey.find((err, result) => {
        if(err) { console.log(err) }
        else { res.json(result) }
        });
}

module.exports.createSurvey = (req, res, next) => {

    let newSurvey = new Survey({
        name: req.body.name,
        questionnaires: req.body.questionnaires,
    });

    console.log('post data', newSurvey)
    newSurvey.save(function(err) {
        //console.log(err)
    });
};

module.exports.answerSurvey = (req, res, next) => {

    let answerSurvey = new Result({
        survey: req.body.survey,
        question: req.body.question,
        choices: req.body.choices
    });

    console.log('post data', answerSurvey)
    answerSurvey.save(function(err) {
       // console.log(err)
    });
};


module.exports.getResultats = (req, res, next) => {

      // Result find() method to return all users
      Result.find((err, result) => {
        if(err) { console.log(err) }
        else { res.json(result) }
        });
    
};

module.exports.getResultatByID = () => {
    let id = req.params._id;

    // Result findOne() method to return result by id
    Result.findOne({id:id}, (err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
    })
}


module.exports.my_surveys=function(req,res){
    Survey
        .find({user: req.user._id})
        .sort('-created_at')
        .exec().then((surveys)=>{
            res.render('survey_list',{user:req.user,list:surveys});
        })
};
module.exports.create_survey=(req,res)=>{
    res.render('create_survey',{user:req.user});
};
module.exports.show_survey=(req,res)=>{
    Survey
        .findOne({user: req.user._id,_id: req.params.id})
        .exec().then((servey)=>{
            res.render('show_survey',{user:req.user,servey:servey});
        }).catch((err)=>{
            res.render('500',{err:err});
        })
};
module.exports.embed_survey=(req,res)=>{
    Survey
        .findById(req.params.id)
        .exec().then((servey)=>{
            res.render('embed_survey',{servey:servey});
        }).catch((err)=>{
            res.render('500',{err:err});
        });
};
module.exports.show_question=(req,res)=> {

    let id = req.params._id;

    // Survey findOne() method to return survey by id
    Survey.findOne({id:id}, (err, result) => {
    // var question=servey.questionnaires.id(req.params.question_id);
    if(err) { console.log(err) }
    else { res.json(result) }
    })

    
    Survey
        .findOne({user: req.user._id,_id: req.params.id})
        .exec().then((servey)=>{
            
            //res.send(util.inspect(question));
            if(question)
                res.render('show_question',{user:req.user,servey_name:servey.name,question:question});
            else
                res.render('500',{err:'question does not exist'});
        })
};
module.exports.show_question_results=(req,res)=>{
    var data={};
    Survey
        .findOne({user: req.user._id,_id: req.params.id})
        .exec().then((servey)=>{
            data.question=servey.questionnaires.id(req.params.question_id);
            if(data.question==null) res.send("No question");
            return Result
                    .mapReduce({
                        map:function(){for(var i=0;i<this.choices.length;i++) emit(this.choices[i],1)},
                        reduce:function(key,values){return values.length},
                        query:{survey:req.params.id,question:req.params.question_id}
                    });
        }).then((result)=>{
            var choices={};
            data.question.choices.forEach((item)=>{
                choices[item._id]={count:0,text:item.text};
            });
            var stat={max:0};
            result.results.forEach((item)=>{
                choices[item._id].count=item.value;
                if(stat.max<item.value) stat.max=item.value;
            });
            res.render('show_result',{user:req.user,question:data.question.question,choices:choices,max:stat.max});
        }).catch((err)=>{
            res.render('500',{err:err});
        })
};

