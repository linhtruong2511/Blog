import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";

interface Props {
  children: React.ReactNode;
  onOk: () => void;
  title: string;
  description: string;
}

export default function ModalEdit({description, children, title} : Props){
  return <>
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>{description}</DialogDescription>



        <DialogFooter>

        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  </>
}