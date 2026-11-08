import { useEffect, useState } from "react";
import { DOCS } from "@/data";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Prices from "@/components/Prices";
import Clinic from "@/components/Clinic";
import Patients from "@/components/Patients";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import { BackToTop, CookieBanner, LegalModal } from "@/components/Overlays";

export default function App() {
  const [docId, setDocId] = useState<string | null>(null);
  const [bookingService, setBookingService] = useState<string | null>(null);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = Boolean(localStorage.getItem("inlight-cookie"));
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    const t = window.setTimeout(() => setCookieOpen(true), 1600);
    return () => window.clearTimeout(t);
  }, []);

  const closeCookie = (choice: "all" | "necessary") => {
    try {
      localStorage.setItem("inlight-cookie", choice);
    } catch {
      /* приватный режим — баннер просто закрывается */
    }
    setCookieOpen(false);
  };

  const openDoc = (id: string) => setDocId(id);
  const doc = docId ? (DOCS.find((d) => d.id === docId) ?? null) : null;

  return (
    <div className="min-h-screen">
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[95] focus:rounded-full focus:bg-olive focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-cream"
      >
        К содержанию
      </a>

      <Header />
      <main>
        <Hero />
        <Services onBook={setBookingService} />
        <Prices onBook={setBookingService} />
        <Clinic />
        <Patients openDoc={openDoc} />
        <Booking prefill={bookingService} openDoc={openDoc} />
      </main>
      <Footer openDoc={openDoc} />

      {doc && <LegalModal doc={doc} onClose={() => setDocId(null)} />}
      {cookieOpen && <CookieBanner onClose={closeCookie} openDoc={openDoc} />}
      <BackToTop hidden={cookieOpen} />
    </div>
  );
}