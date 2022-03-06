import "./style.css";
import React, { useState, useEffect } from 'react'
import firebaseDb from "../firebase";
import {useHistory, useParams} from "react-router-dom";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

const Add = () => {
    const values = {
        name: "",
        mobile: "",
        email: "",
        address: "",
        course: ""
    };

    const [data,setData]= useState({});
    const [initialState, setState] = useState(values);
    const { name, mobile, email, address, course } = initialState;

    const history= useHistory();

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

    useEffect(()=> {
        if(isEmpty(id)) {
            setState({...values});
        } else {
            setState({...data[id]});
        }
    }, [id,data]);

    const handleInputchange = (e) => {
        let {name,value}= e.target;
        setState({
            ...initialState, [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEmpty(id)){
            firebaseDb.child("contacts").push(initialState,(err)=>{
                if(err){
                    console.log(err);
                }
            });
        } else {
            firebaseDb.child(`/contacts/${id}`).set(initialState,(err)=>{
                if(err){
                    console.log(err);
                }
            });
        }
        history.push("/info");
    };

    return (
        
        <div className="container mt-5">
             
            <div className="row">
                <div className="col-md-6 col-10 mx-auto">
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <p>Add info here:</p>
                            <label className="bmd-label-floating">
                                Name:
                            </label>
                            <input type="text" className="form-control" value={name} name="name" onChange={handleInputchange} required>
                            </input>

                        </div>

                        <div className="form-group">
                            <label className="bmd-label-floating">
                                Phone:
                            </label>
                            <input type="number" className="form-control" value={mobile} name="mobile" onChange={handleInputchange} required>
                            </input>

                        </div>

                        <div className="form-group">
                            <label className="bmd-label-floating">
                                Email:
                            </label>
                            <input type="email" className="form-control" value={email} name="email" onChange={handleInputchange}>
                            </input>
                        </div>

                        <div className="form-group">
                            <label className="bmd-label-floating">
                                Address:
                            </label>
                            <input type="text" className="form-control" value={address} name="address" onChange={handleInputchange}>
                            </input>
                        </div>

                        <div className="form-group">
                            <label className="bmd-label-floating">
                                Taken Course:
                            </label>
                            <input type="text" className="form-control" value={course} name="course" onChange={handleInputchange}>
                            </input>

                        </div>
                        <button type="submit" className="btn mr-3" id="submit" > Submit </button>
                        <Link to="/info">
                        <button className="btn" id="cancle"> Cancel </button>
                        </Link>
                    </form>
                </div>
            </div>

        </div> 
    )
}

export default Add
