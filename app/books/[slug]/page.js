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
                    <div className="p-8 sm:p-16 relative">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-5xl">{book.title}</h1>
                        </div>

                        <div className="mb-4">
                            {book.author}
                        </div>

                        <p className="flex flex-col gap-8 whitespace-pre-line">
                            {book.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}