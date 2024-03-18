import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { catalogData } from "../services/api";
import apiConnector from "../services/apiConnector";
import { getCatalogPageData } from "../services/operations/catalogAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "../utils/Spinner";
import "swiper/css";
import CourseSlider from "../components/core/CatalogPage/CourseSlider";
import CourseCard from "../components/core/CatalogPage/CourseCard";
const Catalog = () => {
  const { catalogName } = useParams();
  const [categoryId, setCategoryId] = useState("");
  const [data, setData] = useState(null);
  const [active, setActive] = useState(false);
  const [loading ,setLoading]=useState(false)
  async function getCatalog() {
    try {
      setLoading(true)
      const result = await apiConnector("GET", catalogData.CATEGORIES_API);
      result.data.allCategory.map((data) => {
        if (data.name.toLowerCase().replace(" ", "-") === catalogName)
          setCategoryId(data._id);
      });
    } catch (error) {
      console.log("Could not fetch the category list");
    }
    setLoading(false)
  }
  async function fetchData() {
    if (categoryId === "") return <div>No courses found for this category</div>;
    setLoading(true)
    const result = await getCatalogPageData(categoryId);
    if (result)
    setData(result);
  setLoading(false)
  }
  useEffect(() => {
    setData(null)
    getCatalog();
  }, [catalogName]);
  useEffect(() => {
    fetchData();
  }, [categoryId]);
  if(loading)
  return <div className=" h-[500px]  flex justify-center items-center" >
     <Spinner size={80}/>
  </div>
  if(data===null)
  return <div className="text-white text-center h-[500px] translate-y-[180px]  font-bold text-[40px]">No courses found for this category</div>
  return (
    <div className="">
      <section className="bg-richblack-800 p-8">
        <div className="max-w-[1200px] mx-auto ">
          <div className="">
            <p className="text-[14px] leading-[22px] mb-3 text-richblack-300">
              Home / Dashboard /{" "}
              <span className="capitalize text-yellow-50">{catalogName}</span>
            </p>
            <div className="">
              <h2 className="text-richblack-5 font-medium text-[30px] leading-[38px] py-3">
                {data.selectedCategory.name}
              </h2>
              <p className="text-[14px] text-richblack-200 ">
                {data.selectedCategory.description}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-richblack-900 py-[60px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[50px]">
            <h2 className="text-richblack-5 text-[30px] font-semibold leading-[38px] mb-[40px]">
              Courses to get you started
            </h2>
            <div className="border-b border-richblack-600 mb-10 flex flex-row ">
              <button
                className={`py-2 px-3 text-[16px] font-medium ${
                  active
                    ? "text-yellow-100 border-yellow-100 border-b"
                    : "text-richblack-200"
                }`}
                onClick={() => setActive(!active)}
              >
                Most popular
              </button>
              <button
                className={`py-2 px-3 text-[16px] font-medium ${
                  !active
                    ? "text-yellow-100 border-yellow-100 border-b"
                    : "text-richblack-200"
                }`}
                onClick={() => setActive(!active)}
              >
                New
              </button>
            </div>
            <CourseSlider data={data.selectedCategory.course} />
          </div>
          <div className="mb-[90px]">
            <h2 className="text-richblack-5 text-[30px] font-semibold leading-[38px] mb-[40px]">
              Top courses in {data.selectedCategory.name}
            </h2>
            <CourseSlider data={data.differentCategory.course} />
          </div>
          <div>
          <h2 className="text-richblack-5 text-[30px] font-semibold leading-[38px] mb-[40px]">
              Frequently Bought Together
            </h2>
            <div className="grid grid-cols-2 gap-8">
                {
                  data.mostSellingCourses.map((item)=>{
                    return <CourseCard height={400} item={item}/>
                  })
                }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
