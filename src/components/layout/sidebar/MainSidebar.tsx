import clsx from "clsx";
import Link from "next/link";
import SidebarCat from "@/components/svg/SidebarCat";
import SidebarDog from "@/components/svg/SidebarDog";
import SidebarMask from "@/components/svg/SidebarMask";
import SidebarRodent from "@/components/svg/SidebarRodent";
import "./main-sidebar.css";

type MainSidebarProp = {
  isSideBarOpen: boolean;
};

const MainSidebar = ({ isSideBarOpen }: MainSidebarProp) => {
  return (
    <nav>
      <div className={clsx("menu-col", isSideBarOpen && "in")}>
        <div className="menu-col-con">
          <div className="menu-con">
            <div className="row menu-pr-row">
              <div className="menu-pr-col">
                <div className="pr-char pr-dog">
                  <Link href="/dog/all/">
                    <SidebarDog />
                    <div className="head">محصولات سگ</div>
                  </Link>
                </div>
              </div>
              <div className="menu-pr-col">
                <div className="pr-char pr-cat">
                  <Link href="/cat/all/">
                    <SidebarCat />
                    <div className="head">محصولات گربه</div>
                  </Link>
                </div>
              </div>
              <div className="menu-pr-col">
                <div className="pr-char pr-rabbit">
                  <Link href="/rodent/all/">
                    <SidebarRodent />
                    <div className="head">محصولات جوندگان</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row menu-bottom-row">
              <ul>
                <li>
                  <Link href="/about/">درباره‌ی دودوتی</Link>
                </li>
                <li>
                  <Link href="/contact/">تماس با ما</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <SidebarMask />
      </div>
    </nav>
  );
};

export default MainSidebar;
