import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
}

const SidebarLink = ({ href, children }: SidebarLinkProps) => {
  const currentPathname = usePathname();
  const parsedCurrentPathname = `/${currentPathname?.split("/")[1]}`;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center space-x-3 w-100 px-4 py-3 rounded-xl text-custom-white font-semibold  hover:bg-custom-white/30 hover:text-text-secondary transition duration-150 ${
          parsedCurrentPathname === href
            ? "bg-custom-white text-text-secondary hover:bg-custom-white/100"
            : ""
        }`}
      >
        <span>{children}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
