import { BellPlus, ChevronUp, Home, Inbox, User2 } from "lucide-react";

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
import { useEffect, useState } from "react";
import Logo from "../../assets/logox.png";
import { getAuth } from "firebase/auth";
import { Badge } from "../ui/badge";
import { countPendingPost } from "@/service/postService";
// import { useAppDispatch } from "@/store/hook";
// import { logout } from "@/reducer/authReducer";
// Menu items.

export function AdminSidebar() {
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>();
  const { open } = useSidebar();
  const hideHeader = !open ? "hidden" : "auto";
  const navigate = useNavigate();
  const auth = getAuth();
  const [countPP, setCountPP] = useState<Number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const count = await countPendingPost();
      setCountPP(count);
    };
    fetchData();
  }, []);
  // const dispatch = useAppDispatch();

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
      title: "Bài viết mới",
      url: "/admin/pending-post",
      icon: BellPlus,
      badge: countPP,
    },
  ];

  return (
    <Sidebar collapsible="icon" className="overflow-clip">
      <SidebarHeader className="overflow-clip mt-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2 items-center">
            <img src={Logo} alt="" className="w-10" />{" "}
            <h2 className={"text-2xl font-bold " + hideHeader}>CodeDump</h2>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="mt-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.id === selectedMenuItem}
                onClick={() => setSelectedMenuItem(item.id)}
              >
                <Link to={item.url} className="flex items-center">
                  <item.icon />
                  <span className="flex justify-between grow">
                    {item.title}{" "}
                    {item.badge && (
                      <Badge
                        variant={"destructive"}
                        className="rounded-full h-5 w-5"
                      >
                        {Number(item.badge)}
                      </Badge>
                    )}
                  </span>
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
                  <User2 /> {auth.currentUser?.email}
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
