// app/page.jsx
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function Dashboard() {
    const supabase = await createClient();
    const [
        { data: books, error: booksError },
    ] = await Promise.all([
        supabase.from("Books").select(),
    ]);

    if (booksError) throw booksError;

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
                                            <h3 className="text-xl">Oh no, the plot, it thickens</h3>
                                            {books
                                                .filter((item) => item.progress < 100)
                                                .map((item) => (
                                                <div
                                                    key={`${item.title}-${item.id}`}
                                                    className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4"
                                                >
                                                    {item.image_url && (
                                                        <div className="h-16 w-16 pt-2 pb-2 flex items-center">
                                                            <Image
                                                                src={item.image_url}
                                                                alt={`${item.title} cover image`}
                                                                width={64}
                                                                height={64}
                                                                className="h-16 w-16 object-cover rounded-md"
                                                            />
                                                        </div>
                                                    )}
                                                    <h2 className="text-3xl leading-tight min-h-[2.5em] xl:min-h-0">
                                                        {item.title}
                                                    </h2>
                                                    <p className="line-clamp-5 leading-6 h-[7.5rem]">
                                                        {item.description}
                                                    </p>
                                                    <div className="flex flex-row gap-4 w-full justify-between">
                                                        <Link
                                                            href={`/books/${item.slug}`}
                                                            className="bg-black text-white px-3 py-3 rounded-xl w-fit justify-self-end"
                                                        >
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}

                                            <h3 className="text-xl">What do you mean I can only give it five stars?</h3>
                                            {books
                                                .filter((item) => item.rating = 5)
                                                .map((item) => (
                                                <div
                                                    key={`${item.title}-${item.id}`}
                                                    className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4"
                                                >
                                                    {item.image_url && (
                                                        <div className="h-16 w-16 pt-2 pb-2 flex items-center">
                                                            <Image
                                                                src={item.image_url}
                                                                alt={`${item.title} cover image`}
                                                                width={64}
                                                                height={64}
                                                                className="h-16 w-16 object-cover rounded-md"
                                                            />
                                                        </div>
                                                    )}
                                                    <h2 className="text-3xl leading-tight min-h-[2.5em] xl:min-h-0">
                                                        {item.title}
                                                    </h2>
                                                    <p className="line-clamp-5 leading-6 h-[7.5rem]">
                                                        {item.description}
                                                    </p>
                                                    <div className="flex flex-row gap-4 w-full justify-between">
                                                        <Link
                                                            href={`/books/${item.slug}`}
                                                            className="bg-black text-white px-3 py-3 rounded-xl w-fit justify-self-end"
                                                        >
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
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
