import Link from "next/link";
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Covenants PharmaChem LLP</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner for pharmaceutical chemicals, intermediates, and supply chain solutions.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/company/covenants-pharmachem"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#services" className="hover:text-foreground transition-colors">Contract Manufacturing</Link></li>
              <li><Link href="#services" className="hover:text-foreground transition-colors">Custom Research</Link></li>
              <li><Link href="#services" className="hover:text-foreground transition-colors">Supply Chain</Link></li>
              <li><Link href="#products" className="hover:text-foreground transition-colors">Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#network" className="hover:text-foreground transition-colors">Network Partners</Link></li>
              <li><Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Covenants PharmaChem LLP. All rights reserved.</p>
            <p className="text-xs">
              A-209, Bhaveshwar Arcade, LBS Marg, Ghatkopar (West), Mumbai - 400086
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

