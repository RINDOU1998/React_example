export const Check_timeconflict=(course,clickedcourse,courseData)=>{
   
    const result=false
    //const c= JSON.parse(course)
    //console.log("course"+JSON.stringify(course))
    //console.log(course.meets)
    //console.log("input course"+(course["meets"]))
    console.log("input clickcourse"+(clickedcourse))
    //console.log("coursedata"+JSON.stringify(courseData))
    const courses=Object.values(clickedcourse)
    //console.log("input clickcourse11111111111"+(clickedcourse[0]))
    for (var i=0; i<clickedcourse.length;i++) {
        const click=clickedcourse[i]
        if(skip(click,course,courseData)){
            console.log("there is a skip")
            continue
            
        }
        console.log("index is "+click)
        //console.log("clicked: "+courseData[click].meets)
        //console.log(typeof(course.meets))
        //console.log(course.meets.split(' '))
        //console.log("course is "+course.meets)
        const course_time=parse_to_Time(course.meets)
        const click_time=parse_to_Time(courseData[click].meets)
        console.log("course time info"+course.number+ JSON.stringify(course_time))
        console.log("click course time info "+courseData[click].number+JSON.stringify(click_time))
        if(has_time_conflict(click_time,course_time)){
            return true
        }
        
    }


    return result
}

const skip = (click, course,courseData) =>(
    courseData[click] === course ||
    courseData[click].meets === '' ||
    course.meets === '' ||
    courseData[click].term !== course.term
);

const parse_to_Time=(meets)=>{
   // console.log("pt input is ?"+meets)
   const[days,hour]=meets.split(' ')
   const day=days.match(/[A-Z][a-z]*/g)
   const[hour_start,hour_end]=hour.split("-")
   const[hour_start_h,hour_start_m]=hour_start.split(':')
   const start_time=+hour_start_h*60+ (+hour_start_m)
   const[hour_end_h,hour_end_m]=hour_end.split(':')
   const end_time=+hour_end_h*60+ (+hour_end_m)
   //console.log("s time: "+day)
   return{
    day: day,
    start_time:start_time,
    end_time:end_time
   }

}

const has_time_conflict=(click_time,course_time)=>{
    return(
        course_time.day.some((day)=>click_time.day.includes(day))&&
        click_time.start_time<=course_time.end_time&&click_time.end_time>=course_time.start_time
    )
}
