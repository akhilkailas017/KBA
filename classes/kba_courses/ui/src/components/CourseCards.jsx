import React, { useEffect, useState } from 'react'

import CourseCard from './CourseCard'
// import courses from '../courses.json'

const CourseCards = ({ isHome = false }) => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const courseslist = isHome ? courses.slice(0, 3) : courses;

    useEffect(() => {
        const fetchcourses = async () => {
            try {
                const res = await fetch('http://localhost:5000/courses');
                const data = await res.json();
                setCourses(data)
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchcourses();
    }, [])

    console.log(courses)
    return (
        <>

            <div className='bg-purple-100 flex flex-col items-center justify-center my-10 p-10 text-center'>
                <h1 className='font-bold text-2xl md:text-4xl text-purple-800 text-center' >{isHome ? "Top Courses" : "All Courses"}</h1></div>

            {loading ? <h1>Loading</h1> : <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10'>
                {
                    courseslist.map((course) => (
                        <CourseCard key={course.courseId} course={course} />
                    ))
                }
            </div>}

        </>
    )
}

export default CourseCards