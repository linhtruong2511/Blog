import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
  question: string;
  onConfirm: () => void;
  children: React.ReactNode;
}
export default function ModalConfirm({ children, question, onConfirm }: Props) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận</DialogTitle>
          </DialogHeader>
          <DialogDescription>{question}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Thoát</Button>
            </DialogClose>
            <DialogClose>
              <Button onClick={onConfirm} variant={"default"}>
                Xác nhận
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
