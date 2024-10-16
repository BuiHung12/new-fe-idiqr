import {NavLink} from "react-router-dom";
import {ReactNode} from "react";

interface CustomNavLinkProps {
  title: string;
  to: string;
  visible: boolean;
  icon: ReactNode;
}

const CustomNavLink = ({
  title,
  to,
  visible,
  icon,
}: CustomNavLinkProps) => {

  return (
    <li>
      <NavLink
        to={to}
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          visible && 'bg-graydark dark:bg-meta-4'
        }`}
      >
        {icon}
        {title}
      </NavLink>
    </li>
  );
};

export default CustomNavLink;
