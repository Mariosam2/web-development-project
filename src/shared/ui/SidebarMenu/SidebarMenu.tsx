import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./SidebarMenu.css";
import { ArrowRight } from "../ArrowRight";
import gsap from "gsap";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "Home", target: "hero" },
  { label: "About", target: "about" },
  { label: "Contact", target: "contacts" },
];

export const SidebarMenu = ({ isOpen, onClose }: SidebarMenuProps) => {
  const navigate = useNavigate();

  const onGetStarted = () => {
    onClose();
    navigate("/login");
  };
  const scrollToSection = (targetId: string) => {
    onClose();
    setTimeout(() => {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: `#${targetId}`,
        ease: "power2.inOut",
      });
    }, 300);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className={`sidebar-menu__backdrop ${isOpen ? "open" : ""}`} onClick={onClose} />

      <aside className={`sidebar-menu ${isOpen ? "open" : ""}`}>
        <button className="sidebar-menu__close" onClick={onClose}>
          <span />
          <span />
        </button>

        <nav className="sidebar-menu__nav">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.target}
              className="sidebar-menu__link"
              style={{ transitionDelay: isOpen ? `${150 + i * 75}ms` : "0ms" }}
              onClick={() => scrollToSection(item.target)}>
              <span className="sidebar-menu__link-index font-gibed">0{i + 1}</span>
              <span className="sidebar-menu__link-label font-gibed">{item.label}</span>
              <ArrowRight className="sidebar-menu__link-arrow" />
            </button>
          ))}
        </nav>

        <div
          className="sidebar-menu__cta-wrapper mx-auto"
          style={{ transitionDelay: isOpen ? `${150 + NAV_ITEMS.length * 75}ms` : "0ms" }}>
          <button className="sidebar-menu__cta" onClick={onGetStarted}>
            Get started
            <ArrowRight className="size-5" />
          </button>
        </div>

        <p
          className="sidebar-menu__footer mt-4 mx-auto"
          style={{ transitionDelay: isOpen ? `${200 + NAV_ITEMS.length * 75}ms` : "0ms" }}>
          © 2026 ManMot
        </p>
      </aside>
    </>
  );
};
