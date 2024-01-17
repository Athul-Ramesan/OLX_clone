import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { MyAuth } from '../../store/AuthContext';
import { ref } from 'firebase/storage'
import { storage,db } from '../../firebase/config';
import { uploadBytes ,getDownloadURL} from 'firebase/storage';
import { addDoc,collection } from 'firebase/firestore';
import toast,{Toaster} from 'react-hot-toast';


const Create = () => {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  
  const navigate = useNavigate()
  const { user } = useContext(MyAuth)
  console.log(user,'user in create');
  const notify = () => toast.success("successfully added the product");
  const date = new Date()



  const handleSubmit = () => {

    const newProductname = productName.trim()
    const newCategory = category.trim()
    const newPrice = price.trim()
    
    if(!newProductname || !newCategory || !newPrice){
      return toast.error('Input must not be empty')
    }
    const storageRef = ref(storage, `products/${image.name}`);
    uploadBytes(storageRef, image).then(({ metadata }) => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, "products"), {
          userId: user.uid,
          productName:productName,
          category:category,
          price: price,
          image: url,
          createdAt: date.toDateString()
        })
          .then(() => {
            console.log("product added successfully");
            notify()
            setTimeout(() => {
              
              navigate("/");
            }, 3000);
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    });

    }
      return (
        <Fragment>
          <Header />
          <Toaster/>
          <card>
            <div className="centerDiv">

              <label htmlFor="fname">Name</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="Name"
                onChange={(e) => setProductName(e.target.value)}
              />
              <br />
              <label htmlFor="fname">Category</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              />
              <br />
              <label htmlFor="fname">Price</label>
              <br />
              <input
                className="input"
                type="number"
                id="fname"
                name="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />

              <br />
              <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
              <br />
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              <br />
              <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
            </div>
          </card>
        </Fragment>
      );
    };

    export default Create;
