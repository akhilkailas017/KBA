import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className="sticky top-0 shadow-lg">
        <ul className="list-none flex bg-rose-600 text-white h-16  w-full p-5 items-center sticky top-0 justify-between">
          <li className="text-xl">Akhil Kailas</li>
          <div className="flex gap-5">
            <li><a href="#about" className="">About</a></li>
            <li> <a href="#education" className="">Education</a></li>
            <li> <a href="#skills" className="">Skills</a></li>
            <li> <a href="#projects" className="">Projects</a></li>
            <li> <a href="#contact" className="">Contact</a></li>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default Navbar