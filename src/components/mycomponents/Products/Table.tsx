import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"
import { useProducts } from "@/api/products"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react"

const PRODUCTS_PER_PAGE = 15;

function TableView() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useProducts(page);

    if (!data) return null;

    const totalPages = Math.ceil(data.total / PRODUCTS_PER_PAGE);

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const getVisiblePages = () => {
        const totalPages = Math.ceil(data.total / PRODUCTS_PER_PAGE);
        if (totalPages <= 3) return getPageNumbers();

        if (page === 1) return [1, 2, 3];
        if (page === totalPages) return [totalPages - 2, totalPages - 1, totalPages];

        return [page - 1, page, page + 1];
    };

    if (isLoading) return (
        <>
            <div className="flex flex-col gap-0.5 mt-12">
                {Array.from({ length: 15 }).map((_, index) => (
                    <Skeleton key={index} className="h-[45px] w-full" />
                ))}
            </div>
        </>
    );
    if (isError) return <div>Error loading products</div>;
    if (!data || data.products.length === 0) return <div>No productsfound.</div>;

    return (
        <>
            <Table className="border border-black">
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
                    {isLoading ? (
                        <div className=""></div>
                    ) : (
                        <div className=""></div>
                    )}

                    {data.products.map((product) => (
                        <TableRow>
                            <TableCell className="font-medium">{product.title}</TableCell>
                            <TableCell className="font-medium">
                                <div className="w-fit py-1 px-2 bg-green-500/40 text-green-800">
                                    ${product.price}
                                </div>
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.stock}</TableCell>
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

                    ))}
                </TableBody>
            </Table >

            <div className="flex justify-between items-center mt-4">
                <div className="flex w-full text-sm text-zinc-600">
                    Showing {data.products.length * page} / {data.total}
                </div>
                <div className="">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (page > 1) setPage(page - 1);
                                    }}
                                />
                            </PaginationItem>

                            {getVisiblePages().map((pageNumber) => (
                                <PaginationItem key={pageNumber} >
                                    <PaginationLink
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(pageNumber);
                                        }}
                                        isActive={pageNumber === page}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (page < totalPages) setPage(page + 1);
                                    }}
                                    isActive={page === totalPages}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    )
}
export default TableView