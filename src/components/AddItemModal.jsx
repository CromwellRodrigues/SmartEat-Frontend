import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AddItemButton from "./AddItemButton";
import { ItemInputForm } from "./ItemInputForm";

const AddItemModal = ({ onSubmit }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddItemButton onClick={() => setOpen(true)} />
      </DialogTrigger>
          <DialogContent  className="max-h-[90vh] overflow-y-auto" >
          <DialogTitle></DialogTitle>
        <ItemInputForm
          onSubmit={(values) => {
            onSubmit(values);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;