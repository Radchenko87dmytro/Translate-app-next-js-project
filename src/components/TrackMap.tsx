import { useStore } from "@/store/store";
import { Quote, QuoteGroup, Track, GroupedTrack } from "@/types/types";

const groupQuotesByTrack = (
  quotes: Quote[],
  quoteGroups: QuoteGroup[],
  tracks: Track[]
): GroupedTrack[] => {
  return tracks.map((track) => {
    const groups = quoteGroups
      .filter((g) => g.trackId === track.id)
      .map((group) => {
        const quotesInGroup = quotes.filter((q) => q.quoteGroupId === group.id);
        return { ...group, quotes: quotesInGroup };
      });
    return { ...track, groups };
  });
};

const TrackMap = () => {
  const {
    quotes,
    quoteGroups,
    tracks,
    currentQuoteId,
    setCurrentQuoteId,
    isNextDisabled,
  } = useStore();

  const data = groupQuotesByTrack(quotes, quoteGroups, tracks);

  return (
    <div className="p-4  flex flex-col">
      <h2 className="text-2xl font-bold m-10">Alice in Wanderland</h2>
      <div className="flex flex-row bg-slate-200 rounded-3xl p-6">
        {data.map((track) => (
          <div key={track.id} className="mb-8 flex flex-row mr-16">
            {track.groups.map((group) => (
              <div key={group.id} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{group.title}</h3>
                <div className="flex gap-4 flex-wrap">
                  {group.quotes.map((quote) => {
                    const isActive = quote.id === currentQuoteId;
                    return (
                      <button
                        key={quote.id}
                        // disabled={isNextDisabled()}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow ${
                          isActive
                            ? "bg-green-600"
                            : // : isNextDisabled()
                              // ? "bg-gray-400 cursor-not-allowed"
                              "bg-blue-400 hover:bg-blue-500"
                        }`}
                        onClick={() => setCurrentQuoteId(quote.id)}
                      >
                        {quote.id}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackMap;
// https://wireframe.cc/31nT7A
