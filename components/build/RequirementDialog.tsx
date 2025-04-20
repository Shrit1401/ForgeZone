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
import { toast } from "sonner";

type RequirementDialogProps = {
  title: string;
  onClick: (message: string) => void;
  children: React.ReactNode;
};

const RequirementDialog = ({
  title,
  onClick,
  children,
}: RequirementDialogProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim() === "") {
      toast.error("Please enter a message.");
      return;
    }
    onClick(message);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="manrope text-2xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </DialogTitle>
        </DialogHeader>
        <Textarea
          onChange={(e) => setMessage(e.target.value)}
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
