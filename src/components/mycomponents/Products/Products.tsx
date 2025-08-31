
import Filter from "./Filter"
import TableView from "./Table"

function Products() {
    return (
        <>
            <div className="flex flex-col gap-4 p-2 sm:p-4">
                <Filter />
                <TableView />
            </div>
        </>
    )
}
export default Products