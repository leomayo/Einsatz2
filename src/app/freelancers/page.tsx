import Link from "next/link";

// Mock data for freelancers - in a real app, this would come from a database
const FREELANCERS = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Webontwikkelaar",
    hourlyRate: 65,
    rating: 4.9,
    reviews: 37,
    completedJobs: 42,
    location: "Amsterdam, NL",
    availability: "Beschikbaar volgende week",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    categories: ["Technologie", "Webontwikkeling"],
    tags: ["React", "Node.js", "JavaScript"]
  },
  {
    id: "2",
    name: "Samantha Lee",
    title: "Grafisch Ontwerper",
    hourlyRate: 55,
    rating: 4.8,
    reviews: 23,
    completedJobs: 31,
    location: "Rotterdam, NL",
    availability: "Morgen beschikbaar",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    categories: ["Ontwerp", "Marketing"],
    tags: ["Branding", "Logo's", "Illustratie"]
  },
  {
    id: "3",
    name: "Michael Carter",
    title: "Bedrijfsadviseur",
    hourlyRate: 90,
    rating: 5.0,
    reviews: 18,
    completedJobs: 22,
    location: "Utrecht, NL",
    availability: "Beschikbaar volgende maand",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    categories: ["Bedrijf", "Advies"],
    tags: ["Strategie", "Marketing", "Financiën"]
  },
  {
    id: "4",
    name: "Jessica Wong",
    title: "Social Media Manager",
    hourlyRate: 45,
    rating: 4.7,
    reviews: 41,
    completedJobs: 57,
    location: "Den Haag, NL",
    availability: "Nu beschikbaar",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    categories: ["Marketing", "Social Media"],
    tags: ["Instagram", "TikTok", "Content Creatie"]
  },
];

// Updated worker data with job categories
const WORKERS = [
  {
    id: 1,
    name: "Alex de Vries",
    title: "Allround Horeca Medewerker",
    hourlyRate: 16,
    rating: 4.9,
    reviews: 37,
    location: "Amsterdam, NL",
    workRadius: 25,
    availableFrom: "Vandaag",
    tags: ["Bediening", "Bar", "Keukenhulp"],
    otherSkills: ["Fysiek sterk", "Snel lerend"],
    category: "horeca" // Added category that matches URL parameter
  },
  {
    id: 2,
    name: "Samantha Jansen",
    title: "Magazijnmedewerker / Productie",
    hourlyRate: 14,
    rating: 4.8,
    reviews: 23,
    location: "Rotterdam, NL",
    workRadius: 15,
    availableFrom: "Morgen",
    tags: ["Orderpicken", "Inpakken", "Heftruck"],
    otherSkills: ["Beschikbaar voor avondwerk"],
    category: "magazijn"
  },
  {
    id: 3,
    name: "Michael Bakker",
    title: "Bouwvakker / Algemeen Werknemer",
    hourlyRate: 18,
    rating: 5.0,
    reviews: 18,
    location: "Utrecht, NL",
    workRadius: 50,
    availableFrom: "Deze week",
    tags: ["Timmerman", "Schilderwerk", "Sjouwwerk"],
    otherSkills: ["Eigen vervoer", "VCA certificaat"],
    category: "bouw"
  },
  {
    id: 4,
    name: "Jessica Smit",
    title: "Allrounder - Algemeen Werk",
    hourlyRate: 13,
    rating: 4.7,
    reviews: 41,
    location: "Den Haag, NL",
    workRadius: 30,
    availableFrom: "Vandaag",
    tags: ["Fysiek werk", "Leergierig", "Flexibel"],
    otherSkills: ["Werkt graag buiten", "Bereid alles te leren"],
    category: "algemeen-werk"
  },
  {
    id: 5,
    name: "Daan Visser",
    title: "Schoonmaker",
    hourlyRate: 15,
    rating: 4.5,
    reviews: 28,
    location: "Eindhoven, NL",
    workRadius: 40,
    availableFrom: "Deze week",
    tags: ["Kantoorschoonmaak", "Glazenwasser", "Vloerreiniging"],
    otherSkills: ["Eigen vervoer", "Avondwerk mogelijk"],
    category: "schoonmaak"
  },
  {
    id: 6,
    name: "Emma Vermeulen",
    title: "Retail Medewerker",
    hourlyRate: 14,
    rating: 4.6,
    reviews: 19,
    location: "Amsterdam, NL",
    workRadius: 20,
    availableFrom: "Morgen",
    tags: ["Kassa", "Verkoop", "Klantenservice"],
    otherSkills: ["Representatief", "Ervaring met kassasystemen"],
    category: "retail"
  },
  {
    id: 7,
    name: "Thomas de Jong",
    title: "Productiemedewerker",
    hourlyRate: 15,
    rating: 4.3,
    reviews: 12,
    location: "Rotterdam, NL",
    workRadius: 30,
    availableFrom: "Deze week",
    tags: ["Inpakken", "Assemblage", "Kwaliteitscontrole"],
    otherSkills: ["Heftruckcertificaat", "Ervaring met lopende band"],
    category: "productie"
  },
  {
    id: 8,
    name: "Lars Peeters",
    title: "Transportmedewerker / Chauffeur",
    hourlyRate: 17,
    rating: 4.8,
    reviews: 24,
    location: "Utrecht, NL",
    workRadius: 60,
    availableFrom: "Vandaag",
    tags: ["Bezorging", "Rijbewijs B", "Logistiek"],
    otherSkills: ["Eigen auto", "Routekennis", "Klantgericht"],
    category: "transport"
  }
];

// Categories for filter sidebar
const CATEGORIES = [
  { name: "Technologie", count: 124 },
  { name: "Ontwerp", count: 86 },
  { name: "Marketing", count: 78 },
  { name: "Bedrijf", count: 53 },
  { name: "Schrijven", count: 42 },
  { name: "Juridisch", count: 21 },
  { name: "Boekhouding", count: 19 },
];

// Map a job category to its Dutch name (for display purposes)
const categoryNameMap: Record<string, string> = {
  'horeca': 'Horeca',
  'bouw': 'Bouw',
  'magazijn': 'Magazijn',
  'schoonmaak': 'Schoonmaak',
  'retail': 'Retail',
  'productie': 'Productie',
  'transport': 'Transport',
  'algemeen-werk': 'Algemeen Werk'
};

// This is a Next.js Server Component that receives search params
export default function FreelancersPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  // Read the 'beroep' query parameter from the URL
  const beroepFilter = typeof searchParams?.beroep === 'string' ? searchParams.beroep : null;
  
  // Filter workers based on the category if a filter is specified
  const filteredWorkers = beroepFilter 
    ? WORKERS.filter(worker => worker.category === beroepFilter)
    : WORKERS;
    
  const resultCount = filteredWorkers.length;
  
  // Get the display name for the filtered category (if any)
  const categoryDisplayName = beroepFilter && categoryNameMap[beroepFilter] ? categoryNameMap[beroepFilter] : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-indigo-600">Einsatz</Link>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="font-medium hover:text-indigo-600">Home</Link>
            <Link href="/freelancers" className="font-medium text-indigo-600">Medewerkers Zoeken</Link>
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
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {beroepFilter 
                ? `${categoryDisplayName} Werkkrachten` 
                : 'Vind Direct Beschikbare Werkkrachten'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {beroepFilter 
                ? `Bekijk alle beschikbare ${categoryDisplayName.toLowerCase()} medewerkers die direct aan de slag kunnen` 
                : 'Zoek door duizenden werkkrachten die deze week nog beschikbaar zijn voor fysiek werk op locatie'}
            </p>
            
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <form action="/freelancers" method="GET">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Locatie & Straal</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <select 
                          name="locatie"
                          className="block w-full pl-10 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
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
                          <option>Groningen</option>
                          <option>Nijmegen</option>
                          <option>Haarlem</option>
                        </select>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <select 
                          name="straal"
                          className="block w-full pl-10 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
                          style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                                   backgroundPosition: "right 0.5rem center", 
                                   backgroundRepeat: "no-repeat", 
                                   backgroundSize: "1.5em 1.5em" 
                                 }}
                        >
                          <option>Straal</option>
                          <option value="5">5 km</option>
                          <option value="10">10 km</option>
                          <option value="15">15 km</option>
                          <option value="25">25 km</option>
                          <option value="50">50 km</option>
                          <option value="75">75 km</option>
                          <option value="100">100 km</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Beroep</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <select 
                        name="beroep"
                        className="block w-full pl-10 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                                 backgroundPosition: "right 0.5rem center", 
                                 backgroundRepeat: "no-repeat", 
                                 backgroundSize: "1.5em 1.5em" 
                               }}
                        defaultValue={beroepFilter || ""}
                      >
                        <option value="">Alle beroepen</option>
                        <option value="horeca">Horeca</option>
                        <option value="bouw">Bouw</option>
                        <option value="magazijn">Magazijn</option>
                        <option value="schoonmaak">Schoonmaak</option>
                        <option value="retail">Retail</option>
                        <option value="productie">Productie</option>
                        <option value="transport">Transport</option>
                        <option value="algemeen-werk">Algemeen Werk</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Beschikbaarheid</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <select 
                        name="beschikbaarheid"
                        className="block w-full pl-10 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                                 backgroundPosition: "right 0.5rem center", 
                                 backgroundRepeat: "no-repeat", 
                                 backgroundSize: "1.5em 1.5em" 
                               }}
                      >
                        <option value="">Alle beschikbaarheid</option>
                        <option value="vandaag">Vandaag</option>
                        <option value="morgen">Morgen</option>
                        <option value="deze-week">Deze week</option>
                        <option value="volgende-week">Volgende week</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    type="submit"
                    className="bg-indigo-600 text-white rounded-lg px-6 py-2.5 hover:bg-indigo-700 transition-colors shadow-sm hover:shadow inline-flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Zoeken
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="font-medium mb-4">Uurloon</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Tot €12/uur</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>€12 - €15/uur</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>€15 - €18/uur</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>€18 - €20/uur</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Boven €20/uur</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Beschikbaarheid</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Vandaag</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Morgen</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Deze week</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Volgende week</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Werkgebied</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1.5">Locatie</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <select 
                      className="block w-full pl-8 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md shadow-sm appearance-none bg-white"
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
                      <option>Groningen</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Straal (km)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <select 
                      className="block w-full pl-8 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md shadow-sm appearance-none bg-white"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                               backgroundPosition: "right 0.5rem center", 
                               backgroundRepeat: "no-repeat", 
                               backgroundSize: "1.5em 1.5em" 
                             }}
                      defaultValue="50 km"
                    >
                      <option>5 km</option>
                      <option>10 km</option>
                      <option>15 km</option>
                      <option>25 km</option>
                      <option>50 km</option>
                      <option>75 km</option>
                      <option>100 km</option>
                    </select>
                  </div>
                </div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2 focus:ring-indigo-500 h-4 w-4" />
                  <span>Alleen met eigen vervoer</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Extra vaardigheden</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Eigen vervoer</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>VCA certificaat</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>HACCP</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Fysiek sterk</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Avondwerk mogelijk</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Weekendwerk mogelijk</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600 mr-2" />
                  <span>Algemeen werk</span>
                </label>
              </div>
            </div>

            {/* Sidebar Job Categories section */}
            <div>
              <h3 className="font-medium mb-4">Beroepen</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 mr-2" 
                    checked={beroepFilter === 'horeca'} 
                    readOnly
                  />
                  <span className={beroepFilter === 'horeca' ? 'font-medium text-indigo-600' : ''}>
                    Horeca
                  </span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 mr-2" 
                    checked={beroepFilter === 'bouw'} 
                    readOnly
                  />
                  <span className={beroepFilter === 'bouw' ? 'font-medium text-indigo-600' : ''}>
                    Bouw
                  </span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 mr-2" 
                    checked={beroepFilter === 'magazijn'} 
                    readOnly
                  />
                  <span className={beroepFilter === 'magazijn' ? 'font-medium text-indigo-600' : ''}>
                    Magazijn
                  </span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 mr-2" 
                    checked={beroepFilter === 'schoonmaak'} 
                    readOnly
                  />
                  <span className={beroepFilter === 'schoonmaak' ? 'font-medium text-indigo-600' : ''}>
                    Schoonmaak
                  </span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 mr-2" 
                    checked={beroepFilter === 'retail'} 
                    readOnly
                  />
                  <span className={beroepFilter === 'retail' ? 'font-medium text-indigo-600' : ''}>
                    Retail
                  </span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 mr-2" 
                    checked={beroepFilter === 'productie'} 
                    readOnly
                  />
                  <span className={beroepFilter === 'productie' ? 'font-medium text-indigo-600' : ''}>
                    Productie
                  </span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 mr-2" 
                    checked={beroepFilter === 'transport'} 
                    readOnly
                  />
                  <span className={beroepFilter === 'transport' ? 'font-medium text-indigo-600' : ''}>
                    Transport
                  </span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 mr-2" 
                    checked={beroepFilter === 'algemeen-werk'} 
                    readOnly
                  />
                  <span className={beroepFilter === 'algemeen-werk' ? 'font-medium text-indigo-600' : ''}>
                    Algemeen Werk
                  </span>
                </label>
              </div>
              
              {beroepFilter && (
                <div className="mt-4">
                  <Link 
                    href="/freelancers" 
                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Filter wissen
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {beroepFilter 
                  ? `${resultCount} ${categoryDisplayName} ${resultCount === 1 ? 'medewerker' : 'medewerkers'} gevonden` 
                  : `${resultCount} resultaten`}
              </h2>
              <div className="flex items-center">
                <span className="mr-2">Sorteren op:</span>
                <div className="relative">
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md shadow-sm appearance-none bg-white"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                             backgroundPosition: "right 0.5rem center", 
                             backgroundRepeat: "no-repeat", 
                             backgroundSize: "1.5em 1.5em" 
                           }}
                  >
                    <option>Relevantie</option>
                    <option>Direct beschikbaar</option>
                    <option>Laagste uurloon</option>
                    <option>Hoogste uurloon</option>
                    <option>Meeste beoordelingen</option>
                    <option>Kleinste werkradius</option>
                    <option>Grootste werkradius</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Filtered Worker Results */}
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map(worker => (
                  <div key={worker.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4">
                      <div className="md:w-32 lg:w-48 flex-shrink-0">
                        <div className="w-full aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
                          {/* Placeholder for profile image */}
                          <div className="h-full w-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{worker.name}</h3>
                            <p className="text-gray-600">{worker.title}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {worker.availableFrom}
                            </span>
                            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              €{worker.hourlyRate}/uur
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {worker.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-xs uppercase text-gray-500 mb-1">Extra vaardigheden</h4>
                          <div className="flex flex-wrap gap-2">
                            {worker.otherSkills.map(skill => (
                              <span key={skill} className="bg-indigo-50 text-indigo-700 text-xs rounded-full px-2 py-1">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div className="flex flex-col sm:flex-row gap-3 mb-3 sm:mb-0">
                            <div className="flex items-center text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {worker.location}
                            </div>
                            <div className="flex items-center text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span>Radius: {worker.workRadius} km</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400 mr-1">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                              </svg>
                              <span>{worker.rating} ({worker.reviews})</span>
                            </div>
                          </div>
                          
                          <Link 
                            href={`/freelancers/${worker.id}`} 
                            className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors"
                          >
                            Profiel Bekijken
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Geen resultaten gevonden</h3>
                  <p className="text-gray-500 mb-4">
                    Er zijn geen werkkrachten gevonden die aan je zoekcriteria voldoen.
                  </p>
                  <Link 
                    href="/freelancers" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Bekijk alle werkkrachten
                  </Link>
                </div>
              )}
              
              {/* Pagination - only show if there are results */}
              {filteredWorkers.length > 0 && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow">
                    <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Vorige
                    </a>
                    <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-indigo-600">
                      1
                    </a>
                    <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      2
                    </a>
                    <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      3
                    </a>
                    <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      4
                    </a>
                    <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Volgende
                    </a>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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