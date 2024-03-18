import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Logo1 from "../../../assets/TimeLineLogo/Logo1";
import Logo2 from "../../../assets/TimeLineLogo/Logo2";
import Logo3 from "../../../assets/TimeLineLogo/Logo3";
import Logo4 from "../../../assets/TimeLineLogo/Logo4";
import Typography from "@mui/material/Typography";
import  { timelineItemClasses } from '@mui/lab/TimelineItem';
const obj = [
  {
    title: "Leadership",
    description: "Fully committed to the success company",
    img: <Logo1/>,
  },
  {
    title: "Responsibility",
    description: "Students will always be our top priority",
    img: <Logo2/>,
  },
  {
    title: "Flexibility",
    description: "The ability to switch is an important skills",
    img: <Logo3/>,
  },
  {
    title: "Solve the problem",
    description: "Code your way to a solution",
    img: <Logo4/>,
  },
];

function HomeTimeline() {
  return (
    <Timeline position="right"       sx={{
      [`& .${timelineItemClasses.root}:before`]: {
        flex: 0,
        padding: 0,
      },
      padding : '12px'
    }}
>
   {
    obj.map((data,index)=>{
        return <TimelineItem key={index}>
        <TimelineSeparator>
          <TimelineDot sx={{bgcolor : "white"}}>
            <div className="p-2">
            {
              data.img
            }
            </div>
          </TimelineDot>
          <TimelineConnector style={(index===obj.length-1) ?{display :'none',  } : {height : "35px"}} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            <p className="text-richblack-800 text-[18px] font-semibold">{data.title}</p>
          </Typography>
          <Typography><p className="text-richblack-700 text-[14px] ">{data.description}</p></Typography>
        </TimelineContent>
      </TimelineItem>
    })
   }
   </Timeline>
  )
}

export default HomeTimeline
