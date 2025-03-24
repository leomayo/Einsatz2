"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Mock data for initial workers
const INITIAL_WORKERS = [
  {
    id: "1",
    name: "Alex de Vries",
    title: "Allround Horeca Medewerker",
    hourlyRate: 16,
    rating: 4.9,
    reviews: 37,
    location: "Amsterdam, NL",
    workRadius: 25, // In kilometers
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    tags: ["Bediening", "Bar", "Keukenhulp"],
    availableFrom: "Vandaag",
    otherSkills: ["Fysiek sterk", "Snel lerend"]
  },
  {
    id: "2",
    name: "Samantha Jansen",
    title: "Magazijnmedewerker / Productie",
    hourlyRate: 14,
    rating: 4.8,
    reviews: 23,
    location: "Rotterdam, NL",
    workRadius: 15, // In kilometers
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    tags: ["Orderpicken", "Inpakken", "Heftruck"],
    availableFrom: "Morgen",
    otherSkills: ["Beschikbaar voor avondwerk"]
  },
  {
    id: "3",
    name: "Michael Bakker",
    title: "Bouwvakker / Algemeen Werknemer",
    hourlyRate: 18,
    rating: 5.0,
    reviews: 18,
    location: "Utrecht, NL",
    workRadius: 50, // In kilometers
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    tags: ["Timmerman", "Schilderwerk", "Sjouwwerk"],
    availableFrom: "Deze week",
    otherSkills: ["Eigen vervoer", "VCA certificaat"]
  },
  {
    id: "4",
    name: "Jessica Smit",
    title: "Allrounder - Algemeen Werk",
    hourlyRate: 13,
    rating: 4.7,
    reviews: 41,
    location: "Den Haag, NL",
    workRadius: 30, // In kilometers
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    tags: ["Fysiek werk", "Leergierig", "Flexibel"],
    availableFrom: "Vandaag",
    otherSkills: ["Werkt graag buiten", "Bereid alles te leren"]
  },
];

// Generate more workers with random data
const generateMoreWorkers = (count: number, startId: number) => {
  const names = [
    "Jan de Vries", "Sophie Bakker", "Liam Jansen", "Emma van Dijk", 
    "Noah Visser", "Julia de Boer", "Lucas Mulder", "Mila van den Berg",
    "Daan Smit", "Saar Vermeulen", "Sem Bos", "Tess Vos"
  ];
  
  const titles = [
    "Horecamedewerker", "Magazijnmedewerker", "Productiemedewerker", "Bouwvakker",
    "Schoonmaker", "Verhuizer", "Bezorger", "Winkelhulp",
    "Evenementenmedewerker", "Landarbeider", "Terreinmedewerker", "Allrounder"
  ];
  
  const locations = [
    "Amsterdam, NL", "Rotterdam, NL", "Utrecht, NL", "Den Haag, NL",
    "Eindhoven, NL", "Groningen, NL", "Tilburg, NL", "Almere, NL",
    "Breda, NL", "Nijmegen, NL", "Apeldoorn, NL", "Enschede, NL"
  ];
  
  const workRadiusOptions = [10, 15, 20, 25, 30, 40, 50, 75];
  
  const tagSets = [
    ["Bediening", "Afwassen", "HACCP"],
    ["Orderpicken", "Inpakken", "Heftruck"],
    ["Inpakwerk", "Montage", "Kwaliteitscontrole"],
    ["Sjouwwerk", "Timmeren", "Opruimen"],
    ["Glazenwassen", "Kantoorschoonmaak", "Vloerreiniging"],
    ["Zware voorwerpen", "Inpakken", "Monteren"],
    ["Auto rijden", "Fiets", "Pakketbezorging"],
    ["Kassa", "Vakken vullen", "Klantenservice"],
    ["Opbouw", "Bediening", "Kaartcontrole"],
    ["Oogsten", "Planten", "Snoeiwerk"],
    ["Grasmaaien", "Snoeien", "Planten"],
    ["Algemeen werk", "Fysiek sterk", "Flexibel"]
  ];
  
  const otherSkillsSets = [
    ["Representatief", "Weekend beschikbaar"],
    ["VOG aanwezig", "Fysiek sterk"],
    ["Ploegendienst geen probleem", "Snel lerend"],
    ["VCA certificaat", "Eigen gereedschap"],
    ["Eigen vervoer", "Avondwerk mogelijk"],
    ["Rijbewijs B", "Fysiek sterk"],
    ["Eigen auto", "Smartphone"],
    ["Klantvriendelijk", "Flexibel inzetbaar"],
    ["Avond- en weekendwerk", "Sociaal"],
    ["Buitenwerk geen probleem", "Fysiek sterk"],
    ["Eigen vervoer", "Zelfstandig werkend"],
    ["Leer snel", "Werk graag fysiek", "Sta open voor alles"]
  ];
  
  const availabilityOptions = ["Vandaag", "Morgen", "Deze week", "Volgende week"];
  
  return Array.from({ length: count }, (_, i) => {
    const index = (startId + i) % names.length;
    return {
      id: `${startId + i + 1}`,
      name: names[index],
      title: titles[index],
      hourlyRate: Math.floor(Math.random() * (20 - 12 + 1)) + 12,
      rating: Math.floor(Math.random() * 10 + 40) / 10, // 4.0 - 5.0
      reviews: Math.floor(Math.random() * 50) + 5,
      location: locations[index],
      workRadius: workRadiusOptions[Math.floor(Math.random() * workRadiusOptions.length)],
      image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
      tags: tagSets[index],
      availableFrom: availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)],
      otherSkills: otherSkillsSets[index]
    };
  });
};

export default function FreelancersList() {
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  // Simulate loading more data when reaching the bottom
  const loadMoreWorkers = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newWorkers = generateMoreWorkers(4, workers.length);
      setWorkers(prevWorkers => [...prevWorkers, ...newWorkers]);
      setIsLoading(false);
      
      // Limit to a reasonable number for demo purposes
      if (workers.length >= 20) {
        setHasMore(false);
      }
    }, 1500);
  };

  // Set up the intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreWorkers();
        }
      },
      { threshold: 1.0 }
    );
    
    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);
    
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isLoading, workers.length]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workers.map((worker) => (
          <div key={worker.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={worker.image} 
                  alt={worker.name} 
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                €{worker.hourlyRate}/uur
              </div>
              <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Beschikbaar: {worker.availableFrom}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">{worker.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{worker.title}</p>
              
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {worker.location}
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Werkradius: {worker.workRadius} km</span>
              </div>
              
              <div className="flex items-center text-sm mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400 mr-1">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <span>{worker.rating} ({worker.reviews} beoordelingen)</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {worker.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1">
                    {tag}
                  </span>
                ))}
                {worker.tags.length > 2 && (
                  <span className="bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1">
                    +{worker.tags.length - 2}
                  </span>
                )}
              </div>
              
              {/* Wild card / Other skills section */}
              <div className="mb-4">
                <h4 className="text-xs uppercase text-gray-500 mb-1">Extra vaardigheden</h4>
                <div className="flex flex-wrap gap-2">
                  {worker.otherSkills.map((skill) => (
                    <span key={skill} className="bg-indigo-50 text-indigo-700 text-xs rounded-full px-2 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/freelancers/${worker.id}`} 
                className="block w-full bg-indigo-600 text-white text-center rounded-lg py-2 hover:bg-indigo-700 transition-colors"
              >
                Profiel Bekijken
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-gray-600">Laden...</span>
        </div>
      )}
      
      {/* Intersection Observer Target */}
      {hasMore && <div ref={observerTarget} className="h-10" />}
      
      {/* End message */}
      {!hasMore && (
        <div className="text-center my-8 text-gray-600">
          Geen medewerkers meer om te laden
        </div>
      )}
    </div>
  );
} 