import React,{useState,useEffect} from 'react'
import firebaseDb from "../firebase";
import {useParams,Link} from "react-router-dom";
import "./style.css";

const View = () => {
    const [data,setData]= useState({});
    let currentId=useParams();
    const { id } = currentId;
    useEffect(() => {
        firebaseDb.child("contacts").on("value",(snapshot)=>{
            if(snapshot.val() !== null) {
                setData({
                    ...snapshot.val()
                });
            }else {
                snapshot({});
            }
        })
    },[id]);
    return (
        <div  className="container mt-5">
            {Object.keys(data).map((userId) => {
                if(userId === id) {
                    return (
                        <div className="card">
                            <div className="card-header">Trainee's Contact Detail</div>
                            <div className="card-body">
                                <p className="card-text">Name: {data[id].name} </p>
                                <p className="card-text">Mobile: {data[id].mobile} </p>
                                <p className="card-text">Email: {data[id].email} </p>
                                <p className="card-text">Adress: {data[id].address} </p>
                                <p className="card-text">Taken Course: {data[id].course} </p>
                                <Link to="/info">
                                    <a className="btn" id="goback">Go Back</a>
                                </Link>
                            </div>
                        </div>
                    )
                }
            } )}
        </div>
    )
}

export default View
