import { Link } from "react-router";

import { MENU_SIDEBAR } from "../../utils/constanst";

const Sidebar = () => {
  return (
    <div className="w-xs fixed left-0 top-0 bottom-0 pt-[70px] border-r border-gray-200 shadow-xl">
      <div className="px-5">
        {MENU_SIDEBAR.map((itemParent, indexParent) => (
          <div key={indexParent}>
            <div className="font-bold mt-5 mb-5" key={indexParent}>
              {itemParent.name}
            </div>
            {itemParent.sidebarItem.map((itemChild, indexChild) => (
              <li
                key={indexChild}
                className="hover:bg-gray-100 p-2 rounded cursor-pointer text-base"
              >
                <Link to={itemChild.path} className="flex items-center gap-3">
                  <span>{itemChild.icon}</span>
                  <span className="flex-1">{itemChild.text}</span>
                </Link>
              </li>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
