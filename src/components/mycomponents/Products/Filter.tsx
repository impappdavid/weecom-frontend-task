import { ListFilter } from "lucide-react"
import { Input } from "@/components/ui/input"

function Filter() {
    return (
        <>
            <div className="w-full flex justify-between items-center">
                <div className="flex gap-2 items-center w-full">
                    <div className="p-1.5 border border-black">
                        <ListFilter className="w-4 h-4 text-black" />
                    </div>
                    <Input className="w-full h-7 rounded-none border-black" placeholder="Search for products..."/>
                </div>
            </div>
        </>
    )
}
export default Filter