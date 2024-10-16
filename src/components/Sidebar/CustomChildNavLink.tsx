import {NavLink} from "react-router-dom";

interface CustomChildNavLinkProps {
  title: string;
  to: string;
  // icon: string;
}

const CustomChildNavLink = ({
  title,
  to,
  // icon,
}: CustomChildNavLinkProps) => {

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
          (isActive && '!text-white')
        }
      >
        {title}
      </NavLink>
    </li>
  );
};

export default CustomChildNavLink;
