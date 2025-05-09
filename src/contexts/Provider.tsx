import { ReactNode } from "react";
import NavLinkProvider from "./NavLinkProvider";

function Provider({ children }: { children: ReactNode }) {
  return <NavLinkProvider>{children}</NavLinkProvider>;
}

export default Provider;
