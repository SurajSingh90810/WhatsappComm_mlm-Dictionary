import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const LeadsList = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const leadsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeads(leadsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leads: ", error);
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const copyToClipboard = (mobile: string, id: string) => {
    navigator.clipboard.writeText(mobile);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDateTime = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-yellow-500 text-center">
        Users List
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Desktop Table: Hidden on small screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse border border-yellow-500/20">
              <thead>
                <tr className="bg-yellow-500/10 text-center">
                  <th className="p-4 border border-yellow-500/20">Name</th>
                  <th className="p-4 border border-yellow-500/20">
                    Mobile Number
                  </th>
                  <th className="p-4 border border-yellow-500/20">
                    Investment
                  </th>
                  <th className="p-4 border border-yellow-500/20">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-white/5 transition-colors text-center"
                  >
                    <td className="p-4 border border-yellow-500/20">
                      {lead.name}
                    </td>
                    <td className="p-4 border border-yellow-500/20 flex items-center justify-center gap-3">
                      <a
                        href={`tel:${lead.mobile}`}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        {lead.mobile}
                      </a>
                      <button
                        onClick={() => copyToClipboard(lead.mobile, lead.id)}
                        className="text-[10px] bg-white/10 hover:bg-yellow-500 hover:text-black px-2 py-1 rounded transition-all"
                      >
                        {copiedId === lead.id ? "Copied!" : "Copy"}
                      </button>
                    </td>
                    <td className="p-4 border border-yellow-500/20">
                      {lead.investment ? `₹${lead.investment}` : "N/A"}
                    </td>
                    <td className="p-4 border border-yellow-500/20 text-sm font-medium">
                      {formatDateTime(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View: Hidden on desktop */}
          <div className="md:hidden space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="glass p-5 rounded-2xl border border-yellow-500/20 bg-black/40 backdrop-blur-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-yellow-500 font-bold text-lg">
                    {lead.name}
                  </span>

                  {/* Date Time size increased here */}
                  <span className="text-sm text-gray-300 font-medium bg-white/5 px-2 py-1 rounded">
                    {formatDateTime(lead.createdAt)}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <a
                    href={`tel:${lead.mobile}`}
                    className="text-yellow-400 font-mono text-xl"
                  >
                    {lead.mobile}
                  </a>
                  <button
                    onClick={() => copyToClipboard(lead.mobile, lead.id)}
                    className="bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    {copiedId === lead.id ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="mt-3 text-sm text-gray-300 border-t border-yellow-500/10 pt-3">
                  Investment:{" "}
                  <span className="text-white font-semibold">
                    {lead.investment ? `₹${lead.investment}` : "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsList;
