import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"

function TableView() {
    return (
        <>
            <Table className="border border-black">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>$250.00</TableCell>
                        <TableCell className="text-right flex justify-end gap-2">
                            <Button className="bg-transparent rounded-none border border-black text-black hover:bg-black/10 cursor-pointer h-7 w-7 md:w-fit" >
                                <div className="hidden md:flex">Edit</div>
                                <div className="flex md:hidden"><Pencil /></div>
                            </Button>
                            <Button className="rounded-none cursor-pointer h-7 w-7 md:w-fit" size="sm">
                                <div className="hidden md:flex">Delete</div>
                                <div className="flex md:hidden"><Trash /></div>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>$250.00</TableCell>
                        <TableCell className="text-right flex justify-end gap-2">
                            <Button className="bg-transparent rounded-none border border-black text-black hover:bg-black/10 cursor-pointer h-7 w-7 md:w-fit" >
                                <div className="hidden md:flex">Edit</div>
                                <div className="flex md:hidden"><Pencil /></div>
                            </Button>
                            <Button className="rounded-none cursor-pointer h-7 w-7 md:w-fit" size="sm">
                                <div className="hidden md:flex">Delete</div>
                                <div className="flex md:hidden"><Trash /></div>
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}
export default TableView