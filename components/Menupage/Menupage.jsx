import { useState } from 'react';
import Modal from '../Modal/Modal';
//import ProductList from './ProductList';



export const Menupage = (clickedcourse) => {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const courses = Object.values(clickedcourse);
    console.log(courses[0])
  const Cart = (clickedcourse) => (
    
    <div className="cart" >
      {
        courses[0].length === 0
        ? <h2>The cart is empty</h2>
        
        :(courses[0]).map((course)=> (
            <div className="class-info" key={course.number}>
              <span>CS {course.number} </span>
              <span>Title: {course.title} </span>
              <span>Meets {course.meets} </span>
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