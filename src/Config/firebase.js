import firebase from 'firebase/app'
import 'firebase/auth' 
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyB6yw8j4dMKdMFL8RTM6qwa6Q6hwyL9APo",
    authDomain: "olx-app-18970.firebaseapp.com",
    projectId: "olx-app-18970",
    storageBucket: "olx-app-18970.appspot.com",
    messagingSenderId: "1001149615557",
    appId: "1:1001149615557:web:5ef16e71c72bfe852e8fac",
    measurementId: "G-TTYJ6YMX0F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()
  function signUp  (email,password) {
    return auth.createUserWithEmailAndPassword(email,password)
  }

  function signIn (email,password) {
    return auth.signInWithEmailAndPassword(email,password)
  }
  function pushUserData (user) {
    return db.collection('users').add(user)
  }
  function pushAdd (ad) {
    return db.collection('ads').add(ad)
  }
  function getAds (){
    return new Promise((resolve)=>{
      db.collection('ads').get().then(snapshot=>{
        const ads = []
        snapshot.forEach(doc=>{
          ads.push({...doc.data(),id:doc.id})
        })
        resolve(ads)
      })
    })
  }
  function getAllUsersData () {
    return new Promise ((resolve) =>{
       db.collection('users').get().then(snapshot=>{
         const users = [] 
         snapshot.forEach(doc =>{
           users.push({...doc.data(),id:doc.id})
         })
         resolve(users)
       })
    })
  }
  function getAdId (adid){
    return new Promise ((resolve)=>
    db.collection('ads').doc(adid).get().then(doc=>{
      resolve(doc.data())
     })
    )
  }
  function logOut (){
    return auth.signOut()
  }
  function uploadFiles(files) {
    const promises = []
    for(let i=0; i<files.length; i++){
      const promise = new Promise ((resolve,reject)=>{
        const file = files[i]
        const ref =  storage.ref(`/adsimages/${file.name}`)
        ref.put(file).then(() =>{
          ref.getDownloadURL().then(url=>{
            resolve(url)
          })
        }).catch(
          e=> alert(reject(e.message))
        )
      }) 
      promises.push(promise)
    }
    return Promise.all(promises)
  }

 function getCurrentUser() {
   return new Promise ((resolve,reject)=>{
     auth.onAuthStateChanged(user=>{
       resolve(user)
     })
   })
 }

  export {
    signUp,
    signIn,
    logOut,
    pushUserData,
    pushAdd,
    getAllUsersData,
    getAds,
    getAdId,
    uploadFiles,
    getCurrentUser,
    auth
  }
