import { sanityFetch } from "@/lib/sanity/fetch";
import { CONTACT_QUERY } from "@/lib/sanity/queries";
import type { ContactInfo } from "@/types";
import ContactSection from "@/components/ContactSection";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";

export const revalidate = 300;

export default async function ContactPage() {
  const { data: contact, error } =
    await sanityFetch<ContactInfo>(CONTACT_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Contact Us</h1>

      {error ? (
        <ErrorPlaceholder
          message="Contact information is temporarily unavailable"
          type="content"
        />
      ) : (
        <ContactSection contact={contact} />
      )}
    </div>
  );
}
