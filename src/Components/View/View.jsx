import React, { useContext,useEffect, useState } from 'react';
import { collection, getDocs, query ,where} from "firebase/firestore"


import './View.css';
import { PostContext } from '../../store/PostContext';
import { db } from '../../firebase/config';
import { useLocation } from 'react-router-dom';
function View() {
  const location = useLocation()
  const {product} = location.state 
  console.log(product,'product in location');
  // const {postDetails} = useContext(PostContext)
  const [user, setUser] = useState('')
  // console.log(postDetails,'post details in view');
  useEffect(() => {
    const searchDocuments = async () => {
      const q = query(collection(db, 'users'), where('id', '==', product.userId));
   
      try {
        const querySnapshot = await getDocs(q);
        
        const results = querySnapshot.docs.map((doc) => ({
          
          data: doc.data(),
        }));
        console.log("******************")
        console.log(results,'results')
        setUser(results[0].data)
        console.log(user,'user');
      } catch (error) {
        console.error('Error searching documents:', error);
      }
    };

    searchDocuments();

},[]);

  return (
    <div className="viewParentDiv">
        <img className='' style={{width: '600px', margin:'20px'}} 
          src={product.image}
          alt=""
        />
      <div className="rightSection" style={{margin:'50px'}}>
        <div className="productDetails">
          <p>{product.price}</p>
          <span>{product.productName}</span>
          <p>{product.category}</p>
          <span>{product.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user.username}</p>
          <p>{user.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
