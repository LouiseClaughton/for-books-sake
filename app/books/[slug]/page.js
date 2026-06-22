export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";

export default async function BookPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const { data: book, error: bookError } = await supabase
        .from("Books")
        .select("*")
        .eq("slug", slug)
        .single();

    if (bookError || !book) {
        return <div>Book not found</div>;
    }

    return (
        <div className="w-full">
            <div className="bg-white text-black w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <div className="flex flex-col">
                    <div className="p-8 sm:p-16 relative grid grid-cols-[1fr_3fr] gap-12">
                        <div className="aspect-[2/3] shrink-0">
                            <img
                                src={book.cover}
                                alt={book.title}
                                className="w-full h-full object-cover bg-gray-200 lg:hover:-translate-y-2 lg:transition-all"
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <h1 className="book-title text-4xl">{book.title}</h1>
                            <div className="book-title text-xl mb-4">
                                {book.author}
                            </div>

                            <p className="text-sm flex flex-col gap-8 whitespace-pre-line">
                                {book.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}