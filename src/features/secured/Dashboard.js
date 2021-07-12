import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { Container, Row, Col, Button }  from 'react-bootstrap';
import {
    logout,fetchPDF
  } from '../services/serviceCallSlice';

import { clearToken } from "../../utills/Utill"
import { useHistory } from "react-router-dom";
import "../secured/Dashboard.css"
import { unwrapResult } from '@reduxjs/toolkit'


export default function Dashboard(props) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    let history = useHistory();

    function logOut(){
        console.log("logOut");
        dispatch(logout());
    }

    function pdfDowanload(){
        console.log("Pdf Dowanload Started ....");
        dispatch(fetchPDF())
        .then(unwrapResult)
        .then(originalPromiseResult => {
            console.log(originalPromiseResult);
            //saveToken(originalPromiseResult.access_token)
            //history.push('/Dashboard', originalPromiseResult.unique_id);
            console.log("Pdf Dowanloaded");
        })
        
    }

    useEffect(() => {
        console.log("token updatated");
        console.log(user);
        if(user.data.access_token == undefined || 
            user.data.access_token == ""){
                history.push('/');
        }
    },[user])

    console.log(user.data);
    return (
        <div className="contain"> 
            <div className="customcontainer header">
                Welcome Home {user.data.unique_id}<br></br>
                { user.data.unique_id && 
                    <Button
                    variant="primary"
                    className="alert"
                    onClick={logOut}
                    >Log Out
                    </Button>
                }
            </div>
            <div className="customcontainer header">
            <Button 
            variant="primary" 
            className="alert" 
            onClick={pdfDowanload}>Downalod PDF</Button>
            </div>

        </div>
    )
}
