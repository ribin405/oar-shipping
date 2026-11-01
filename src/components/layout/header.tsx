import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { navigationCta, primaryNavigation } from "@/config/navigation";

/**
 * Global header (server-rendered): a floating frosted pill that stays pinned to
 * the top of the viewport while scrolling. See header.css.
 */
export function Header() {
  return (
    <header className="site-header">
      <Container>
        <div className="site-header__bar">
          <Logo />
          <DesktopNavigation items={primaryNavigation} />
          <div className="flex items-center">
            <div className="hidden lg:block">
              <ButtonLink href={navigationCta.href}>{navigationCta.label}</ButtonLink>
            </div>
            <MobileNavigation items={primaryNavigation} cta={navigationCta} />
          </div>
        </div>
      </Container>
    </header>
  );
}
