const mongoose=require('mongoose');

const joi=require('joi');

const ClassSchema=new mongoose.Schema({
    ClassName:{
        type:String,
        required:true
    },
    ClassStatus:{
        type:String,
        required:true,
        default:"Active",
        enum:["Active","Pending","Blocked"]
    },
    ClassDate:{
        type:Date,
        required:false,
        default:new Date
    }
})


const ClassModel=mongoose.model('class',ClassSchema);



const ClassValidation=(CV)=>{
    let classvalidation=joi.object({
        ClassName:joi.string().required(),
        ClassStatus:joi.string().required(),
    })

    return classvalidation.validate(CV)
}


module.exports={
    ClassValidation,
    ClassModel
}