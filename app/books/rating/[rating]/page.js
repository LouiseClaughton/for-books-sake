import { createClient } from "@/lib/supabase/server";

import Bookshelves from "@/app/components/bookshelves";

export default async function BooksByRatingPage({ params }) {
    const { rating } = await params;

    const supabase = await createClient();

    const numericRating = Number(rating.replace("-stars", ""));

    const { data: books, error } = await supabase
        .from("Books")
        .select("*")
        .eq("rating", numericRating);

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div className="h-screen w-full flex">
            <div className="bg-white w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <div className="w-full">
                    <div className="bg-white text-black w-full sm:w-[9/12] h-full">
                        <div className="flex flex-col">
                            <div className="p-8 sm:p-16 relative">
                                <div className="flex flex-col items-center mb-8 py-24">
                                    <h1 className="text-4xl uppercase text-center md:text-left">{numericRating} STAR BOOKS</h1>
                                    <h2 className="text-2xl text-center md:text-left">you’ve already bought three books this week!</h2>
                                </div>

                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col">

                                        {/* Five Stars */}
                                        {books.length > 0 &&
                                            <div className="flex flex-col gap-8 border-b border-gray-400 py-16">
                                                <Bookshelves books={books}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}