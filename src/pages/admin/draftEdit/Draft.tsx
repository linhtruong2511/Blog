import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../../components/ui/breadcrumb";
import DraftTable from "./DraftTable";


export default function Draft() {
  return (
    <>
      <header>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="border-r" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Bài viết gần đây</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Link to={"/admin/createblog"}>
            <Button variant={"default"}>Thêm bài viết mới</Button>
          </Link>
        </div>
      </header>

      <DraftTable />
      
    </>
  );
}
