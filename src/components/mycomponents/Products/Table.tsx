import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { useProducts, type Product } from "@/api/products";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";


import EditDialog from "./editDialog";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteDialog from "./deleteDialog";

const PRODUCTS_PER_PAGE = 15;

function TableView({ searchTerm }: { searchTerm: string }) {
    const [page, setPage] = useState(1);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        if (page !== 1) setPage(1);
    }, [searchTerm]);

    const { data, isLoading, isError } = useProducts(page, searchTerm);

    const totalPages = data ? Math.ceil(data.total / PRODUCTS_PER_PAGE) : 1;

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const getVisiblePages = () => {
        if (totalPages <= 3) return getPageNumbers();

        if (page === 1) return [1, 2, 3];
        if (page === totalPages) return [totalPages - 2, totalPages - 1, totalPages];

        return [page - 1, page, page + 1];
    };






    return (
        <>
            <Table className="border border-black">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-md">Title</TableHead>
                        <TableHead className="text-xs sm:text-md">Price</TableHead>
                        <TableHead className="text-xs sm:text-md">Category</TableHead>
                        <TableHead className="text-xs sm:text-md">Stock</TableHead>
                        <TableHead className="text-right text-xs sm:text-md">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                <Skeleton className="h-7 w-full mt-1" />
                                <Skeleton className="h-7 w-full mt-1" />
                                <Skeleton className="h-7 w-full mt-1" />
                            </TableCell>
                        </TableRow>
                    )}

                    {isError && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-red-600">
                                Error loading products.
                            </TableCell>
                        </TableRow>
                    )}

                    {!isLoading && !isError && data?.products.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">
                                No products found.
                            </TableCell>
                        </TableRow>
                    )}

                    {!isLoading &&
                        !isError &&
                        data?.products.length! > 0 &&
                        data?.products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium text-xs sm:text-md max-w-24 truncate">{product.title}</TableCell>
                                <TableCell>
                                    <div className="w-fit py-1 px-2 bg-green-500/40 text-green-800 font-medium text-xs sm:text-md">
                                        ${product.price}
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs sm:text-md max-w-3 truncate">{product.category}</TableCell>
                                <TableCell className="text-xs sm:text-md">{product.stock}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button
                                        className="bg-transparent rounded-none border border-black text-black hover:bg-black/10 cursor-pointer h-7 w-7 md:w-fit"
                                        onClick={() => {
                                            setEditingProduct(product);
                                            setIsEditDialogOpen(true);
                                        }}
                                    >
                                        <div className="hidden md:flex">Edit</div>
                                        <div className="flex md:hidden">
                                            <Pencil />
                                        </div>
                                    </Button>
                                    <Button className="rounded-none cursor-pointer h-7 w-7 md:w-fit" size="sm" 
                                    onClick={() => {
                                            setEditingProduct(product);
                                            setIsDeleteDialogOpen(true);
                                        }}>
                                        <div className="hidden md:flex">Delete</div>
                                        <div className="flex md:hidden">
                                            <Trash />
                                        </div>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {data && (
                <div className="flex justify-between items-center mt-0 sm:mt-4">
                    <div className="flex w-full text-sm text-zinc-600">
                        Showing {data.products.length * page} / {data.total}
                    </div>
                    <div>
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
                                    <PaginationItem key={pageNumber}>
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
            )}

            <EditDialog
                product={editingProduct}
                open={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
            />

            <DeleteDialog
                product={editingProduct}
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
            />
        </>
    );
}

export default TableView;
