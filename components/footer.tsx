import Link from "next/link";
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <h3 className="font-semibold text-lg mb-3">Covenants PharmaChem</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Integrating scientific research, precision manufacturing, and digital technology to
              redefine specialty chemicals.
            </p>

            <div className="text-sm font-medium mb-2">Certified</div>
            <div className="flex flex-wrap gap-2 mb-6">
              {["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "ISO 27001:2022"].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-muted/30"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/company/covenants-pharmachem"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:info@scimplify.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors self-center"
              >
                info@scimplify.com
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium mb-4">Industries</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#industries" className="hover:text-foreground transition-colors">
                    Pharmaceutical
                  </Link>
                </li>
                <li>
                  <Link href="#industries" className="hover:text-foreground transition-colors">
                    Agrochemicals
                  </Link>
                </li>
                <li>
                  <Link href="#industries" className="hover:text-foreground transition-colors">
                    Flavors &amp; Fragrances
                  </Link>
                </li>
                <li>
                  <Link href="#industries" className="hover:text-foreground transition-colors">
                    Industrial Chemicals
                  </Link>
                </li>
                <li>
                  <Link href="#industries" className="hover:text-foreground transition-colors">
                    Beauty &amp; Personal Care
                  </Link>
                </li>
                <li>
                  <Link href="#industries" className="hover:text-foreground transition-colors">
                    Food &amp; Nutrition
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#manufacturing" className="hover:text-foreground transition-colors">
                    CMO
                  </Link>
                </li>
                <li>
                  <Link href="#rd" className="hover:text-foreground transition-colors">
                    CRO
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#resources" className="hover:text-foreground transition-colors">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="#resources" className="hover:text-foreground transition-colors">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#atoms" className="hover:text-foreground transition-colors">
                    ATOMS
                  </Link>
                </li>
                <li>
                  <Link href="#partner" className="hover:text-foreground transition-colors">
                    Partner with us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Covenants PharmaChem. All rights reserved.</p>
            <div className="text-xs">
              <div>COCREATE GLOBAL TECHNOLOGIES PRIVATE LIMITED (CIN: U21009KA2023PTC179006)</div>
              <div>2nd Floor, FFK Tower, 445, 17th Cross Rd, Sector 4, HSR Layout, Bengaluru, Karnataka 560102</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

