"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Bookshelf({ books }) {
    const [selected, setSelected] = useState(books?.[0]?.id ?? null);
    const canSelect = typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
    const router = useRouter();

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-start">
            {books.map((book) => {
                const isActive = selected === book.id;

                const image = (
                    <div className="w-[180px] aspect-[2/3] shrink-0">
                        <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover bg-gray-200 lg:hover:-translate-y-2 lg:transition-all"
                        />
                    </div>
                );

                return isActive ? (
                    <a
                        key={book.id}
                        href={`/books/${book.slug}`}
                        className="col-span-2 flex flex-col md:flex-row items-center md:items-start gap-4"
                    >
                        {image}

                        <div className="flex flex-col gap-4 text-center md:text-left">
                            <div className="flex flex-col gap-2">
                                <h4 className="text-2xl">{book.title}</h4>
                                <h5 className="text-xl">{book.author}</h5>
                            </div>

                            <p className="line-clamp-7 text-sm">
                                {book.description}
                            </p>

                            <span>Read: {book.last_updated}</span>
                        </div>
                    </a>
                ) : (

                    <button
                        key={book.id}
                        onClick={() => canSelect ? setSelected(book.id) : router.push(`/books/${book.slug}`)}
                        className="text-left col-span-1 flex w-full justify-center md:justify-start hover:cursor-pointer lg:hover:-translate-y-2 lg:transition-all"
                    >
                        {image}
                    </button>
                );
            })}
        </div>
    );
}