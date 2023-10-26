import {useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useQuery ,QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import {Filter} from '../components/Filter/Filter'
  
const Example = (prop) =>{
  const {courseData, set_coursedata}=prop
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php').then(
        (res) => res.json(),
      ),
  })
  useEffect(() => {
    if (!isLoading && !error && data) {
      set_coursedata(data.courses);
    }
  }, [isLoading, error, data, set_coursedata]);

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  console.log({courseData})
  return (
    <div>
      <h1>{data.title}</h1>
     
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

  const CourseList = ({ courses }) => (

    <div className="course_list">  
     <ul>
     {Object.keys(courses).map(courseKey => (
    <table className="table table-bordered">
      <tbody>
        <tr><th style={{width: '7em'}}>Name</th><td>{courses[courseKey].term} {courses[courseKey].number}</td></tr>
        <tr><th>Title</th><td>{courses[courseKey].title}</td></tr>
        <tr><th>Meet</th><td>{courses[courseKey].meets}</td></tr>
        
      </tbody>
    </table>
    ))}
    </ul>
    </div>
  );
  
  const CourseCard = ({ course }) => (
    <div className="course-card card">
      <div className="card-body">
        <h5 className="card-title">
          {course.term} {course.number}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {course.title}
        </h6>
        <p className="card-text">
          <strong>Meets:</strong> {course.meets}
        </p>
      </div>
    </div>
  );
  
  const CourseList2 = ({ courses }) => (
    <div className="course-list">
      {Object.keys(courses).map(courseKey => (
        <CourseCard key={courseKey} course={courses[courseKey]} />
      ))}
    </div>
  );
  
  //<Banner title={schedule.title} />
  const App = () => {
   const [courserData,set_coursedata]=useState([])
return(
    <QueryClientProvider client={queryClient}>
    <div className="container">
        <ul>
      
      <Example courseData={courserData} set_coursedata={set_coursedata} />
      
      </ul>
      
      <div><CourseList2 courses={courserData} /></div>
    </div>
    </QueryClientProvider>
  );
       }; 
//{courses(schedule.courses)}
//<fetchJson url={"https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"} /><Filter courseData={courserData} set_coursedata={set_coursedata}/>
export default App;
//
