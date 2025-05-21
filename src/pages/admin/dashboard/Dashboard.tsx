import { Link } from "react-router-dom";
import BLogPostList from "./BlogPostList";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Dashboard() {
  return (
    <>
      <header>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="border-r" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Trang chủ</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Link to={"/admin/createblog"}>
            <Button variant={"default"}>Thêm bài viết</Button>
          </Link>
        </div>
      </header>

      <div className="bg-gray-100 min-h-full p-5 rounded-xl">
        <BLogPostList />
      </div>
    </>
  );
}
