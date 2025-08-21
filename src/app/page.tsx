import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { OuroborosIcon } from '@/components/icons/OuroborosIcon';
import { PentagramIcon } from '@/components/icons/PentagramIcon';
import BackgroundFX from '@/components/BackgroundFX';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-grid-pattern flex flex-col items-center justify-center p-4">
      <BackgroundFX />
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-4xl">
        <div className="flex items-center justify-center space-x-4">
          <OuroborosIcon className="w-16 h-16 text-accent animate-spin-slow" />
          <h1 className="font-creepster text-7xl md:text-9xl tracking-wider text-spectral-gray-300 drop-shadow-[0_2px_2px_rgba(212,175,55,0.7)]">
            ACM
          </h1>
          <PentagramIcon className="w-16 h-16 text-accent animate-spin-slow-reverse" />
        </div>
        <h2 className="font-headline text-4xl md:text-6xl font-bold text-white tracking-tight -mt-4">
          Cryptic Coven
        </h2>
        <p className="font-body text-lg md:text-xl max-w-2xl text-slate-300">
          Unlock ancient algorithms and arcane data structures. A members-only challenge for the brightest minds at{' '}
          <span className="font-bold text-accent">ACM BITS Pilani, Dubai Campus</span>. Only the worthy may enter.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
          <Button asChild size="lg" className="font-headline bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-accent/40 transform hover:scale-105">
            <Link href="/login">Enter the Coven</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-headline border-accent/50 hover:bg-accent/10 hover:text-accent shadow-lg transition-all duration-300 hover:border-accent transform hover:scale-105">
            <Link href="/signup">Join the Ritual</Link>
          </Button>
        </div>
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-slate-500 z-10 font-roboto-mono">
        <p>A sacred digital space for ACM Members. All rights reserved.</p>
        <p>dubai.bits-pilani.ac.in</p>
      </footer>
    </main>
  );
}
