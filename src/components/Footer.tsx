import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/trips", label: "Trips" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Footer navigation" className="mb-6">
          <ul className="flex flex-wrap justify-center gap-6">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-center text-sm text-gray-400">
          &copy; {currentYear} Tourist. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
