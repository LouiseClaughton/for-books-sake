export default function InProgressBooks({ books }) {
    return (
        <div className="grid grid-cols-2">
            {books.map((book) => (
                <div className="grid grid-cols-[1fr_2fr] gap-4">
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover bg-gray-200"
                    />

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-2xl">{book.title}</h4>
                            <h5 className="text-xl">{book.author}</h5>
                        </div>
                        <p className="line-clamp-7 text-sm">{book.description}</p>
                        <span>Progress: {book.progress}% (last updated {book.last_updated})</span>
                    </div>
                </div>
            ))}
        </div>
    )
}