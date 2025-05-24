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

interface Props {
  children: ReactNode;
  onOk: () => void;
  title: string;
  description: string;
  buttonOkTitle: string;
}

export default function Modal(props: Props) {
  const handleClickOK = () => {
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
