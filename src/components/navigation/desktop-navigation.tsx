import { NavLink } from "@/components/navigation/nav-link";
import type { NavigationItem } from "@/config/navigation";

export function DesktopNavigation({ items }: { items: readonly NavigationItem[] }) {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {items.map((item) => (
          <li key={item.href}>
            <NavLink
              href={item.href}
              className="type-body inline-block border-b-2 border-transparent py-2 text-muted transition-colors duration-200 ease-standard hover:text-foreground"
              activeClassName="border-link font-semibold text-foreground"
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
