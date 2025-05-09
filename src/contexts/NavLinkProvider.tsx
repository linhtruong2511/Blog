import { createContext, ReactNode, useContext } from "react";
import { NavLinkType } from "../types/NavLinkType";
const NavLinkContext = createContext<NavLinkType[] | undefined>(undefined);

export default function NavLinkProvider({ children }: { children: ReactNode }) {
  const navLinks: NavLinkType[] = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/blog",
      title: "Blog",
    },
    {
      url: "/about",
      title: "About",
    },
  ];
  return (
    <NavLinkContext.Provider value={navLinks}>
      {children}
    </NavLinkContext.Provider>
  );
}

export const useNavLink = () => {
  return useContext(NavLinkContext);
};
