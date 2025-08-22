import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";
import ContactSocial from "@/components/contact/contact-social";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Birds Eye Fashion",
  description: "Get in touch with Birds Eye Fashion. We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  keywords: "contact, birds eye fashion, customer service, support, get in touch",
  openGraph: {
    title: "Contact Us - Birds Eye Fashion",
    description: "Get in touch with Birds Eye Fashion. We'd love to hear from you.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-gray-600">
              Have questions about our products or services? We'd love to hear from you.
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>

          {/* Social Media Section */}
          <ContactSocial />
        </div>
      </div>
    </div>
  );
}