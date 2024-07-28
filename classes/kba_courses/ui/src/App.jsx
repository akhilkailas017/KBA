
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Coursespage from './pages/Coursespage';
import Notfoundpage from './pages/Notfoundpage';
import Contactpage from './pages/Contactpage'
import Mainlayout from './layouts/Mainlayout';
import Addcoursepage from './pages/Addcoursepage';
import Coursepage from './pages/Coursepage';
import Editcoursepage from './pages/Editcoursepage';


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Mainlayout />}>
        <Route path='/' element={<Homepage />} />
        <Route path='/courses' element={<Coursespage />} />
        <Route path='/contact' element={<Contactpage />} />
        <Route path='/addcourse' element={<Addcoursepage />} />
        <Route path='courses/:id' element={<Coursepage />} />
        <Route path='/editcourse' element={<Editcoursepage />} />
        <Route path='*' element={<Notfoundpage />} />
      </Route>
    </>


  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
