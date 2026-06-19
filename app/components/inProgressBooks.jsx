import Image from "next/image";

export default function InProgressBooks({ books }) {
    return (
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-8">
            {books.map((book) => (
                <a href={`/books/${book.slug}`} className="col-span-3 col-span-3 flex gap-4" key={book.id}>
                    {book?.cover &&
                        <div className="w-[180px] aspect-[2/3] shrink-0">
                            <Image 
                                src={book?.cover} 
                                alt={`${book?.title} Cover`}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="w-full h-full hover:-translate-y-2 transition-all" 
                                width="20"
                                height="20"
                            />
                        </div>
                    }

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-2xl">{book?.title}</h4>
                            <h5 className="text-xl">{book?.author}</h5>
                        </div>
                        <p className="line-clamp-7 text-sm">{book?.description}</p>
                        <span>Progress: {book?.progress}% (last updated {book?.last_updated})</span>
                    </div>
                </a>
            ))}
        </div>
    )
}