import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/iciso-logo.png" alt="ICISO Logo" width={200} height={60} className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#opportunities" className="text-foreground hover:text-primary transition-colors">
              Opportunities
            </a>
            <a href="#organizations" className="text-foreground hover:text-primary transition-colors">
              Organizations
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline">Sign In</Button>
            <Button>Join as Organization</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
