import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="text-center max-w-md">
        <p className="text-6xl font-display font-bold gradient-text">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-hope-900">
          Page Not Found
        </h1>
        <p className="mt-2 text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="inline-block mt-8">
          <Button variant="gold">Return Home</Button>
        </Link>
      </div>
    </section>
  );
}
