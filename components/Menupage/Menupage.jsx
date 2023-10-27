import { useState } from 'react';
import Modal from '../Modal/Modal';
//import ProductList from './ProductList';



export const Menupage = (prop) => {
    //console.log(prop)
   const {clickedcourse,courseData}=prop
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
    //console.log("click; "+Object.values(clickedcourse)[0])
    //console.log(clickedcourse)
    //console.log(typeof(clickedcourse))
    //console.log(courseData["F101"])
    //console.log("data     "+ JSON.stringify(courseData))
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
 
 // const ids=  Object.values(clickedcourse)[0]
 
  //console.log(courses_f)
const courses=Object.values(clickedcourse)
//console.log(courses)

//console.log(courses)



   //const courses = Object.values(clickedcourse);
     //console.log(courses[0])
  const Cart = (clickedcourse) => (
    
    <div className="cart" >
      {
        courses.length === 0
        ? <h2>The cart is empty</h2>
        
        :(courses).map((courseid)=> (
            <div className="class-info" key={courseid}>
              <span>CS {courseData[courseid].number} </span>
              <span>Title: {courseData[courseid].title} </span>
              <span>Meets {courseData[courseid].meets} </span>
            </div>

          ))
      }
    </div>
  );
  
  
  return (
    <div>
      <button className="btn btn-outline-dark" onClick={openModal}><i className="bi bi-cart4"></i></button>
      <Modal open={open} close={closeModal}>
      <Cart clickedcourse={clickedcourse}/>
      </Modal>
     
    </div>
  );
};
//<Cart clickedcourse={clickedcourse}/>