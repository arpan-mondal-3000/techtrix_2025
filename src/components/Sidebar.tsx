// Interface import
import { NavElements } from "@/lib";

// Library import
import { NavLink } from "react-router";

const Sidebar: React.FC<{ navElements: NavElements[] }> = ({ navElements }) => {
  return (
    <div className="w-64  bg-white shadow-lg rounded-r-xl flex flex-col dark:bg-slate-900">
      <ul className="flex flex-col space-y-1">
        {navElements.map((navElement: any, idx: any) => (
          <NavLink to={navElement.linkTo} key={idx} end>
            {({ isActive }) => (
              <li
                className={`flex gap-2 items-center p-4 mr-6 cursor-pointer rounded-r-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-white ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-white"
                    : ""
                }`}
              >
                {navElement.logo}
                {navElement.displayName}
              </li>
            )}
          </NavLink>
        ))}
      </ul>
      <div className="flex mt-auto mb-6">
        <button className="px-6 py-2 w-5/6 mx-auto bg-red-100 text-red-500 font-semibold rounded hover:bg-red-200">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
