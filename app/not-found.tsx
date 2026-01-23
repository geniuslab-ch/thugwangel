import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div className="bg-black text-white min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
            <h1 className="text-6xl font-bold text-burgundy">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found / Page Non Trouvée</h2>
            <p className="text-gray-400">
              The page you are looking for does not exist.
            </p>
            <p className="text-gray-500 text-sm italic">
              La page que vous recherchez n'existe pas.
            </p>

            <div className="pt-8">
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-burgundy hover:bg-red-900 text-white rounded-full transition-colors duration-300 font-medium"
              >
                Return Home / Retour à l'accueil
              </Link>
            </div>
        </div>
    </div>
  );
}
