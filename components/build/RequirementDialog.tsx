"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import Btn from "../Btn";

const RequirementDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    // Handle submission logic here
    setOpen(false); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="manrope text-2xl font-bold text-slate-900 dark:text-slate-100">
            What did you have for breakfast this morning?
          </DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Type anything, just make sure to make us laugh..."
          className="w-full mt-4 mb-6"
        />

        <DialogFooter>
          <Btn
            type="normal"
            title="Submit"
            className="w-full"
            onClick={handleSubmit}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequirementDialog;
