import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form'
import  { Container, Row, Col, Button }  from 'react-bootstrap';
import { fetchUserById } from '../services/serviceCallSlice';
import qs from 'qs';
import { useHistory } from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit'
import { saveToken, getToken } from "../../utills/Utill"


export default function UserLogin() {

    let history = useHistory();

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const dispatch = useDispatch();

    function onChangePasswordHandler(event){
        setpassword(event.target.value);
        console.log("handleOnChangeHit");
    }

    function onChangeUsernameHandler(event){
        setusername(event.target.value);
        console.log("handleOnChangeHit");
    }

    function login(){
        let loginData = qs.stringify({
            username:username,
            password:password,
            grant_type:'password'
          });
        
        dispatch(fetchUserById(loginData))
        .then(unwrapResult)
    .then(originalPromiseResult => {
        console.log(originalPromiseResult);
        saveToken(originalPromiseResult.access_token)
        history.push('/Dashboard', originalPromiseResult.unique_id);
    })
    .catch(rejectedValueOrSerializedError => {})
        console.log("loginHit");
    }

    return (
        <div>
            <Container className="customcontainer">
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={username}
                                    onChange={onChangeUsernameHandler} 
                                    placeholder="Enter username" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password"
                                value={password}
                                onChange={onChangePasswordHandler}
                                placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" 
                            onClick={login}
                            >
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}
