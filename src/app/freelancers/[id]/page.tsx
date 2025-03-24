import Link from "next/link";

export default function FreelancerDetailPage({ params }: { params: { id: string } }) {
  // For demo purposes, we'll hardcode a worker profile
  // In a real app, you would fetch this data from the backend
  const worker = {
    id: params.id,
    name: "Michael Bakker",
    title: "Bouwvakker / Algemeen Werknemer",
    hourlyRate: 18,
    rating: 5.0,
    reviewCount: 18,
    location: "Utrecht, NL",
    workRadius: 50, // In kilometers
    tags: ["Timmerman", "Schilderwerk", "Sjouwwerk", "Opruimen", "Algemeen Bouwwerk"],
    otherSkills: ["Eigen vervoer", "VCA certificaat", "Fysiek sterk", "Ervaring in de bouw"],
    about: "Al 5 jaar ervaring als bouwvakker en allround medewerker. Ik ben fysiek sterk, heb mijn eigen vervoer en ben in het bezit van een VCA certificaat. Ik kan direct aan de slag voor korte of langere klussen en ben ook beschikbaar voor algemeen werk. Ik leer snel en pas me makkelijk aan in verschillende werkomgevingen.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    experience: [
      {
        position: "Timmerman",
        company: "Bouwbedrijf Jansen",
        duration: "2020 - 2023",
        description: "Nieuwbouw en renovatie, plaatsen van kozijnen, deuren en wanden."
      },
      {
        position: "Algemeen Bouwmedewerker",
        company: "De Vries Bouw",
        duration: "2018 - 2020",
        description: "Assisteren bij diverse bouwwerkzaamheden, sjouwwerk, opruimen en algemene ondersteuning."
      }
    ],
    certifications: ["VCA Basisveiligheid", "Rijbewijs B"],
    languages: ["Nederlands (Moedertaal)", "Engels (Basis)"],
    availabilitySchedule: {
      monday: { morning: true, afternoon: true, evening: false },
      tuesday: { morning: true, afternoon: true, evening: false },
      wednesday: { morning: true, afternoon: true, evening: false },
      thursday: { morning: true, afternoon: true, evening: false },
      friday: { morning: true, afternoon: true, evening: false },
      saturday: { morning: true, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false }
    },
    reviewsList: [
      {
        id: 1,
        name: "Jan Visser",
        company: "Visser Renovaties",
        rating: 5,
        date: "15-05-2023",
        comment: "Michael heeft uitstekend werk geleverd bij onze renovatie. Hij werkt snel en netjes, en is ook nog eens zeer vriendelijk. Zeker een aanrader!"
      },
      {
        id: 2,
        name: "Petra de Jong",
        company: "De Jong Vastgoed",
        rating: 5,
        date: "03-04-2023",
        comment: "We hadden Michael nodig voor wat sloopwerk en hij heeft ons enorm geholpen. Kwam stipt op tijd en heeft het werk prima uitgevoerd."
      },
      {
        id: 3,
        name: "Bart Smit",
        company: "Smit & Zonen",
        rating: 5,
        date: "22-02-2023",
        comment: "Michael is een harde werker die weet van aanpakken. Hij heeft ons geholpen bij een spoedklus en was dezelfde dag nog beschikbaar."
      }
    ],
    availableFrom: "Deze week"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-indigo-600">Einsatz</Link>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="font-medium hover:text-indigo-600">Home</Link>
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow">
                  <img 
                    src={worker.image} 
                    alt={worker.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold">{worker.name}</h1>
                      <p className="text-xl text-gray-600">{worker.title}</p>
                      
                      <div className="flex items-center text-sm mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{worker.location}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>Werkradius: {worker.workRadius} km</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                          Beschikbaar: {worker.availableFrom}
                        </span>
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                          €{worker.hourlyRate}/uur
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-1 font-medium">{worker.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600">{worker.reviewCount} beoordelingen</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 my-4">
                    {worker.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm uppercase text-gray-500 mb-2">Extra vaardigheden</h3>
                    <div className="flex flex-wrap gap-2">
                      {worker.otherSkills.map(skill => (
                        <span key={skill} className="bg-indigo-50 text-indigo-700 text-sm rounded-full px-3 py-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-6">
                    <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex-grow">
                      Contact Opnemen
                    </button>
                    <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors flex-grow">
                      Direct Boeken
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Tabs and Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Over Mij</h2>
                  <p className="text-gray-700">{worker.about}</p>
                </div>
              </div>
              
              {/* Experience Section */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Werkervaring</h2>
                  <div className="space-y-4">
                    {worker.experience.map((exp, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium">{exp.position}</h3>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{exp.company}</span>
                          <span>{exp.duration}</span>
                        </div>
                        <p className="mt-2 text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Location & Work Radius Map */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Werkgebied</h2>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    {/* Replace this with an actual map component in a real implementation */}
                    <div className="bg-gray-100 h-80 relative">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-gray-500 mb-2">Interactieve kaart niet beschikbaar in demo</p>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <p><strong>Standplaats:</strong> {worker.location}</p>
                          <p><strong>Werkradius:</strong> {worker.workRadius} kilometer</p>
                          <p className="text-sm text-gray-600 mt-2">Deze werknemer is bereid om opdrachten uit te voeren binnen een straal van {worker.workRadius} km rond {worker.location.split(',')[0]}.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reviews Section */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Beoordelingen</h2>
                  <div className="space-y-6">
                    {worker.reviewsList.map(review => (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{review.name}</h3>
                            <p className="text-sm text-gray-600">{review.company}</p>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-1">{review.rating}</span>
                            </div>
                            <p className="text-sm text-gray-600">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Availability Section */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Beschikbaarheid</h2>
                  <p className="text-green-600 font-medium mb-4">Beschikbaar vanaf: {worker.availableFrom}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Maandag</span>
                      <div>
                        {worker.availabilitySchedule.monday.morning && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Ochtend</span>}
                        {worker.availabilitySchedule.monday.afternoon && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Middag</span>}
                        {worker.availabilitySchedule.monday.evening && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Avond</span>}
                        {!worker.availabilitySchedule.monday.morning && !worker.availabilitySchedule.monday.afternoon && !worker.availabilitySchedule.monday.evening && <span className="text-gray-400">Niet beschikbaar</span>}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Dinsdag</span>
                      <div>
                        {worker.availabilitySchedule.tuesday.morning && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Ochtend</span>}
                        {worker.availabilitySchedule.tuesday.afternoon && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Middag</span>}
                        {worker.availabilitySchedule.tuesday.evening && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Avond</span>}
                        {!worker.availabilitySchedule.tuesday.morning && !worker.availabilitySchedule.tuesday.afternoon && !worker.availabilitySchedule.tuesday.evening && <span className="text-gray-400">Niet beschikbaar</span>}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Woensdag</span>
                      <div>
                        {worker.availabilitySchedule.wednesday.morning && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Ochtend</span>}
                        {worker.availabilitySchedule.wednesday.afternoon && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Middag</span>}
                        {worker.availabilitySchedule.wednesday.evening && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Avond</span>}
                        {!worker.availabilitySchedule.wednesday.morning && !worker.availabilitySchedule.wednesday.afternoon && !worker.availabilitySchedule.wednesday.evening && <span className="text-gray-400">Niet beschikbaar</span>}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Donderdag</span>
                      <div>
                        {worker.availabilitySchedule.thursday.morning && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Ochtend</span>}
                        {worker.availabilitySchedule.thursday.afternoon && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Middag</span>}
                        {worker.availabilitySchedule.thursday.evening && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Avond</span>}
                        {!worker.availabilitySchedule.thursday.morning && !worker.availabilitySchedule.thursday.afternoon && !worker.availabilitySchedule.thursday.evening && <span className="text-gray-400">Niet beschikbaar</span>}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Vrijdag</span>
                      <div>
                        {worker.availabilitySchedule.friday.morning && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Ochtend</span>}
                        {worker.availabilitySchedule.friday.afternoon && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Middag</span>}
                        {worker.availabilitySchedule.friday.evening && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Avond</span>}
                        {!worker.availabilitySchedule.friday.morning && !worker.availabilitySchedule.friday.afternoon && !worker.availabilitySchedule.friday.evening && <span className="text-gray-400">Niet beschikbaar</span>}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Zaterdag</span>
                      <div>
                        {worker.availabilitySchedule.saturday.morning && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Ochtend</span>}
                        {worker.availabilitySchedule.saturday.afternoon && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Middag</span>}
                        {worker.availabilitySchedule.saturday.evening && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Avond</span>}
                        {!worker.availabilitySchedule.saturday.morning && !worker.availabilitySchedule.saturday.afternoon && !worker.availabilitySchedule.saturday.evening && <span className="text-gray-400">Niet beschikbaar</span>}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Zondag</span>
                      <div>
                        {worker.availabilitySchedule.sunday.morning && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Ochtend</span>}
                        {worker.availabilitySchedule.sunday.afternoon && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">Middag</span>}
                        {worker.availabilitySchedule.sunday.evening && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Avond</span>}
                        {!worker.availabilitySchedule.sunday.morning && !worker.availabilitySchedule.sunday.afternoon && !worker.availabilitySchedule.sunday.evening && <span className="text-gray-400">Niet beschikbaar</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Certificates and Languages */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Certificaten & Talen</h2>
                  
                  <h3 className="font-medium mb-2">Certificaten</h3>
                  <ul className="list-disc list-inside mb-4 text-gray-700">
                    {worker.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                  
                  <h3 className="font-medium mb-2">Talen</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {worker.languages.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Booking CTA */}
              <div className="bg-indigo-50 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">Klaar om te boeken?</h2>
                  <p className="text-gray-700 mb-4">
                    Neem direct contact op met {worker.name} om een afspraak te maken voor uw project of klus.
                  </p>
                  <button className="w-full bg-indigo-600 text-white font-medium rounded-lg py-3 hover:bg-indigo-700 transition-colors">
                    Nu Boeken
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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