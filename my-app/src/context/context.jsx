import { createContext } from "react";
import { useEffect,useState} from "react";
import {initializeApp } from "firebase/app";
import {
  getFirestore , collection ,getDocs,addDoc,deleteDoc,doc,setDoc
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
            
            const [books,setBooks]=useState([])
            getDocs(colRef)
            .then((snapshot)=>{
                snapshot.docs.forEach((doc)=>{
                books.push({...doc.data(),id:doc.id})
                })
            })
            .catch(err=>{
                console.log(err.message)
            })
            useEffect(()=>{
                console.log(books)
            },[books])
            
            
            async function addData(e){
                e.preventDefault();
                
                let newTitle = document.querySelector("#title").value
                let newAuthor = document.querySelector("#author").value
                
                const payload = {
                    title:newTitle,
                    author:newAuthor
                }
                await addDoc(colRef,payload)
                .then(()=>{
                    document.querySelector(".add").reset()
                })
                console.log("hi")
            }


            async function deleteData(e){
                e.preventDefault();
                let bookId
                let deleteBook =document.querySelector("#itemId").value;
                books.map(element => {
                    if(element.title===deleteBook){
                        bookId=element.id
                    }
                });
                const docRef=doc(db,"books",bookId)
                await deleteDoc(docRef)
                .then(()=>{
                    document.querySelector(".delete").reset();
                    console.log("deleted")
                })
            }

    return(
        <contextApi.Provider value={{
            addData,
            colRef,
            db,
            deleteData,
        }}>{children}</contextApi.Provider>
    )
    }

export {contextApi,ContextProvider}

