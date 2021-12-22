import React, { useState } from 'react'
import { pushAdd ,uploadFiles} from "../../Config/firebase";
import { useHistory } from 'react-router-dom'

function PostAdd() {
const [title,setTitle] = useState()
const [description,setDescription] = useState()
const [price,setPrice] = useState()
const [city,setCity] = useState()
const history = useHistory()
const images = []
const onPostAdd = () =>{
    pushAdd({title,description,price,city,images}).then(
         res => {alert('Ad Posted')
        history.push('./Dashboard')
        }       
    )
}
console.log(images)
return (
        <div className="form">
            <h2>Sell Form</h2>
            <div className="form-group">
                <label htmlFor="exampleInputName">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter Your Product Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputDesc">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputDesc"
                    placeholder="Enter Your Product Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPrice">Price</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputPrice"
                    placeholder="Enter Your Product Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputCity">City</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputCity"
                    placeholder="Enter Your City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputimg">Images</label>
                <input
                    type="file"
                    className="form-control"
                    id="exampleInputimg"
                    multiple
                    onChange={e => {
                        
                        uploadFiles(e.target.files).then(res=>{
                            console.log(res)
                            for(let i=0; i<res.length; i++){
                                images.push(res)
                                console.log(images)
                            }
                    }
                        )}
                        }
                />
            </div>
            <button type="submit" onClick={onPostAdd}  className="btn btn-primary">Post</button>
        </div>
    )
}
export default PostAdd