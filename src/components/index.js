import React, { useState, useEffect } from 'react';
import firebaseDb from "../firebase";
import { Link } from "react-router-dom";
import "./style.css";

const ContactsList = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        firebaseDb.child("contacts").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({
                    ...snapshot.val()
                });
            } else {
                snapshot({});
            }
        })
    }, []);

    const onDelete = (id) => {
        if (window.confirm("Do you want to delete it now?")) {
            firebaseDb.child(`contacts/${id}`).remove((err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    }

    return (
        <div className="container-fluid mt-5">
            
            <div className="row">
                <div className="col-lg-12">
                    <div className="banner">
                        <h3>List of Trainees' contacts Info</h3>
                    </div>
                    <table className="table table-bordered table-striped">
                        <thead className="thead">
                            <tr className="trow">
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Taken Course</th>
                                <th scope="col">Edit/Delete/View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data).map((id, index) => {
                                return (
                                    <tr key={id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data[id].name}</td>
                                        <td>{data[id].mobile}</td>
                                        <td>{data[id].email}</td>
                                        <td>{data[id].address}</td>
                                        <td>{data[id].course}</td>
                                        <td>
                                            <Link to={`/update/${id}`}>
                                                <a className="btn"id="action" >
                                                    <i className="fas fa-edit" />
                                                </a>
                                            </Link>

                                            <a className="btn" id="action" onClick={() => onDelete(id)}>
                                                <i className="fas fa-trash" />
                                            </a>

                                            <Link to={`/view/${id}`}>
                                                <a className="btn" id="action">
                                                    <i className="fas fa-eye" />
                                                </a>
                                            </Link>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactsList;
