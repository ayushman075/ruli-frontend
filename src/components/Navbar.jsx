import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AddRule from "./AddRule";
import { DialogDescription } from "@radix-ui/react-dialog";
  
const Navbar = () => {



  return (
    <nav className="bg-[#1E3E62] text-white dark:bg-[#1E3E62] rounded-xl">
      <div className=" container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold">Ruli</div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {/* Add Rule Button */}
          
          <Dialog>
  <DialogTrigger><Button className="bg-transparent text-white border-2 border-[#FF6500] hover:bg-[#FF6500]">
          <Plus size={30} /> Add Rule
          </Button></DialogTrigger>
  <DialogContent className="border-0  bg-transparent">
    
  <AddRule/>
  </DialogContent>
</Dialog>

          {/* Update Button */}
         

          {/* Dark Mode Switch */}
          {/* <div className="flex items-center">
            <span className="mr-2">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
