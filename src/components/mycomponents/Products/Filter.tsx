import { ListFilter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FilterProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

function Filter({ searchTerm, setSearchTerm }: FilterProps) {
    return (
        <>
            <div className="w-full flex justify-between items-center">
                <div className="flex gap-2 items-center w-full">
                    <div className="h-8 w-8 flex justify-center items-center border border-black">
                        <ListFilter className="w-4 h-4 text-black" />
                    </div>
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-8 rounded-none border-black"
                        placeholder="Search for products..."/>
                    <Button className="bg-black text-white rounded-none h-8 px-4 hover:bg-black/90 cursor-pointer">Add</Button>
                </div>
            </div>
        </>
    )
}
export default Filter