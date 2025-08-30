import { useStore } from "@/store/store";
import { Quote, QuoteGroup, Track, GroupedTrack } from "@/types/types";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const { quotes, quoteGroups, tracks, currentQuoteId, setCurrentQuoteId } =
    useStore();

  const data = groupQuotesByTrack(quotes, quoteGroups, tracks);

  return (
    <div className="w-full max-w-xl mx-auto p-4 border-2 border-gray-300 rounded-lg shadow-lg text-center">
      {data.map((track) => (
        <div key={track.id}>
          <h2 className="text-2xl font-bold m-10 ">{track.title}</h2>

          <div className="flex justify-center items-center gap-4 mb-8">
            <button className="p-2 rounded-full hover:bg-blue-400  disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={() => {
                  const allQuotes = data.flatMap((t) =>
                    t.groups.flatMap((g) => g.quotes)
                  );
                  const currentIndex = allQuotes.findIndex(
                    (q) => q.id === currentQuoteId
                  );
                  if (currentIndex > 0)
                    setCurrentQuoteId(allQuotes[currentIndex - 1].id);
                }}
              />
            </button>

            <button className="p-2 rounded-full hover:bg-blue-400  disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
              <FontAwesomeIcon
                icon={faArrowRight}
                onClick={() => {
                  const allQuotes = data.flatMap((t) =>
                    t.groups.flatMap((g) => g.quotes)
                  );
                  const currentIndex = allQuotes.findIndex(
                    (q) => q.id === currentQuoteId
                  );
                  if (currentIndex < allQuotes.length - 1)
                    setCurrentQuoteId(allQuotes[currentIndex + 1].id);
                }}
              />
            </button>
          </div>

          <div key={track.id} className="mb-8 flex-wrap flex-col sm:flex-row">
            {track.groups.map((group) => (
              <div
                key={group.id}
                className="mb-4 m-2 bg-slate-200 rounded-3xl p-6 "
              >
                <h3 className="text-lg font-semibold mb-8 ">{group.title}</h3>
                <div className="flex justify-center gap-16 flex-row">
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
