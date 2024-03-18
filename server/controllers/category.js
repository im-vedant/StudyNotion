const category=require('../models/categoryModel')
const course=require('../models/courseModel')
function getRandomInt(length)
{
    return Math.floor(Math.random()*length)
}
async function createCategory(req,res)
{
    try{
        const {name,description}=req.body
        if(!name || !description)
        {
            return res.status(400).json({
                success : false,
                message: "All fields are required"
            })
        }
        const categoryDetails=await category.create({
            name : name ,
            description : description
        })
        console.log(categoryDetails)
        return res.status(200).json({
            success : true,
            message : "category created successfully"
        })
    }
    catch(err)
    {
        return res.json({
            success: false,
            message: err.message,
          })
    }
}

async function showAllCategories(req,res)
{
    try{
        const allCategory=await category.find({},{name : true,description: true})
       
        return res.status(200).json({
            success : true,
            message : "all category are successfully fetched",
            allCategory
        })
    }
    catch(err)
    {
        return res.json({
            success: false,
            message: err.message,
          })
    }
}

async function categoryPageDetails(req,res)
{
    try {
        const {categoryId}=req.body 
        const selectedCategory=await category.findById(categoryId).populate({
            path :"course",
            match : {status : "Published"},
            populate :"ratingAndReviews"
        }).exec()
        if(!selectedCategory)
        return res.status(404).json({
    success : false,
    message : "Data not found"
})
if (selectedCategory.course.length === 0) {
    console.log("No courses found for the selected category.")
    return res.status(404).json({
      success: false,
      message: "No courses found for the selected category.",
    })
  }
  const categoriesExceptSelected=await category.find({
    _id : { $ne : categoryId}
  })

  let differentCategory = await category.findOne(
    categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
      ._id
  )
    .populate({
      path: "course",
      match: { status: "Published" },
    })
    .exec()
    const allCategories = await category.find({})
    .populate({
      path: "course",
      match: { status: "Published" },
      populate: {
        path: "instructor",
    },
    })
    .exec()

  const allCourses = allCategories.flatMap((category) => category.course)
    console.log("All courses",allCourses)
  const mostSellingCourses = allCourses
    .sort((a, b) => b.sold - a.sold).slice(0,10)
   console.log("mostSellingCourses COURSE", mostSellingCourses)
  res.status(200).json({
    success: true,
    data: {
      selectedCategory,
      differentCategory,
      mostSellingCourses,
    },
  })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            error: error.message,
            message :"Internal Error"
          })
    }
    }

async function addCourseToCategory(req,res)
{
    try {
        const {courseId, categoryId}=req.body 
        if(!courseId || !categoryId)
        {
            return res.status(404).json({
                success : false,
                message : "Data not found"
            })
        }
        let categoryDetail=await category.findById(categoryId)
        let courseDetail=await course.findById(courseId)
        if(!categoryDetail)
        {
            return res.status(404).json({
                success : false,
                message : "Category not found"
            })
        }
        if(!courseDetail)
        {
            return res.status(404).json({
                success : false,
                message : "Course not found"
            })
        }
        if(categoryDetail.course.includes(courseId))
        {
            return res.status(404).json({
                success : false,
                message : "Course already exist in the category"
            }) 
        }
        categoryDetail.course.push(courseId)
        await categoryDetail.save()
        return res.status(200).json({
			success: true,
			message: "Course added to category successfully",
		})
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "Internal server error",
            error : error.message
		})
    }
}
module.exports={categoryPageDetails,showAllCategories,createCategory,addCourseToCategory}