import { ContactInfo } from "@/types";

interface ContactSectionProps {
  contact?: ContactInfo | null;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  if (!contact) {
    return (
      <section className="rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-gray-500">
          Contact information is currently unavailable. Please try again later.
        </p>
      </section>
    );
  }

  const { phone, email, address, coordinates, label } = contact;
  const hasContent = phone || email || address;

  if (!hasContent) {
    return (
      <section className="rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-gray-500">
          Contact information is currently unavailable. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg bg-gray-50 p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">{label}</h2>

      <div className="space-y-3">
        {phone && (
          <div className="flex items-start gap-2">
            <span className="text-gray-400" aria-hidden="true">📞</span>
            <a
              href={`tel:${phone}`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {phone}
            </a>
          </div>
        )}

        {email && (
          <div className="flex items-start gap-2">
            <span className="text-gray-400" aria-hidden="true">✉️</span>
            <a
              href={`mailto:${email}`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {email}
            </a>
          </div>
        )}

        {address && (
          <div className="flex items-start gap-2">
            <span className="text-gray-400" aria-hidden="true">📍</span>
            <p className="whitespace-pre-line text-gray-700">{address}</p>
          </div>
        )}
      </div>

      {coordinates && (
        <div className="mt-6">
          <iframe
            title={`Map showing location of ${label}`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.01},${coordinates.lat - 0.01},${coordinates.lng + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`}
            className="h-64 w-full rounded-lg border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      )}
    </section>
  );
}
