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
    const dnfBooks = books.filter((book) => book.progress < 0);

    const fiveStarBooks = books.filter((book) => book.rating === 5);
    const fourStarBooks = books.filter((book) => book.rating === 4);
    const threeStarBooks = books.filter((book) => book.rating === 3);
    const twoStarBooks = books.filter((book) => book.rating === 2);
    const oneStarBooks = books.filter((book) => book.rating === 1);
    

    return (
        <div className="h-screen w-full flex">
            <div className="bg-white w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <Suspense>
                    <div className="w-full">
                        <div className="bg-white text-black w-full sm:w-[9/12] h-full">
                            <div className="flex flex-col">
                                <div className="p-8 sm:p-16 relative sm:ml-20">
                                    <div className="flex flex-col items-center mb-8 py-24">
                                        <h1 className="text-4xl uppercase">FOR BOOK'S SAKE!</h1>
                                        <h2 className="text-2xl">you’ve already bought three books this week!</h2>
                                    </div>

                                    <div className="flex flex-col gap-8">
                                        <div className="flex flex-col">
                                            
                                            {/* In Progress */}
                                            <div className="flex flex-col gap-8 border-b border-gray-400 py-12">
                                                <h3 className="text-xl">Oh no, the plot, it thickens</h3>
                                                <InProgressBooks books={inProgressBooks}/>
                                            </div>

                                            {/* Five Stars */}
                                            <div className="flex flex-col gap-8 border-b border-gray-400 py-16">
                                                <h3 className="text-xl">What do you mean I can only give it five stars?</h3>
                                                <Bookshelf books={fiveStarBooks}/>
                                            </div>

                                            {/* Four Stars */}
                                            <div className="flex flex-col gap-8 border-b border-gray-400 py-16">
                                                <h3 className="text-xl">I’ve read better (but this was still pretty good)</h3>
                                                <Bookshelf books={fourStarBooks}/>
                                            </div>

                                            {/* Three Stars */}
                                            <div className="flex flex-col gap-8 border-b border-gray-400 py-16">
                                                <h3 className="text-xl">It was fine, I guess, but nothing to write home about</h3>
                                                <Bookshelf books={threeStarBooks}/>
                                            </div>

                                            {/* Two Stars */}
                                            <div className="flex flex-col gap-8 border-b border-gray-400 py-16">
                                                <h3 className="text-xl">I finished this just to see how much worse it would get</h3>
                                                <Bookshelf books={twoStarBooks}/>
                                            </div>

                                            {/* One Star */}
                                            <div className="flex flex-col gap-8 border-b border-gray-400 py-16">
                                                <h3 className="text-xl">I finished it, but I’m not happy about it</h3>
                                                <Bookshelf books={oneStarBooks}/>
                                            </div>

                                            {/* DNF */}
                                            <div className="flex flex-col gap-8 py-16">
                                                <h3 className="text-xl">It’s not you, it’s me (just kidding, it’s you)</h3>
                                                <Bookshelf books={dnfBooks}/>
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
