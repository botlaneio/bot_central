import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Automation for manufacturers | botLane",
  description: "From inquiry to order, intelligently connected. RFQ intake, quotation workflows, purchase order and document processing, dealer portals and ERP and CRM integrations for small and mid-sized manufacturers.",
};

export default function Page() { return <Content />; }
