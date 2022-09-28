import React, {useState, useEffect} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import CreatePostForm from '../components/CreatePostForm'

const CreatePost = () => {
    const [loggedInUser, setLoggedInUser] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/loggedinuser", {withCredentials: true})
            .then(res => {
                if(res.data.results){
                    setLoggedInUser(res.data.results)
                }
            })
            .catch(err => {
                console.log("couldn't get a logged in user: ", err)
                alert("You must be logged in to create a post")
                navigate("/")
            })
    }, [])

    return (
        <div>
            <CreatePostForm loggedInUser={loggedInUser}/>
        </div>
    )
}

export default CreatePost



