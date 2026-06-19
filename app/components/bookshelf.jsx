"use client";

import { useState } from "react";

export default function Bookshelf({ books }) {
    const [selectedId, setSelectedId] = useState(books[0]?.id);

    const featuredBook = books.find((book) => book.id === selectedId);
    const otherBooks = books.filter((book) => book.id !== selectedId);

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Featured book */}
            <a href={`/books/${featuredBook?.slug}`}>
                <div className="grid grid-cols-[1fr_2fr] gap-4">
                    <button
                        className="bg-gray-200 aspect-[2/3]"
                        onClick={() => setSelectedId(featuredBook?.id)}
                    >
                        <img
                            src={featuredBook?.cover}
                            alt={featuredBook?.title}
                            className="w-full h-full object-cover"
                        />
                    </button>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-2xl">{featuredBook?.title}</h4>
                            <h5 className="text-xl">{featuredBook?.author}</h5>
                        </div>
                        <p className="line-clamp-7 text-sm">{featuredBook?.description}</p>
                        <span>Read: {featuredBook?.last_updated}</span>
                    </div>
                </div>
            </a>

            {/* Other books */}
            <div className="grid grid-cols-3 gap-2">
                {otherBooks.map((book) => (
                    <button
                        key={book?.id}
                        onClick={() => setSelectedId(book?.id)}
                        className="bg-gray-200 aspect-[2/3]"
                    >
                        <img
                            src={book?.cover}
                            alt={book?.title}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}