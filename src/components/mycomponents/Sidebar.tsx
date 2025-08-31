import { NavLink } from "react-router-dom"

function Sidebar() {
    return (
        <>
            <div className="min-w-56 max-w-56 border-r border-black p-2 hidden lg:flex flex-col gap-4 h-screen">
                <div className="text-xl font-medium">Weecom</div>
                <div className="flex flex-col gap-1">
                    <NavLink to="/" className={({ isActive }) => isActive ? "py-1.5 px-2 bg-black text-white" : "py-1.5 px-2 hover:bg-black hover:text-white transition-all duration-300"}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "py-1.5 px-2 bg-black text-white" : "py-1.5 px-2 hover:bg-black hover:text-white transition-all duration-300"}>About</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? "py-1.5 px-2 bg-black text-white" : "py-1.5 px-2 hover:bg-black hover:text-white transition-all duration-300"}>Services</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "py-1.5 px-2 bg-black text-white" : "py-1.5 px-2 hover:bg-black hover:text-white transition-all duration-300"}>Contact</NavLink>
                </div>
            </div>
        </>
    )
}
export default Sidebar