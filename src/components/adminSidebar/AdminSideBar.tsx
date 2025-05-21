import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  ChevronUp,
  CreditCard,
  DoorClosed,
  Home,
  Inbox,
  LogOut,
  Settings,
  Sparkles,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Bài viết",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Tạo bài viết",
    url: "/admin/createblog",
    icon: Inbox,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const { open, isMobile } = useSidebar();
  const hideHeader = !open ? "opacity-0" : "opacity-100";
  const navigate = useNavigate();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="overflow-clip">
        <div className="mt-2">
          <h2
            className={
              "font-bold text-2xl transition-all text-nowrap " + hideHeader
            }
          >
            Admin Page
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
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
                className="w-60"
              >
                <DropdownMenuItem>
                  <span>Tài khoản</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <span>Thoát</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
