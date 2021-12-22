import React from "react";
import { getAdId } from '../../Config/firebase'
import { useHistory, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Details() {
    const { adid } = useParams()
    const [adDetails, setDetails] = useState({})
    const history = useHistory()
    useEffect(() => {
        getAdId(adid).then(
            response => {
                setDetails(response)
            }
        )
    })
    return (
        <div className='container'>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card" >
                        <img className="card-img-top" src={adDetails.adImagesUrls[0]} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{adDetails.title}</h5>
                            <p className="card-text">
                                {adDetails.description}<br />
                                {adDetails.price}<br />
                                {adDetails.city}
                            </p>
                        </div>
                    </div>
                </div>
        </div>
        <button className="btn btn-primary text-center my-5" onClick={()=>history.goBack()}>Go Back</button>
        </div>
    )
}
export default Details