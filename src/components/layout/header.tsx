import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { navigationCta, primaryNavigation } from "@/config/navigation";

/**
 * Global header (server-rendered). Pages with a full-bleed dark hero opt into
 * the transparent overlay look by rendering any element with
 * `data-header="overlay"`; see `.site-header` in globals.css.
 */
export function Header() {
  return (
    <header className="site-header">
      <Container className="flex h-16 items-center justify-between gap-8 lg:h-18">
        <Logo />
        <DesktopNavigation items={primaryNavigation} />
        <div className="flex items-center">
          <div className="hidden lg:block">
            <ButtonLink href={navigationCta.href}>{navigationCta.label}</ButtonLink>
          </div>
          <MobileNavigation items={primaryNavigation} cta={navigationCta} />
        </div>
      </Container>
    </header>
  );
}
