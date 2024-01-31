const Joi =require('joi');
const Blog =require('../models/blogs');
const mongodbIdPattern =/^[0-9a-fA-F]{24}$/;

const blogController={
    async createblog(req, res,next){
        const createBlogSchma =Joi.object({
          title:Joi.string().required(),
          // author:Joi.string().regex(mongodbIdPattern).required(),
          content:Joi.string().required(),
          photoPath:Joi.string().required()
        });
        const {error}=createBlogSchma.validate(req.body);
        if(error){
          return next(error);
        }


const {title,content,photoPath}=req.body;
let newBlog;
let blog;
try{
newBlog=new Blog({
  title,
  author:res.locals.user.id,
  content,
  photoPath
});
blog=await newBlog.save();
}catch(error){
return next(error);
}
return res.status(201).json({blog});
      },

      async getAll (req,res,next){
        try{
          const blog=await Blog.find({});
          const blogs=[];
          for(let i=0;i<blog.length;i++){
            const getone=new Blog(blog[i]);
          blogs.push(getone);
          }
          return res.status(200).json({blogs});
        }catch(error){
return  next(error);
        }
      },

      async getbyId (req,res,next){
        const getByIdSchema =Joi.object({
          id:Joi.string().regex(mongodbIdPattern).required()
         });
  
         const {error}=getByIdSchema.validate(req.params);
           
  
         if(error){
          return next(error);
         }
        
         let blog;
         const {id}=req.params;
         try{
          blog=await Blog.findOne({_id:id}).populate('author');
         }catch(error){
             return next(error);
         }
  
         return res.status(200).json({blog});
      }

    }


module.exports=blogController;