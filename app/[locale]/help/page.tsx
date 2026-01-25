import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default async function HelpPage() {
  // Server-side logic to check files
  let fileStatus = {
    images: [] as string[],
    music: [] as string[],
    root: [] as string[]
  };

  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    if (fs.existsSync(imagesDir)) {
      fileStatus.images = fs.readdirSync(imagesDir);
    }
  } catch (e) {
    console.error(e);
  }

  try {
    const musicDir = path.join(process.cwd(), 'public', 'music');
    if (fs.existsSync(musicDir)) {
      fileStatus.music = fs.readdirSync(musicDir);
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8 font-sans pt-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-center border-b border-[var(--accent)] pb-6">
          <h1 className="text-4xl font-bold text-[var(--primary)] uppercase tracking-wider">Help & Documentation</h1>
          <Link href="/" className="text-[var(--accent)] hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>

        {/* Debug Section */}
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500 border-b border-red-900 pb-2">DEBUG: Server File Check</h2>
            <div className="bg-black/60 p-6 rounded border border-red-900/50 space-y-4 text-gray-300 font-mono text-sm">
                <p className="text-white font-sans">
                    This section lists the files actually present on the server. If your file is not listed here,
                    it means it was not successfully pushed to GitHub or deployed.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-white/10 p-4 rounded">
                        <h3 className="font-bold text-accent mb-2">public/images/ ({fileStatus.images.length})</h3>
                        {fileStatus.images.length > 0 ? (
                            <ul className="list-disc pl-4 space-y-1 text-green-400">
                                {fileStatus.images.map(f => (
                                    <li key={f}>{f}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-red-500">Directory empty or missing!</p>
                        )}
                    </div>

                    <div className="border border-white/10 p-4 rounded">
                        <h3 className="font-bold text-accent mb-2">public/music/ ({fileStatus.music.length})</h3>
                        {fileStatus.music.length > 0 ? (
                            <ul className="list-disc pl-4 space-y-1 text-green-400">
                                {fileStatus.music.map(f => (
                                    <li key={f}>{f}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-red-500">Directory empty or missing!</p>
                        )}
                    </div>
                </div>
            </div>
        </section>

        {/* Deployment Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--accent)]">1. Deployment Guide / Guide de Déploiement</h2>
          <div className="bg-black/40 p-6 rounded border border-[var(--accent)]/30 space-y-4 text-gray-300">
            <h3 className="text-xl font-semibold text-white">English</h3>
            <p><strong>Step 1: Push to GitHub</strong><br/>Ensure your code is pushed to a GitHub repository.</p>
            <p><strong>Step 2: Deploy on Vercel</strong><br/>
            1. Go to Vercel.com and sign up/log in.<br/>
            2. Click &quot;Add New...&quot; &gt; &quot;Project&quot;.<br/>
            3. Import your GitHub repository.<br/>
            4. Click &quot;Deploy&quot;.</p>
            <p><strong>Step 3: Connect Custom Domain (thug-angel.ch)</strong><br/>
            1. Once deployed, go to Settings &gt; Domains.<br/>
            2. Enter <code>thug-angel.ch</code> and click Add.<br/>
            3. Update your DNS records at your registrar as shown by Vercel.</p>

            <div className="border-t border-gray-700 my-4"></div>

            <h3 className="text-xl font-semibold text-white">Français</h3>
            <p><strong>Étape 1 : Pousser vers GitHub</strong><br/>Assurez-vous que votre code est sur un dépôt GitHub.</p>
            <p><strong>Étape 2 : Déployer sur Vercel</strong><br/>
            1. Allez sur Vercel.com.<br/>
            2. &quot;Add New...&quot; &gt; &quot;Project&quot;.<br/>
            3. Importez votre dépôt.<br/>
            4. Cliquez sur &quot;Deploy&quot;.</p>
            <p><strong>Étape 3 : Connecter le Domaine (thug-angel.ch)</strong><br/>
            1. Allez dans Settings &gt; Domains.<br/>
            2. Ajoutez <code>thug-angel.ch</code>.<br/>
            3. Mettez à jour vos DNS selon les instructions.</p>
          </div>
        </section>

        {/* Usage Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--accent)]">2. Media Files / Fichiers Média</h2>
          <div className="bg-black/40 p-6 rounded border border-[var(--accent)]/30 space-y-4 text-gray-300">
             <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded text-yellow-200 mb-4">
                <strong>Important:</strong> You must add these files manually to your <code>public/</code> folder!
             </div>

             <h3 className="text-lg font-semibold text-white">Music (11 Tracks)</h3>
             <p>Location: <code>public/music/</code></p>
             <ul className="list-disc pl-5 space-y-1 font-mono text-sm">
                <li>track_01.mp3</li>
                <li>track_02.mp3</li>
                <li>...</li>
                <li>track_11.mp3</li>
             </ul>

             <h3 className="text-lg font-semibold text-white mt-4">Gallery (12 Images)</h3>
             <p>Location: <code>public/images/</code></p>
             <p>Format: <strong>.png</strong></p>
             <ul className="list-disc pl-5 space-y-1 font-mono text-sm">
                <li>gallery_01.png</li>
                <li>gallery_02.png</li>
                <li>...</li>
                <li>gallery_12.png</li>
             </ul>

             <h3 className="text-lg font-semibold text-white mt-4">Artist Image</h3>
             <p>The Bio section uses <code>public/images/gallery_11.png</code>.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
