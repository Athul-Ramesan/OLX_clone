import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyAuth } from '../store/AuthContext'

const AddProduct = () => {
    const [productName, setProductName] = useState('')
    const [category, setCategory] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState('')

    const navigate = useNavigate()
    const {user} = useContext(MyAuth)
    
    const handleSubmit = ()=>{

    }
  return (
    <>
            <div className="container mx-auto pt-20">
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Add Product
                    </button>
                </form>
            </div>
        </>
  )
}

export default AddProduct
