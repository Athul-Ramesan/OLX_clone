import React, { useContext, useEffect, useState } from 'react';
import { collection,getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import { db } from '../../firebase/config';
import { MyAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';

function Posts() {

useEffect(()=>{
  getDataFromDb()
},[])

const {user} = useContext(MyAuth)
const [products,setProducts]= useState([])
const [loading, setLoading] = useState(true)
const navigate = useNavigate()
const {setPostDetails} = useContext(PostContext)

const getDataFromDb = () => {
  getDocs(collection(db, "products")).then((snapshot) => {
    const newProducts = snapshot.docs.map((snap) => ({
      productId: snap.id,
      ...snap.data(),
    }));
    setProducts(newProducts);
    setLoading(false);
    console.log(newProducts, 'products');
  });
};

const handleView = (product)=>{
  setPostDetails(product)
  navigate('/view',{state:{product:product}})
}
  return (
    <div className="postParentDiv ">
      {loading ? (<div>
        loading
      </div>) :
      (<>
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(item=>{
            return (

              <div key={item.productId} onClick={()=>handleView(item)}
              className="card"
              >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={item.image} alt="" />
            </div>
            <div className="content">
              <p className="rate">{item.price}</p>
              <span className="kilometer">{item.category}</span>
              <p className="name"> {item.productName}</p>
            </div>
              <span>{item.createdAt}</span>
          </div>
                )
              })}
      
        </div>
      </div>
      <div className='container mx-auto'>
      <div className="recommendations  flex flex-wrap -mx-4">
        <div className="heading m-7">
          <span>Fresh recommendations</span>
        </div>
        <div className=" cards w-full  grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
        {products.map(item=>{
            return (
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
            <img src={item.image} alt="" />
            </div>
            <div className="content">
              <p className="rate">{item.price}</p>
              <span className="kilometer">{item.category}</span>
              <p className="name">{item.productName}</p>
            </div>
              <span>10/5/2021</span>
          </div>
           )
          })}
        </div>
      </div> 
      </div>

      </>)
      }
    </div>
  );
}

export default Posts;
