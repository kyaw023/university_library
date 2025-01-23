import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const session = await auth();

  const lastestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  console.log(lastestBooks);

  return (
    <>
      <BookOverview {...lastestBooks[0]} userId={session?.user?.id} />

      <BookList
        title="Lastet Books "
        books={lastestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
