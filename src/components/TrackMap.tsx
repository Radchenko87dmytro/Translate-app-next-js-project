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

    // Flatten all quotes in this track's groups to assign local numbers
    const allQuotesInTrack = groups.flatMap((group) => group.quotes);

    // Assign local quoteNumber
    let counter = 1;
    const numberedQuotesMap = new Map<number, number>(); // quoteId -> number
    allQuotesInTrack.forEach((quote) => {
      numberedQuotesMap.set(quote.id, counter++);
    });

    // Inject quoteNumber back into group.quotes
    const updatedGroups = groups.map((group) => ({
      ...group,
      quotes: group.quotes.map((q) => ({
        ...q,
        quoteNumber: numberedQuotesMap.get(q.id),
      })),
    }));

    return { ...track, groups: updatedGroups };
  });
};

const TrackMap = () => {
  const {
    quotes,
    quoteGroups,
    tracks,
    currentQuoteId,
    setCurrentQuoteId,
    // isNextDisabled,
  } = useStore();

  const data = groupQuotesByTrack(quotes, quoteGroups, tracks);

  return (
    <div className="flex flex-col justify-center items-center ">
      {data.map((track) => (
        <div key={track.id}>
          <h2 className="text-2xl font-bold m-10 ">{track.title}</h2>
          <div key={track.id} className="mb-8 flex flex-col sm:flex-row">
            {track.groups.map((group) => (
              <div
                key={group.id}
                className="mb-4 m-2 bg-slate-200 rounded-3xl p-6 "
              >
                <h3 className="text-lg font-semibold mb-8 ">{group.title}</h3>
                <div className="flex gap-5 flex-row">
                  {group.quotes.map((quote) => {
                    const isActive = quote.id === currentQuoteId;
                    return (
                      <button
                        key={quote.id}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow ${
                          isActive
                            ? "bg-green-600"
                            : "bg-blue-400 hover:bg-blue-500"
                        }`}
                        onClick={() => setCurrentQuoteId(quote.id)}
                      >
                        {quote.quoteNumber}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackMap;
// https://wireframe.cc/31nT7A
