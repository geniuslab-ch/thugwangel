import Hero from '@/components/Hero';
import Bio from '@/components/Bio';
import Music from '@/components/Music';
import Videos from '@/components/Videos';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Bio />
      <Music />
      <Videos />
      <Gallery />
      <Contact />
    </main>
  );
}
