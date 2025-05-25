import {
  ChevronUp,
  Home,
  Inbox,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Logo from '../../assets/logox.png';
// Menu items.
const items = [
  {
    id: 1,
    title: "Trang chủ",
    url: "/admin",
    icon: Home,
  },
  {
    id: 2,
    title: "Tạo bài viết",
    url: "/admin/draft",
    icon: Inbox,
  },

  {
    id: 3,
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(1);
  const { open } = useSidebar();
  const hideHeader = !open ? "hidden" : "auto";
  const navigate = useNavigate();
  return (
    <Sidebar collapsible="icon" className="overflow-clip">
      <SidebarHeader className="overflow-clip mt-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2 items-center">
              <img src={Logo} alt="" className="w-10" /> <h2 className={"text-2xl font-bold " + hideHeader}>CodeDump</h2>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="mt-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.id === selectedMenuItem} onClick={() => setSelectedMenuItem(item.id)}>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Admin
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={open ? "top" : "right"}
                className="w-[12rem]"
              >
                <DropdownMenuItem>
                  <span>Tài khoản</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <span>Thoát</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
