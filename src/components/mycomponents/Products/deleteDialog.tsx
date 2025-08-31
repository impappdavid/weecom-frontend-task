import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Product } from "@/api/products";
import { useDeleteProduct, useEditProduct } from "@/api/products";
import { X } from "lucide-react";
import { toast } from "sonner";

interface EditDialogProps {
    product: Product | null;
    open: boolean;
    onClose: () => void;
}

export default function DeleteDialog({ product, open, onClose }: EditDialogProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState<number | "">("");

    const deleteProductMutation = useDeleteProduct();

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
        } else {
            setTitle("");
            setPrice("");
            setCategory("");
            setStock("");
        }
    }, [product]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!product) return;

        deleteProductMutation.mutate(product.id,
            {
                onSuccess: () => {
                    toast.success("Product successfully deleted");
                    onClose();
                },
                onError: () => {
                    toast.error("Failed to delete the selected product ");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <div className="relative">
                    <div
                        className="absolute top-0 right-0 cursor-pointer"
                        onClick={onClose}
                    >
                        <X className="w-4 h-4" />
                    </div>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>Are you sure to delete this product.</DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-2 py-2" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <div className="flex gap-1">
                                <div className="font-medium">Title: </div>
                                <div className="">{title}</div>
                            </div>
                            <div className="flex gap-1">
                                <div className="font-medium">Price: </div>
                                <div className="">${price}</div>
                            </div>
                            <div className="flex gap-1">
                                <div className="font-medium">Category: </div>
                                <div className="">{category}</div>
                            </div>
                            <div className="flex gap-1">
                                <div className="font-medium">Stock: </div>
                                <div className="">{stock}</div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-2">
                            <Button
                                className="bg-transparent border border-black text-black rounded-none flex-grow cursor-pointer h-9  hover:bg-black/10">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-black text-white rounded-none flex-grow cursor-pointer h-9  hover:bg-black/90" disabled={deleteProductMutation.isPending}>
                                {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
