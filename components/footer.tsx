import Link from "next/link";
import { Linkedin, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <h3 className="font-semibold text-lg mb-3">Covenants PharmaChem LLP</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Expanding horizons in APIs, intermediates &amp; specialty chemicals—powered by our
              network, expertise and technology.
            </p>

            <div className="text-sm font-medium mb-2">Address</div>
            <div className="text-sm text-muted-foreground mb-5">
              {CONTACT.address}
            </div>

            <div className="text-sm font-medium mb-2">Contact</div>
            <div className="text-sm text-muted-foreground mb-6">
              <div>
                <Link href={CONTACT.telHrefs[0]} className="hover:text-foreground transition-colors">
                  {CONTACT.phones[0]}
                </Link>{" "}
                /{" "}
                <Link href={CONTACT.telHrefs[1]} className="hover:text-foreground transition-colors">
                  {CONTACT.phones[1]}
                </Link>
              </div>
              <div>
                <Link
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {CONTACT.email}
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={CONTACT.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#about" className="hover:text-foreground transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="#why" className="hover:text-foreground transition-colors">
                    Why Covenants?
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#services" className="hover:text-foreground transition-colors">
                    Services through network partners
                  </Link>
                </li>
                <li>
                  <Link href="#scm" className="hover:text-foreground transition-colors">
                    SCM services
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#products" className="hover:text-foreground transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="hover:text-foreground transition-colors">
                    Intermediate
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="hover:text-foreground transition-colors">
                    Speciality chemicals
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="hover:text-foreground transition-colors">
                    Impurities
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#contact" className="hover:text-foreground transition-colors">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-foreground transition-colors">
                    Let us connect!
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Covenants PharmaChem LLP All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

