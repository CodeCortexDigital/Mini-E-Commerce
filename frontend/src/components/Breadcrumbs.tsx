import { Link } from "react-router-dom";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.path && index < items.length - 1 ? (
            <Link
              to={item.path}
              className="text-gray-600 hover:text-black transition"
            >
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? "text-black font-semibold" : "text-gray-600"}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
