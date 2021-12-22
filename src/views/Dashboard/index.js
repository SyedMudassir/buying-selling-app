import React, { useEffect, useState } from "react";
import { getAds ,logOut,getCurrentUser} from "../../Config/firebase";
import { useHistory } from 'react-router-dom'
function Dashboard() {
    const history = useHistory()
    const [user, setUser] = useState([])
    const [ads, setAds] = useState([])
    const [searchVal,setSearchVal] = useState('')
    const [searchedAds,setSearchedAds]= useState([])
    useEffect(() => getCurrentUser().then(
        response => { setUser(response) }
    ), [])
    useEffect(() => getAds().then(
        response => { setAds(response) }
    ), [])

const searchAds = (e) =>{
    setSearchVal(e.target.value)
     setSearchedAds (ads.filter(ads=>{
        return ads.title.toLowerCase().includes(searchVal.toLowerCase())
    })) 
}
console.log(user)
    return (
        <div className="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand">Seller.Pk</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
     <li class="nav-item">
        <a class="nav-link">{user.name}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  onClick={logOut}>logout</a>
      </li>
      <li>
      <img src={user.profileImageUrl} class="rounded float-right" alt="Profile Image"/>
      </li>
    </ul>
  </div>
</nav>

            <button className='btn btn-primary my-3' onClick={() => history.push('./PostAdd')}>Post Add</button>
            <form className="form-inline justify-content-center my-5">
                <input class="form-control mr-sm-2" type="search" onChange={e=>searchAds(e)} placeholder="Search" aria-label="Search"/>
            </form>
            <div className='container'>
                <div className="row">
                
                        { 
                        searchVal === '' ?
                            ads.map(ad => {
                                return (
                                    <div className="col-sm-4">
                                    <div className="card my-3" >
                                        {/* {ad.adImagesUrls>0 ?
                                         <img className="card-img-top" src={ad.adImagesUrls[0]} alt="Card image cap" />:
                                         <img className="card-img-top" src='https://designshack.net/wp-content/uploads/placeholder-image.png' alt="Card image cap" />
                                     } */}
                                    <img className="card-img-top" src={ad.images[0]} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{ad.title}</h5>
                                            <p className="card-text">{ad.description}</p>
                                            <a onClick={()=>history.push(`/Dashboard/Details/${ad.id}`)} className="btn btn-primary">View Details</a>
                                        </div>
                                    </div>
                                    </div>
                                )
                            })
                            :
                            searchedAds.map(ad => {
                                return (
                                    <div className="col-sm-4">
                                    <div className="card my-3" >
                                        <img className="card-img-top" src={ad.images} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{ad.title}</h5>
                                            <p className="card-text">{ad.description}</p>
                                            <a onClick={()=>history.push(`/Dashboard/Details/${ad.id}`)} className="btn text-light btn-primary">View Details</a>
                                        </div>
                                    </div>
                                    </div>
                                )
                            })
                        }
                   
                </div>

            </div>
        </div>

    )
}
export default Dashboard