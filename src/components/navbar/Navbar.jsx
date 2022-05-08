import React, { useState, useEffect } from 'react'
//import './Navbar.css';
import { FaSignInAlt, FaUser, FaSignOutAlt, FaAd } from 'react-icons/fa'
import Registration from '../userLogin/Registration';
import image from './logo.png';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../userLogin/Login'
import Course from '../userLogin/Course'
import AddCourse from '../admin/AddCourse'
import { useSelector } from 'react-redux';
import Welcome from '../userLogin/Welcome';
import Viewalluser from '../admin/ViewAllUser';
import ViewCourse from '../admin/ViewCourse';
import ShowAdminUser from '../admin/ShowUser';
import EditCourse from '../admin/EditCourse';
import ShowUser from '../userLogin/ShowUser';
import EditUser from '../userLogin/EditUser';
import AllCourse from '../userLogin/AllCourse';
import CourseContent from '../userLogin/CourseContent';
import jwtDecode from 'jwt-decode';

export default function NavbarRouter() {
    const user = useSelector((state) => state.login.user);
    const [token, setToken] = useState('');
    const [isAdmin, setIsadmin] = useState(null);
    const handleClick = () => {
        localStorage.removeItem('Token', token);
        localStorage.clear();
        setToken();
    };

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const decoded = jwtDecode(token);
            setIsadmin(decoded.isAdmin);
        }
        setToken(token);
    })


    return (
        <div>
            <section>
                <Router>
                        <Navbar bg="dark" expand="lg">
                            <Navbar.Brand href="/welcome" className='ms-2'>
                                <img src={image} height={40} />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"  className='bg-light'/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                {token && isAdmin ? (
                                    <Nav className="me-auto">
                                        <Nav.Link as={Link} to="/addcourse" className='text-light' >Course</Nav.Link>
                                        <Nav.Link as={Link} to="/viewcourse" className='text-light'> ViewCourse</Nav.Link>
                                        <Nav.Link as={Link} to="/viewusers" className='text-light'> ViewUser</Nav.Link>
                                        <Nav.Link as={Link} to={'/showadminusers'} state={{ user: user }} className='text-light'><FaUser />{user.name}</Nav.Link>
                                        <Nav.Link as={Link} to="/" onClick={handleClick} className='text-light'>Logout<FaSignOutAlt /> </Nav.Link>
                                    </Nav>) : token ? (<Nav>
                                        <Nav.Link as={Link} to="/allcourses" className='text-light'>Course</Nav.Link>
                                        <Nav.Link as={Link} to={'/showusers'} state={{ user: user }} className='text-light'><FaUser />{user.name}</Nav.Link>
                                        <Nav.Link as={Link} to="/" onClick={handleClick} className='text-light'>Logout<FaSignOutAlt /></Nav.Link>
                                    </Nav>) : (
                                    <Nav.Link as={Link} to="/" className='text-light' style={{ marginRight: '30px' }}> Login <FaSignInAlt /></Nav.Link>
                                )
                                }
                            </Navbar.Collapse>
                        </Navbar>

                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/course" element={<Course />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/addcourse" element={<AddCourse />} />
                        <Route path="/viewusers" element={<Viewalluser />} />
                        <Route path="/showusers" element={<ShowUser />} />
                        <Route path="/showadminusers" element={<ShowAdminUser />} />
                        <Route path="/viewcourse" element={<ViewCourse />} />
                        <Route path={`/editusers/:_id`} element={<EditUser />} />
                        <Route path={`/editcourse/:_id`} element={<EditCourse />} />
                        <Route path='/allcourses' element={<AllCourse />} />
                        <Route path='/coursecontent/:_id' element={<CourseContent />} />
                    </Routes>
                </Router>
            </section>
        </div>
    )
}
