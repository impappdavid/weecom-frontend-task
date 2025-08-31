
import { useState } from "react";
import Filter from "./Filter"
import TableView from "./Table"

function Products() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <>
            <div className="flex flex-col gap-4 p-2 sm:p-4">
                <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <TableView searchTerm={searchTerm}/>
            </div>
        </>
    )
}
export default Products