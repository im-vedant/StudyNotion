import React, { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubSection from "./SubSection";
const VideoSideBar = ({
  sectionIndex,
  subSectionId,
  setSubSectionIndex,
  setSectionIndex,
  data,
  completedVideos,
  setIsOpen
}) => {
  const { user } = useSelector((store) => store.profile);
  let totalLecture = 0;
  for (let x in data.courseContent) {
    totalLecture += data.courseContent[x].subSection.length;
  }
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  }
  const navigate = useNavigate();
  useEffect(()=>{
    setExpanded(sectionIndex)
  },[sectionIndex])
  return (
    <div className="bg-richblack-800 w-[20%] ">
      <div className="flex flex-row my-5 mx-3 items-center justify-between">
        <button
          onClick={() => {
            navigate("/dashboard/enrolled-courses");
          }}
          className="w-7 h-7 rounded-full bg-richblack-300 hover:scale-105 transition-all ease-in flex items-center justify-center text-richblack-900"
        >
          <IoChevronBackOutline  size={20}/>
        </button>
        <button onClick={()=>setIsOpen(true)} className=" px-6 py-3 text-richblack-900 text-[16px] font-medium rounded-lg bg-yellow-50">
          Add Review
        </button>
      </div>
      <div className="px-3">
        <div className="border-b border-richblack-500 pb-2">
          <p className="text-richblack-5 text-[24px] font-semibold">
            My Course
          </p>
          <p className="text-richblack-400 font-medium">
            {completedVideos.length} / {totalLecture}
          </p>
        </div>
        <div className="mt-3">
          {data.courseContent.map((section, sectionIndex) => {
            return (
              <Accordion
                key={sectionIndex}
                expanded={expanded === sectionIndex}
                onChange={handleChange(sectionIndex)}
              >
                <AccordionSummary
                  sx={{
                    bgcolor: "#424854",
                    fontSize: "16px",
                    color: "#F1F2FF",
                    borderBottom: "1px",
                    borderColor: "#424854",
                    fontWeight: 500,
                  }}
                  expandIcon={<ExpandMoreIcon htmlColor={"#999DAA"} />}
                >
                  <p className="font-semibold text-richblack-5">{section.sectionName}</p>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: "#161D29", padding: "8px" }}>
                  {section.subSection.map((subSection, subSectionIndex) => {
                    function handleClick() {
                      setSectionIndex(sectionIndex);
                      setSubSectionIndex(subSectionIndex);
                    }
                    let selected = subSectionId === subSection._id;
                    return (
                      <SubSection
                        key={subSectionIndex}
                        selected={selected}
                        completedVideos={completedVideos}
                        handleClick={handleClick}
                        subSection={subSection}
                      />
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoSideBar;
