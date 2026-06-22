"use client";

import Bookshelf from "./bookshelf";

export default function Bookshelves({ books, isDashboard }) {
    const rows = [];

    for (let i = 0; i < books.length; i += 5) {
        rows.push(books.slice(i, i + 5));
    }

    const slicedBooks = books.slice(0, 5);

    return (
        isDashboard ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 items-start">
                <Bookshelf books={slicedBooks} />
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 items-start">
                {rows.map((row, index) => (
                    <Bookshelf key={index} books={row} />
                ))}
            </div>
        )
    );
}