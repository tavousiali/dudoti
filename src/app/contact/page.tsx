import { Metadata } from "next";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "تماس با ما | دودوتی",
  alternates: {
    canonical: "https://dudoti.com/contact/",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
