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
                e.preventDefault();
                console.log(123)
                let title = document.querySelector("#title").value
                let author = document.querySelector("#author").value
                console.log(title,author)
                addDoc(colRef,{
                    title,
                    author
                })
                document.querySelector(".add").reset()
            }

    return(
        <contextApi.Provider value={{
            addData,
            
        }}>{children}</contextApi.Provider>
    )
    }

export {contextApi,ContextProvider}

