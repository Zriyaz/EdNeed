import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Form, Row, Col, Button} from "react-bootstrap"
import FormContainer from './FormContainer'
import {register} from "../actions/userActions"
import Message from "./Message"
import Loader from "./Loader"

const Register = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history.push("/dashborad")
        }
    },[history, userInfo])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match!')
        }else{
            dispatch(register(name, email, password, confirmPassword))
        }  
    }

    return (
       <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant="danger">{error}</Message> }
                {message && <Message variant="danger">{message}</Message> }
                {loading && <Loader />} 
             <Form onSubmit={submitHandler}>
             <Form.Group required={true} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                      type="name" 
                      placeholder="Enter your name" 
                      value = {name}
                      onChange = {e=>setName(e.target.value)}
                      >
                      </Form.Control>
                </Form.Group>
                <Form.Group required={true} controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter email" 
                      value = {email}
                      onChange = {e=>setEmail(e.target.value)}
                      >
                      </Form.Control>
                </Form.Group>
                <Form.Group required={true} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Enter password" 
                      value = {password}
                      onChange = {e=>setPassword(e.target.value)}
                      >
                      </Form.Control>
                </Form.Group>
                <Form.Group required={true} controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Confirm password" 
                      value = {confirmPassword}
                      onChange = {e=>setConfirmPassword(e.target.value)}
                      >
                      </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Register</Button>
             </Form>
             <Row className="py-3">
                 <Col>
                    Have an Account? {' '}
                    <Link to="/login">
                        Login
                    </Link>
                 </Col>
             </Row>
       </FormContainer>
    )
}

export default Register