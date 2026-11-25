"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "./hero";
import Logo from "./logo";
import Workflow from "./workflow";
import TileScene from "./capability-tiles";
import CapabilityDialog from "./capability-dialog";
import Method from "./method";
import MegaMenu, { menuLabels, type MenuLabel } from "./nav-menu";

const products = [
  { id: "payments", title: "Turn website visitors and enquiries into qualified opportunities", name: "Customer Acquisition", detail: "Premium websites, landing pages, lead capture, inquiry management and conversion tracking, connected to the systems that follow up." },
  { id: "billing", title: "Answer every call and enquiry, and route it to the right place", name: "AI Front Office", detail: "AI receptionists, conversational assistants, missed-call recovery, customer communication, and inquiry classification and routing, with human escalation." },
  { id: "radar", title: "Run onboarding, scheduling and documents without the paperwork", name: "Business Operations", detail: "Workflow orchestration, scheduling, document processing, task management, customer onboarding and system integrations." },
  { id: "issuing", title: "Prepare quotations and invoices, and follow up on payments", name: "Financial Administration", detail: "Quotation workflows, invoice preparation, payment reminders, payment system integrations and reconciliation assistance, always within your approval rules." },
  { id: "crypto", title: "Keep customers informed and coming back", name: "Customer Experience", detail: "Automated follow-ups, appointment reminders, customer notifications, feedback collection and review requests." },
  { id: "connect", title: "See how your business is actually running", name: "Business Intelligence", detail: "Operational dashboards, performance reporting, plain-language business summaries, workflow monitoring and acquisition analytics." },
];
const brands = ["RFQ intake", "Quotation workflows", "Purchase orders", "Document extraction", "Dealer portals", "ERP and CRM sync", "AI receptionist", "Lead qualification", "Viewing scheduling", "WhatsApp, SMS and email", "Missed-call recovery", "Appointment reminders", "Digital intake forms", "Recall reminders", "Invoice workflows", "Review requests", "Dashboards", "Human approval"];

export function DemoDialog({ title, description, onClose }: { title: string; description: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="demo-dialog" onClose={onClose} onClick={event => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }} aria-labelledby="demo-dialog-title">
    <div className="dialog-inner">
      <button className="dialog-close" aria-label="Close dialog" autoFocus onClick={() => ref.current?.close()}>×</button>
      <h2 id="demo-dialog-title">{title}</h2>
      <p>{description}</p>
    </div>
  </dialog>;
}

export const demoText = "This is a demonstration site. Contact botLane to request an automation assessment for your business.";

// Announcement bar and navigation, shared by every page. Children render inside the hero shell, under the nav.
export function SiteHeader({ children, onDemo }: { children?: React.ReactNode; onDemo: (label: string) => void }) {
  const [announcement, setAnnouncement] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [menu, setMenu] = useState<MenuLabel | null>(null);
  const navigation = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const activeButton = useRef<HTMLButtonElement>(null);
  // Desktop: open on hover, with a short delay before closing so the pointer can travel into the panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canHover = () => matchMedia("(hover: hover) and (min-width: 901px)").matches;
  const hoverOpen = (label: MenuLabel) => { if (!canHover()) return; if (closeTimer.current) clearTimeout(closeTimer.current); setMenu(label); };
  const hoverClose = () => { if (!canHover()) return; if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setMenu(null), 160); };

  useEffect(() => {
    function closeOnOutside(event: PointerEvent) {
      if (event.target instanceof Node && !navigation.current?.contains(event.target)) {
        setMenu(null);
        setMobileMenu(false);
      }
    }
    window.addEventListener("pointerdown", closeOnOutside);
    return () => window.removeEventListener("pointerdown", closeOnOutside);
  }, []);

  return <>
    {announcement && <div className="announcement">
      <span>botLane is now a business automation company, starting with manufacturing, real estate and clinics. <button onClick={() => onDemo("Introducing the new botLane")}>Learn more ›</button></span>
      <button className="announcement-close" aria-label="Dismiss announcement" onClick={() => setAnnouncement(false)}>×</button>
    </div>}
    <div className="hero-shell" id="top">
      <header className="site-header" ref={navigation}
        onKeyDown={event => { if (event.key === "Escape") {
          if (menu) activeButton.current?.focus();
          else if (mobileMenu) menuButton.current?.focus();
          if (!menu) setMobileMenu(false);
          setMenu(null);
        } }}>
        <div className="frame navigation">
          <Logo href="/" size={42} />
          <button ref={menuButton} className="mobile-trigger" type="button" aria-label="Menu" aria-expanded={mobileMenu} aria-controls="main-nav" onClick={() => { setMobileMenu(!mobileMenu); setMenu(null); }}>
            <span aria-hidden="true">{mobileMenu ? "×" : "☰"}</span>
          </button>
          <nav id="main-nav" aria-label="Main navigation" className={mobileMenu ? "navlinks open" : "navlinks"}>
            {menuLabels.map(label => <div className="navitem" key={label} onMouseEnter={() => hoverOpen(label)} onMouseLeave={hoverClose}>
              <button type="button" ref={menu === label ? activeButton : null} aria-expanded={menu === label} onClick={() => setMenu(canHover() ? label : menu === label ? null : label)}>
                {label} <span className="chevron" aria-hidden="true" />
              </button>
              {menu === label && <MegaMenu label={label} onDemo={onDemo} onNavigate={() => { setMenu(null); setMobileMenu(false); }} />}
            </div>)}
            <a href="/blog" onClick={() => setMobileMenu(false)}>Insights</a>
            <div className="mobile-actions">
              <button onClick={() => onDemo("Explore automation")}>Explore automation</button>
            </div>
          </nav>
          <div className="header-actions">
            <button className="purple-button" onClick={() => onDemo("Explore automation")}>Explore automation <span aria-hidden="true">›</span></button>
          </div>
        </div>
      </header>
      {children}
    </div>
  </>;
}

export function useDemo() {
  const [dialog, setDialog] = useState<{ title: string; description: string } | null>(null);
  const open = (title: string, description = demoText) => setDialog({ title, description });
  const node = dialog && <DemoDialog title={dialog.title} description={dialog.description} onClose={() => setDialog(null)} />;
  return [open, node] as const;
}

export default function Top() {
  const [openDemo, dialog] = useDemo();
  return <>
    <SiteHeader onDemo={openDemo}>
      <Hero onDemo={openDemo} />
      <div className="brand-strip" aria-label="What botLane automates">
        <div className="brand-track">
          {[false, true].map(duplicate => <ul key={String(duplicate)} aria-hidden={duplicate}>
            {brands.map(brand => <li key={brand}>{brand}</li>)}
          </ul>)}
        </div>
      </div>
    </SiteHeader>
    {dialog}
  </>;
}

// The six reusable capabilities, the workflow demo and the implementation method.
export function Capabilities() {
  const [openDemo, dialog] = useDemo();
  const [cap, setCap] = useState<string | null>(null);
  return <>
    <section className="products frame" id="products">
      <h2>The automation capabilities behind every solution. <span>Six reusable building blocks, combined differently for each industry and each business. Websites and apps are part of them, not the product on their own.</span></h2>
      <div className="bento">
        {products.map(({ id, title, name, detail }) => <button type="button" key={id} id={id} className={"tile tile-" + id} aria-haspopup="dialog" onClick={() => setCap(id)}>
          <span className="tile-heading">{title}<span aria-hidden="true">↗</span></span>
          <span className="tile-art" aria-hidden="true"><TileScene id={id} /></span>
        </button>)}
      </div>
    </section>
    <Workflow />
    <Method />
    {cap && <CapabilityDialog id={cap} onClose={() => setCap(null)} onAssess={() => openDemo("Get an automation assessment")} />}
    {dialog}
  </>;
}
