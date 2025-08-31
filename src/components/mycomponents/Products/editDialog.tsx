import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Product } from "@/api/products";
import { useEditProduct } from "@/api/products";
import { X } from "lucide-react";
import { toast } from "sonner";

interface EditDialogProps {
    product: Product | null;
    open: boolean;
    onClose: () => void;
}

export default function EditDialog({ product, open, onClose }: EditDialogProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState<number | "">("");

    const editProductMutation = useEditProduct();

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

        editProductMutation.mutate(
            {
                id: product.id,
                title,
                price: Number(price),
                category,
                stock: Number(stock),
            },
            {
                onSuccess: () => {
                    toast.success("Product successfully edited");
                    onClose();
                },
                onError: () => {
                    toast.error("Failed to edit the selected product "); 
                    alert("Failed to update product");
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
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>Update the product details below.</DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-2 py-2" onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            placeholder="Product Name"
                            className="w-full rounded-none border-black"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <Input
                            type="number"
                            placeholder="Price"
                            className="w-full rounded-none border-black"
                            value={price}
                            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                            min={0}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Category"
                            className="w-full rounded-none border-black"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                        <Input
                            type="number"
                            placeholder="Stock"
                            className="w-full rounded-none border-black"
                            value={stock}
                            onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
                            min={0}
                            required
                        />

                        <div className="flex gap-2 mt-2">
                            <Button type="submit" className="bg-black text-white rounded-none flex-grow cursor-pointer h-9  hover:bg-black/90" disabled={editProductMutation.isPending}>
                                {editProductMutation.isPending ? "Editing..." : "Edit Product"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
