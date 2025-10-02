import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Globe, Gift, User as UserIcon, ExternalLink, ArrowLeft } from "lucide-react";
import { startupAPI } from "../services/api";

const StartupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await startupAPI.getStartupById(id);
        setStartup(data);
      } catch (e) {
        setError("Failed to load startup");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error || !startup) return <div className="p-8 text-center text-red-500">{error || "Not found"}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mb-6 inline-flex items-center gap-2 rounded-lg border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 bg-white shadow-sm hover:shadow transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Header/Hero */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {startup.logo ? (
                <img src={startup.logo} alt={startup.name} className="h-14 w-14 rounded-lg object-cover" />
              ) : (
                <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  {(startup.name || '').substring(0,2).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">{startup.name}</h1>
                <p className="text-sm text-gray-600 mt-1">{startup.tagline}</p>
                <div className="mt-2 flex items-center flex-wrap gap-2 text-xs">
                  <Badge className="bg-green-100 text-green-700">LIVE</Badge>
                  <Badge className="bg-blue-100 text-blue-700">{startup.industry || startup.categories?.[0]}</Badge>
                  <Badge variant="outline">{startup.businessType}</Badge>
                  <div className="flex items-center gap-1 text-gray-500 ml-2">
                    <Eye className="h-3.5 w-3.5 text-blue-500" />
                    <span className="font-medium">{startup.views || 0} views</span>
                  </div>
                </div>
              </div>
            </div>
            <a
              href={startup.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Visit Website
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: About, Target Users, Offer */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-3">About {startup.name}</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{startup.description}</p>
            </div>

            {startup.targetAudience && (
              <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Target Users</h3>
                <p className="text-gray-700 leading-relaxed">{startup.targetAudience}</p>
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <h3 className="font-semibold text-green-800 mb-2">Special Offer for Early Adopters</h3>
              {(() => { const hasOffer = !!(startup.hasSpecialOffer || startup.specialOfferText || (startup.discount && startup.discount > 0) || startup.specialOfferCode); return (
                <div>
                  <p className="text-green-700 mb-3">
                    {hasOffer ? (startup.specialOfferText || 'Exclusive early adopter deal available.') : "This startup doesn't have a special offer right now."}
                  </p>
                  {hasOffer && (
                    <div className="inline-flex items-center gap-2">
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-md">{startup.discount ? `${startup.discount}% OFF` : 'Claim Offer'}</span>
                      {startup.specialOfferCode && (
                        <span className="text-[11px] font-mono bg-green-100 text-green-800 px-2 py-1 rounded-md border border-green-200">Code: {startup.specialOfferCode}</span>
                      )}
                    </div>
                  )}
                </div>
              ); })()}
            </div>
          </div>

          {/* Right: Sidebar cards */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {(startup.categories || []).map((c) => (
                  <Badge key={c} variant="outline" className="border-purple-200 bg-purple-50 text-purple-600">{c}</Badge>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Founder</h3>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{startup.founderId?.fullName || 'Founder'}</div>
                  <div className="text-xs text-gray-500">Building in {startup.industry || 'Technology'}</div>
                </div>
              </div>
            </div>

            {startup.website && (
              <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Visit Website</h3>
                <p className="text-sm text-gray-600 mb-3">Check out {startup.name}'s official website.</p>
                <a 
                  href={startup.website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 font-semibold px-4 py-2 rounded-lg transition-all"
                >
                  <Globe className="h-4 w-4" /> Visit Website
                </a>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Give Feedback</h3>
              <p className="text-sm text-gray-600 mb-3">Help {startup.name} improve by sharing your thoughts and feedback.</p>
              <a 
                href={startup.feedbackLink || '#'} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 font-semibold px-4 py-2 rounded-lg transition-all"
              >
                <Gift className="h-4 w-4" /> Share Feedback
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartupDetails;


