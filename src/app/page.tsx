import Image from "next/image";
import Link from "next/link";
import FreelancersList from "@/components/FreelancersList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header/Navigation */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-indigo-600">Einsatz</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="font-medium text-indigo-600">Home</Link>
            <Link href="/freelancers" className="font-medium hover:text-indigo-600">Medewerkers Zoeken</Link>
            <Link href="/categories" className="font-medium hover:text-indigo-600">Beroepen</Link>
            <Link href="/how-it-works" className="font-medium hover:text-indigo-600">Hoe Werkt Het</Link>
          </nav>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-full">Inloggen</button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full">Aanmelden</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full mb-4">Urgente Hulp Nodig?</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Vind Direct Beschikbare Werkkrachten
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Dringend personeel nodig? Einsatz verbindt bedrijven met betrouwbare en direct beschikbare medewerkers voor fysiek werk op locatie
          </p>
          
          {/* Quick Search Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Waar heb je hulp nodig?</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <select 
                      className="block w-full pl-10 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                               backgroundPosition: "right 0.5rem center", 
                               backgroundRepeat: "no-repeat", 
                               backgroundSize: "1.5em 1.5em" 
                             }}
                    >
                      <option>Kies locatie</option>
                      <option>Amsterdam</option>
                      <option>Rotterdam</option>
                      <option>Utrecht</option>
                      <option>Den Haag</option>
                      <option>Eindhoven</option>
                    </select>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <select 
                      className="block w-full pl-10 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                               backgroundPosition: "right 0.5rem center", 
                               backgroundRepeat: "no-repeat", 
                               backgroundSize: "1.5em 1.5em" 
                             }}
                      defaultValue="25 km"
                    >
                      <option>Straal</option>
                      <option>5 km</option>
                      <option>10 km</option>
                      <option>15 km</option>
                      <option>25 km</option>
                      <option>50 km</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Wat voor werk?</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <select 
                    className="block w-full pl-10 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                             backgroundPosition: "right 0.5rem center", 
                             backgroundRepeat: "no-repeat", 
                             backgroundSize: "1.5em 1.5em" 
                           }}
                  >
                    <option>Alle beroepen</option>
                    <option>Horeca</option>
                    <option>Bouw</option>
                    <option>Magazijn</option>
                    <option>Schoonmaak</option>
                    <option>Retail</option>
                    <option>Productie</option>
                    <option>Transport</option>
                    <option>Algemeen Werk</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Wanneer nodig?</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <select 
                    className="block w-full pl-10 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                             backgroundPosition: "right 0.5rem center", 
                             backgroundRepeat: "no-repeat", 
                             backgroundSize: "1.5em 1.5em" 
                           }}
                  >
                    <option>Alle beschikbaarheid</option>
                    <option>Vandaag</option>
                    <option>Morgen</option>
                    <option>Deze week</option>
                    <option>Volgende week</option>
                  </select>
                </div>
              </div>
            </div>
            <Link 
              href="/freelancers" 
              className="w-full md:w-auto px-6 py-3.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 inline-flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Zoek Beschikbare Werkkrachten
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/freelancers" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700">
              Direct Medewerkers Vinden
            </Link>
            <Link href="/register/freelancer" className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-full hover:bg-indigo-50">
              Beschikbaar Voor Werk
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Freelancers Section with Infinite Scrolling */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Direct Beschikbare Werkkrachten</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bekijk werkkrachten die deze week nog beschikbaar zijn voor uw bedrijf. Filter op locatie, vaardigheden en beschikbaarheid. Scroll om meer te laden.
          </p>
        </div>
        
        <FreelancersList />
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Populaire Beroepen</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Horeca", icon: "🍽️", slug: "horeca" },
            { name: "Bouw", icon: "🏗️", slug: "bouw" },
            { name: "Magazijn", icon: "📦", slug: "magazijn" },
            { name: "Schoonmaak", icon: "🧹", slug: "schoonmaak" },
            { name: "Retail", icon: "🛒", slug: "retail" },
            { name: "Productie", icon: "🏭", slug: "productie" },
            { name: "Transport", icon: "🚚", slug: "transport" },
            { name: "Algemeen Werk", icon: "💪", slug: "algemeen-werk" },
          ].map((category, index) => (
            <Link 
              href={`/freelancers?beroep=${category.slug}`} 
              key={index} 
              className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all hover:border-indigo-200 hover:bg-indigo-50/30 group"
            >
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</span>
              <h3 className="font-medium text-center group-hover:text-indigo-600 transition-colors">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Hoe Werkt Het</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mb-4">1</div>
            <h3 className="text-xl font-medium mb-2">Plaats een aanvraag</h3>
            <p className="text-gray-600">Beschrijf wat u nodig heeft, wanneer en waar, en hoeveel u betaalt</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mb-4">2</div>
            <h3 className="text-xl font-medium mb-2">Krijg direct reacties</h3>
            <p className="text-gray-600">Bekijk profielen van beschikbare werkkrachten en kies de beste match</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mb-4">3</div>
            <h3 className="text-xl font-medium mb-2">Werk samen op locatie</h3>
            <p className="text-gray-600">Bevestig aankomst, voltooi het werk en betaal veilig via ons platform</p>
          </div>
        </div>
      </section>

      {/* Testimonial/Trust Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Vertrouwd door Ondernemers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Duizenden bedrijven vinden dagelijks direct beschikbaar personeel via Einsatz
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-medium">Jan Peters</h4>
                <p className="text-sm text-gray-600">Restaurant Eigenaar</p>
              </div>
            </div>
            <p className="text-gray-700">"Toen mijn kok onverwacht ziek werd, had ik binnen 3 uur een vervangende kok via Einsatz. De volgende dag was die er weer. Ongelooflijke service!"</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-medium">Annemarie de Jong</h4>
                <p className="text-sm text-gray-600">Logistiek Manager</p>
              </div>
            </div>
            <p className="text-gray-700">"Tijdens onze piekperiode hadden we plotseling extra magazijnmedewerkers nodig. Via Einsatz vonden we binnen een dag 5 mensen die direct konden beginnen."</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-medium">Bart Visser</h4>
                <p className="text-sm text-gray-600">Bouwbedrijf</p>
              </div>
            </div>
            <p className="text-gray-700">"Wat me verraste was de kwaliteit van de werkkrachten. We vonden iemand die niet alleen sterk was, maar ook ervaring had met precies het type werk dat we nodig hadden."</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Einsatz</h3>
              <p className="text-gray-400">Direct beschikbare werkkrachten voor urgente in-person opdrachten en fysiek werk op locatie.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Voor Bedrijven</h4>
              <ul className="space-y-2">
                <li><Link href="/freelancers" className="text-gray-400 hover:text-white">Medewerkers Zoeken</Link></li>
                <li><Link href="/how-it-works" className="text-gray-400 hover:text-white">Hoe Werkt Het</Link></li>
                <li><Link href="/testimonials" className="text-gray-400 hover:text-white">Succesverhalen</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Voor Werkkrachten</h4>
              <ul className="space-y-2">
                <li><Link href="/register/freelancer" className="text-gray-400 hover:text-white">Beschikbaar Voor Werk</Link></li>
                <li><Link href="/freelancer-guide" className="text-gray-400 hover:text-white">Werknemer Gids</Link></li>
                <li><Link href="/community" className="text-gray-400 hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Bedrijf</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Over Ons</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Einsatz. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}