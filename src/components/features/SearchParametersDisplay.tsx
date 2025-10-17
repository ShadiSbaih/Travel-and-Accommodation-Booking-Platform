interface SearchParametersDisplayProps {
    query: string;
    adults: number;
    children: number;
    rooms: number;
}

function SearchParametersDisplay({
    query,
    adults,
    children,
    rooms
}: SearchParametersDisplayProps) {
    return (
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Parameters</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><strong>Destination:</strong> {query || "Any"}</div>
                <div><strong>Adults:</strong> {adults}</div>
                <div><strong>Children:</strong> {children}</div>
                <div><strong>Rooms:</strong> {rooms}</div>
            </div>
        </div>
    );
}

export default SearchParametersDisplay;