import { ReactNode } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface Props {
  children: ReactNode;
  onOk: () => void;
  title: string;
  description: string;
  buttonOkTitle: string;
  close: () => void;
}

export default function Modal(props: Props) {
  const handleClickOK = () => {
    props.close();
    props.onOk();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription>{props.description}</DialogDescription>
      </DialogHeader>

      {props.children}

      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleClickOK} type="button" variant={"default"}>
            {props.buttonOkTitle}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
