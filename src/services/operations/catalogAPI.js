import apiConnector from "../apiConnector";
import { catalogData } from "../api";
import toast from 'react-hot-toast'
export async function getCatalogPageData(categoryId)
{
    let result = null
    const toastId = toast.loading("Loading...")
      try {

          const response =await apiConnector("POST",catalogData.GET_CATEGORY_PAGE_DETAILS,{categoryId : categoryId},{"Content-Type": "multipart/form-data"})
          console.log("GET CATEGORY PAGE DETAILS API RESPONSE............", response)
          if (!response?.data?.success) {
            throw new Error("Could Not Get Category Page Details")
          }
          toast.success("Category Page Details Fetched Successfully")
          result = response?.data?.data
  
      } catch (error) {
          console.log("CREATE COURSE API ERROR............", error)
      toast.error("No course found for this category")  
      }
      toast.dismiss(toastId)
      return result
}