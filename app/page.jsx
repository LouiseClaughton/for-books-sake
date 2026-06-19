// app/page.jsx
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

import InProgressBooks from "./components/inProgressBooks";
import Bookshelf from "./components/bookshelf";

export default async function Dashboard() {
    const supabase = await createClient();
    const [
        { data: books, error: booksError },
    ] = await Promise.all([
        supabase.from("Books").select(),
    ]);

    if (booksError) throw booksError;

    const inProgressBooks = books.filter((book) => book.progress < 100);

    const fiveStarBooks = books.filter((book) => book.rating === 5);

    const completedBooks = books.filter((book) => book.progress === 100);

    const unreadBooks = books.filter((book) => book.progress === 0);

    return (
        <div className="h-screen w-full flex">
            <div className="bg-white w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <Suspense>
                    <div className="w-full">
                        <div className="bg-white text-black w-full sm:w-[9/12] h-full">
                            <div className="flex flex-col">
                                <div className="p-8 sm:p-16 relative sm:ml-20">
                                    <div className="flex flex-col items-center mb-8">
                                        <h1 className="text-4xl uppercase">FOR BOOK'S SAKE</h1>
                                        <h2 className="text-2xl">you’ve already bought three books this week!</h2>
                                    </div>

                                    <div className="flex flex-col gap-8">
                                        <div className="flex flex-col">
                                            <div className="flex flex-col gap-8 border-b border-gray-400 py-12">
                                                <h3 className="text-xl">Oh no, the plot, it thickens</h3>
                                                <InProgressBooks books={inProgressBooks}/>
                                            </div>

                                            <div className="flex flex-col gap-8 border-b border-gray-100 py-16">
                                                <h3 className="text-xl">What do you mean I can only give it five stars?</h3>
                                                <Bookshelf books={fiveStarBooks}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Suspense>
            </div>
        </div>
    );
}
