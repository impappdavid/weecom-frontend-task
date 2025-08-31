import { Menu, User } from "lucide-react"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { NavLink } from "react-router-dom"

function Header() {
    return (
        <>
            <div className="w-full p-2 border-b h-fit border-black flex justify-between items-center">
                <div className="text-xl hidden lg:flex">Home</div>
                <Sheet>
                    <SheetTrigger>
                        <div className="flex lg:hidden rounded-none w-8 h-8">
                            <Menu />
                        </div>
                    </SheetTrigger>
                    <SheetContent className="p-2">
                        <SheetHeader className="py-2 px-0">
                            <SheetTitle className="text-xl">Weecom</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-1">
                            <NavLink to="/" className={({ isActive }) => isActive ? "py-1.5 px-2 bg-black text-white" : "py-1.5 px-2 hover:bg-black hover:text-white transition-all duration-300"}>Home</NavLink>
                            <NavLink to="/about" className={({ isActive }) => isActive ? "py-1.5 px-2 bg-black text-white" : "py-1.5 px-2 hover:bg-black hover:text-white transition-all duration-300"}>About</NavLink>
                            <NavLink to="/services" className={({ isActive }) => isActive ? "py-1.5 px-2 bg-black text-white" : "py-1.5 px-2 hover:bg-black hover:text-white transition-all duration-300"}>Services</NavLink>
                            <NavLink to="/contact" className={({ isActive }) => isActive ? "py-1.5 px-2 bg-black text-white" : "py-1.5 px-2 hover:bg-black hover:text-white transition-all duration-300"}>Contact</NavLink>
                        </div>
                    </SheetContent>
                </Sheet>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="rounded-none p-2 w-8 h-8 cursor-pointer">
                            <User />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
export default Header