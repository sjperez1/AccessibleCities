import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import moment from 'moment'
import '../views/dashboard.css'

const Dashboard = () => {
    const [posts, setPosts] = useState([])
    const [pageNum, setPageNum] = useState(0)
    const [numOfPages, setNumOfPages] = useState(0)
    const [user, setUser] = useState("")
    const [search, setSearch] = useState("")
    const searchBy =["location", "features", "preview", "postBody"]
    const navigate = useNavigate()
    // the following creates a new array with a certain number of things, specified in parentheses. These things will show up as empty, which can be seen if you console.log(new Array(4). The .fill() will actually give this number of empty things a value. The map function helps go through each of the values and put the index number in the array, so the number of pages array will start at zero and go up to numbeer of pages - 1.
    const pages = new Array(numOfPages).fill(null).map((num, i) => i)
    // console.log(pages)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/posts?page=${pageNum}`)
            .then(res => {
                    // console.log(res.data)
                    if(res.data){
                        setPosts(res.data.posts)
                        setNumOfPages(res.data.totalPages)
                    }
            })
            // console.log('current pageNum'  + pageNum)
            .catch(err=>console.log(err))
    },[pageNum]) // the new data will be retrieved when the page number is changed

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/loggedinuser", {withCredentials: true})
            .then(res => {
                if(res.data.results){
                    console.log(res.data.results)
                    setUser(res.data.results)
                }
            })
            .catch(err => {
                console.log("couldn't get a logged in user: ", err)
            })
    }, [])

    const handleDelete = (delid) => {
        axios.delete(`http://localhost:8000/api/post/${delid}`)
            .then(res => {
                // need to use filter and the set filtered list so that it will automatically update the list when you are not redirecting to a new page after delete. 
                const filterList = posts.filter(eachPost => eachPost._id !== delid)
                setPosts(filterList)
            })
            .catch(err=>console.log(err))
    }

    const logoutHandler = ()=>{
        axios.get(`http://localhost:8000/api/user/logout`, {withCredentials: true})
            .then(res=>navigate("/"))
            .catch()
    }

    const viewPostHandler = () => {
        navigate(`/post/user/posts`)
    }

    const loginNavigateHandler = () => {
        navigate("/")
    }

    const previousHandler = () => {
        setPageNum(Math.max(0, pageNum - 1))
    }

    const nextHandler = () => {
        setPageNum(Math.min(numOfPages - 1, pageNum + 1))
    }
    const pageNumHandler = (num) => {
        setPageNum(num)
    }

    return (
        <>
            <div>
                {
                    user !== ""?
                <>
                    <h2 className='userWelcome'>Welcome {user.firstName} {user.lastName}!</h2>
                    <div className="dropdown">
                        <button className="btn dashboarduserbtn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            User Options
                        </button>
                        <ul class="dropdown-menu">
                            <li className="dropdown-item" onClick={viewPostHandler}>View your posts</li>
                            <li className="dropdown-item" onClick={logoutHandler}>Logout</li>
                        </ul>
                    </div>
                </>
                    : <button className='btn dashboarduserbtn' onClick={loginNavigateHandler}>Login</button>
                }
            </div>
        <h1 className='yourpoststext'>Browse All Posts</h1>
        <div>
            <div className='searchouter'>
                <input type="text" className="searchbox" placeholder='Search by location, accessibility features, short description, or full post' value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
            </div>
            <p className='pageNumInfo'>Viewing page {pageNum + 1} of {numOfPages}</p>
            <div className='outerpost'>
                {
                posts.filter((post) => 
                // all of the parts that I want to be able to search by that are in the database have been put in an array called searchBy at the top. Doing searchBy.some is basically going through that array and saying search in this part of the data or this part of the data or this part... until it is done with that array. This limits the need to write a filter line for every type that that you want to be able to search by.
                searchBy.some(searchBy => post[searchBy].toLowerCase().includes(search))
                )
                .map((post, i) => (
                    <div className='post' key={i}>
                        {console.log(post)}
                        <h3>{post.location}</h3>
                        <p>Looked for: {post.features}</p>
                        <p>Created by: {post.createdBy} {moment(post.created).fromNow()}</p>
                            <p>Post description: {post.preview}</p>
                        <div className='buttondiv'>
                            <Link to={`/post/view/${post._id}`} className='btn fullpost'>View full post</Link>
                            {
                                user.posts !== undefined && user.posts.includes(post._id)?
                                <button className='btn deletebtn' onClick={(e) => handleDelete(post._id)}>Delete</button>
                                : ""
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className='pagebuttons'>
            <button onClick={previousHandler} className='pagedirection pgbtns btn'>Previous</button>
            {
                pages.map((page, i) => (
                    <button key={i} onClick={() => pageNumHandler(page)} className='pagenumber pgbtns btn'>{page + 1}</button>
                ))
            }
            <button onClick={nextHandler} className='pagedirection pgbtns btn'>Next</button>
        </div>
        </>
    )
}

export default Dashboard