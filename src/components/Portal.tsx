import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { portalServices } from '../data';
import { ALLOWED_IPS } from '../config';
import type { PortalService } from '../types';

// --- Custom Hook pour la logique IP ---
function useIpAddress() {
  const [ip, setIp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIp = async () => {
      // Priorité 1 : ifconfig.me (Supporte souvent mieux IPv6 sur certains réseaux)
      try {
        const res = await fetch('https://ifconfig.me/all.json');
        if (res.ok) {
          const data = await res.json();
          setIp(data.ip_addr || data.ip);
          setLoading(false);
          return;
        }
      } catch { /* Ignorer silencieusement pour tenter le suivant */ }

      // Priorité 2 : api64.ipify.org (Fallback universel IPv4/IPv6)
      try {
        const res = await fetch('https://api64.ipify.org?format=json');
        if (res.ok) {
          const data = await res.json();
          setIp(data.ip);
          setLoading(false);
          return;
        }
      } catch {
        console.warn("Impossible de récupérer l'IP publique via les services tiers.");
      }

      setLoading(false);
    };

    fetchIp();
  }, []);

  return { ip, loading };
}

// --- Sous-composant pour les cartes ---
const ServiceCard = ({ service, isAuthorized }: { service: PortalService; isAuthorized: boolean }) => {
  // Récupération dynamique de l'icône depuis le namespace Icons
  // Cast en any/LucideIcon pour éviter les erreurs de type string vs component
  const IconComponent = (Icons[service.icon as keyof typeof Icons] || Icons.Globe) as Icons.LucideIcon;
  
  const isRestricted = service.restricted;
  const canAccess = !isRestricted || isAuthorized;

  // Classes conditionnelles pour la lisibilité
  const baseClasses = "group block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm transition-all duration-300 border-2";
  const statusClasses = canAccess
    ? "border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-800"
    : "border-red-100 dark:border-red-900/30 opacity-75 hover:opacity-100 cursor-not-allowed";

  const content = (
    <>
      <div className="flex items-start justify-between mb-6">
        <div className={`p-3 rounded-xl transition-colors ${
          canAccess 
            ? 'bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50' 
            : 'bg-red-50 dark:bg-red-900/20'
        }`}>
          <IconComponent className={`w-8 h-8 ${canAccess ? 'text-blue-600 dark:text-blue-400' : 'text-red-500 dark:text-red-400'}`} />
        </div>
        
        {isRestricted ? (
          <div className={canAccess ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
            {canAccess ? <Icons.LockOpen className="w-5 h-5" /> : <Icons.Lock className="w-5 h-5" />}
          </div>
        ) : (
          <Icons.ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        )}
      </div>
      
      <h3 className={`text-xl font-bold mb-3 transition-colors ${
        canAccess 
          ? 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400' 
          : 'text-gray-500 dark:text-gray-400'
      }`}>
        {service.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {service.description}
      </p>
      
      {!canAccess && (
        <p className="mt-4 text-xs font-semibold text-red-500 uppercase tracking-wide">
          Accès non autorisé
        </p>
      )}
    </>
  );

  if (!canAccess) {
    return (
      <div className={`${baseClasses} ${statusClasses}`}>
        {content}
      </div>
    );
  }

  return (
    <a 
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${statusClasses}`}
    >
      {content}
    </a>
  );
};

// --- Composant Principal ---
export default function Portal() {
  const { ip, loading } = useIpAddress();
  const isAuthorized = ip ? ALLOWED_IPS.includes(ip) : false;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Portail de Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            Accès centralisé à mon infrastructure personnelle et mes outils hébergés.
          </p>
          
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {loading ? (
              <span className="flex items-center gap-2">
                <Icons.Loader2 className="w-4 h-4 animate-spin" /> Vérification de l'accès...
              </span>
            ) : (
              <span className={`flex items-center gap-2 font-medium ${isAuthorized ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isAuthorized ? <Icons.LockOpen className="w-4 h-4" /> : <Icons.Lock className="w-4 h-4" />}
                {isAuthorized ? "Réseau Autorisé" : "Réseau Externe - Accès Restreint"}
                <span className="text-xs opacity-50 ml-1">({ip || 'Inconnu'})</span>
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portalServices.map((service, index) => (
            <ServiceCard key={index} service={service} isAuthorized={isAuthorized} />
          ))}
        </div>
      </div>
    </div>
  );
}