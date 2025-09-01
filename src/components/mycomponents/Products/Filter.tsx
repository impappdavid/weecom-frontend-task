import { useState } from "react";
import { ListFilter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddProduct } from "@/api/products";
import { toast } from "sonner";

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

function Filter({ searchTerm, setSearchTerm }: FilterProps) {
  const addProductMutation = useAddProduct();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setCategory("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || price === "" || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    addProductMutation.mutate(
      {
        title,
        price: Number(price),
        category,
        stock: 0,
      },
      {
        onSuccess: () => {
          toast.success("Product added successfully ");
          resetForm();
          setIsOpen(false);
        },
        onError: () => {
          toast.error("Failed to add product "); 
        },
      }
    );
  };

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
            placeholder="Search for products..."
          />

          <div
            className="bg-black text-white rounded-none h-8 px-4 hover:bg-black/90 cursor-pointer flex justify-center items-center text-sm"
            onClick={() => setIsOpen(true)}
          >
            Add
          </div>

          <Dialog open={isOpen}>
            <DialogContent>
              <div className="relative">
                <div
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </div>
                <DialogHeader>
                  <DialogTitle>Add a new Product</DialogTitle>
                  <DialogDescription>
                    Please fill out all the fields below to add a new product.
                  </DialogDescription>
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
                    step={0.01}
                    className="w-full rounded-none border-black"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value === "" ? "" : Number(e.target.value))
                    }
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
                  <Button
                    type="submit"
                    className="bg-black text-white rounded-none h-9 px-4 hover:bg-black/90 cursor-pointer flex justify-center items-center text-sm w-full"
                    disabled={addProductMutation.isPending}
                  >
                    {addProductMutation.isPending ? "Adding..." : "Add Product"}
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default Filter;
