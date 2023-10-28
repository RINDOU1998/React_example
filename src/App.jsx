import {useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useQuery ,QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import {Filter} from '../components/Filter/Filter'
import { Modal } from "../components/Modal/Modal"
import {Menupage} from "../components/Menupage/Menupage"
import Stack from "react-bootstrap/Stack";
import { Check_timeconflict } from './utilities/check_confilct';
import {UserEditor} from "../components/Form/Form"
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useDbData,useAuthState } from './utilities/firebase';
import { AuthButton } from '../components/Authbutton/Authbutton';

const InitializeDB = (prop) =>{
  const {courseData, set_coursedata}=prop
  
  const [dbdata, error] = useDbData('/');
  useEffect(() => {
    if (  !error && dbdata) {
      set_coursedata(dbdata.courses);
    }
  }, [ error, dbdata, set_coursedata]);


  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (dbdata === undefined) return <h1>Loading data...</h1>;
  if (!dbdata) return <h1>No data found</h1>;
  return (
    <div>
      <h1>{dbdata.title}</h1>
     
    </div>
  )
  }

const Main = () => {
    const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

    if (error) return <h1>Error loading user data: {`${error}`}</h1>;
    if (isLoading) return <h1>Loading user data...</h1>;
    if (!data) return <h1>No user data found</h1>;
    return <div><CourseList2 courses={data.courses} /></div>;
  }
  
  const queryClient = new QueryClient();

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};
const Banner = ({ title }) => (
    <div className="Banner">
      <h1>{title}</h1>
    </div>
  );

 

  

   const Product = ({id, product, selected, toggleSelected}) => (
    <div className="product card m-1 p-2" onClick={() => toggleSelected(id)}>
      <img src={product.thumbnail} className="card-img-top" alt={product.title} />
      <div className={`card-body ${selected.includes(id) ? 'selected' : ''}`}>
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">{formatPrice(product.price)}</p>
  
      </div>
    </div>
  );

  //clickedcourse.some(course=>course[0]===cid)
  const CourseCard = ({ cid, course,clickedcourse,handle_clickcourse,courses,user}) => {
    //const conflict=Check_timeconflict(course,clickedcourse,courses)
    // if (conflict){
    //   console.log("there is one")
    //   console.log("they are  "+course.number+ "and ")
    //   console.log(clickedcourse)
    // }
    
    //console.log(conflict)
    //console.log(clickedcourse)
   // console.log(cid)
   // console.log(course.term)
   //console.log(courses)

  //  const [isEditing, setEditing] = useState(false); //set editing
  //   const buttonclick=(event)=>{
      
  //     setEditing(!isEditing)
  //     event.stopPropagation();
  //   }
   return( <div className="course-card card " onClick={() => handle_clickcourse(cid)}>
      <div className={`card-body ${clickedcourse.includes(cid) ? 'selected' : ''}`}>

        <h5 className="card-title">
          {course.term} {course.number}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {course.title}
        </h6>
        <p className="card-text">
          <strong>Term:</strong> {course.term}
        </p>
        <p className="card-text">
          <strong>Meets:</strong> {course.meets}
        </p>
      </div>
      {(user)?
      <Link to={`/edit-form/${cid} && ${course.title} && ${course.meets} && ${course.number} && ${course.term}`}>
            <button className="btn btn-outline-dark" style={{ width: "100px", }}>Edit</button>
        </Link>
        :''
  }
    </div>
  );
  }
  // <button onClick={buttonclick} className="btn btn-primary">
  //           Edit
  //         </button>
  //         <Modal open={isEditing} close={buttonclick} title={"Editing"}>
  //       {"editing"}
  //     </Modal>
  const CourseList2 = ({ courses,selectedTerm,clickedcourse,handle_clickcourse,user}) => {
    const filter_course=Object.entries(courses).filter(
        (course)=> course[1].term===selectedTerm
    );
    
      //console.log(filter_course.map((course)=>course[1].term))
      //onsole.log(filter_course)
      //console.log(selectedTerm)
    //   console.log(Object.entries(courses).map(
    //     (course)=> course.term===selectedTerm
    // ))
    return(
    <div className="course-list">
      {filter_course.map(([key,course]) => (
        <CourseCard key={key} cid={key} course={course} clickedcourse={clickedcourse} handle_clickcourse={handle_clickcourse} courses={courses} user={user}/>
      ))}
    </div>
  );
      }
  
  //<Banner title={schedule.title} />
  const App = () => {
   const [courserData,set_coursedata]=useState([])
   const [selectedTerm, setSelectedTerm] = useState("Fall");
   const [clickedcourse,setclickedcourse]=useState([])
   const [user]=useAuthState()
   console.log(user)
const update_coursedata=(data)=>{
  set_coursedata(data)
}

  const handle_clickcourse =(course) =>{
    
    if(Check_timeconflict(courserData[course],clickedcourse,courserData)){
      console.log("conflict on "+course)
    }
    
    else{
      if (clickedcourse.includes(course)){
        setclickedcourse(clickedcourse.filter((clickcourse)=> clickcourse!=course))//delete the course from clicked
    }
      else{
        setclickedcourse([...clickedcourse,course]) //add course to clicked
      }
    }

  }

   
   //console.log("data     "+ JSON.stringify(courserData))
  //console.log(courserData["F101"])
   //const check=Check_timeconflict(courserData["F101"],clickedcourse,courserData)
  


return(
    <QueryClientProvider client={queryClient}>
<BrowserRouter>
<Routes>
    <Route path="/" element={
    <div className="container">
        <ul>
      

      <InitializeDB courseData={courserData} set_coursedata={update_coursedata} />
      
      </ul>

      <Stack direction="horizontal"
        gap={1}
        className="justify-content-center my-3">
      <AuthButton />
      <Filter selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm}/>
      <Menupage clickedcourse={clickedcourse} courseData={courserData}/>

      
      </Stack>
      <div><CourseList2 courses={courserData} selectedTerm={selectedTerm} clickedcourse={clickedcourse} handle_clickcourse={handle_clickcourse} user={user}/></div>

       

</div>
} />

<Route path="/edit-form/:course" element={
            <UserEditor />
          } />

</Routes>
</BrowserRouter>
    </QueryClientProvider>
  );
       }; 
//{courses(schedule.courses)}
//<fetchJson url={"https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"} /><Filter courseData={courserData} set_coursedata={set_coursedata}/>
export default App;
//

// {Check_timeconflict(courserData["F211"],clickedcourse,courserData) ? (
//   console.log('There is a time conflict.')
// ) : (
//   console.log('no conflict.')
// )}