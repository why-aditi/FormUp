import React, { useTransition } from "react";
import { Button } from "./ui/button"; 
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from "next/navigation";
import { PublishForm } from "@/actions/form";
import { FaSpinner } from "react-icons/fa";

function PublishFormBtn({id}:{id:number}) {
  
  const [loading, startTransition] = useTransition();
  const { toast } = useToast(); 
  const router =useRouter();
  
  async function publishForm ()  {
    try {
      await PublishForm(id);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      console.error("Error creating form: ", error);

    }
  };


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>  
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing, you will not be able
            to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form, you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
  
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <FaSpinner className="animate-spin"/>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  
}

export default PublishFormBtn;