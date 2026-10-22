import { Logo } from "@/components/brand/Logo";
import { DesktopNav } from "./DesktopNav";
import { HeaderCtas } from "./HeaderCtas";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50">
      <nav aria-label="Primary" className="container-x flex h-[var(--header-h)] items-center justify-between gap-4 wide:gap-6">
        <Logo className="shrink-0" />
        <div className="hidden shrink-0 xl:block">
          <DesktopNav />
        </div>
        <div className="hidden shrink-0 xl:block">
          <HeaderCtas />
        </div>
        <div className="xl:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
