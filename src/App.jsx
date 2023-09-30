import { useState } from 'react';
import logo from './logo.svg';
import './App.css';


  
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
          <li key={courseKey}>
          <strong>  {courses[courseKey].term} {courses[courseKey].number}</strong>: {courses[courseKey].title}- {courses[courseKey].meets}
          </li>
        ))}
      </ul>
    </div>
  );
  const App = () => (
    <div className="app">
        <ul>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} /></ul>
    </div>
  );
  
//{courses(schedule.courses)}

export default App;
