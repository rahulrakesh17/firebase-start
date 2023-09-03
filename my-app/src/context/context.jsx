import { createContext } from "react";
import { useEffect,useState} from "react";
import {initializeApp } from "firebase/app";
import {
  getFirestore , collection ,getDocs,addDoc,deleteDoc,doc,
} from "firebase/firestore"

const contextApi = createContext();

const ContextProvider =({children})=>{


            const firebaseConfig = {
            apiKey: "AIzaSyAnRbhFXTatvqKNb94YSF-nkT6qDRxdX4k",
            authDomain: "sound-cider-292315.firebaseapp.com",
            projectId: "sound-cider-292315",
            storageBucket: "sound-cider-292315.appspot.com",
            messagingSenderId: "639524762301",
            appId: "1:639524762301:web:96eaf741d71db19c5bbdd4"
            };

            initializeApp(firebaseConfig) //initialize the firebase app

            const db = getFirestore()

            const colRef = collection(db,"books")
            getDocs(colRef)
            .then((snapshot)=>{
                let books =[]
                snapshot.docs.forEach((doc)=>{
                books.push({...doc.data(),id:doc.id})
                })
                console.log(books)
            })
            .catch(err=>{
                console.log(err.message)
            })
            
            function addData(e){
                e.preventDefault()
                let title = document.getElementById("title").value;
                let author = document.getElementById("author").value;
                console.log(title,author)
                addDoc(colRef,{
                    title,
                    author,
                })
                .then(()=>{
                    document.querySelector(".add").reset();
                })
            }

            let itemId;
            function deleteData(e){
                e.preventDefault()

                let name = document.getElementById("itemId").value;
                
                

                

                console.log(getDocs(colRef))
                getDocs(colRef)
                .then((snapshot)=>{
                    console.log("hi")
                    for(let i=0;i<snapshot.docs.length;i++){
                            let objValue={...snapshot.docs[i].data(),id:snapshot.docs[i].id}
                            console.log(objValue)
                            if(objValue.title===name){
                               itemId=objValue.id
                               console.log(itemId)
                            }
                    }
                   
                    
                })

                
                
            }
            
           function deleteBook(){
            deleteData();
            const docRef= doc(db,"books",itemId)
                deleteDoc(docRef)
                .then(()=>{
                    document.querySelector(".delete").reset()
                })
                .catch(err=>{
                    console.log(err)
                })
           }

    return(
        <contextApi.Provider value={{
            addData,
            deleteBook,
            deleteData
        }}>{children}</contextApi.Provider>
    )
    }

export {contextApi,ContextProvider}

