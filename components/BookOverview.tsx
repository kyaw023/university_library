import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
}: Book) => {
  console.log(cover);
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="font-bebas-neue text-sm text-light-100">{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={20} height={20} />

            <span className="font-semibold text-light-200">{rating}</span>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Books{" "}
            <span className="font-semibold text-light-200">{total_copies}</span>
          </p>
          <p>
            Available Books{" "}
            <span className="font-semibold text-light-200">
              {available_copies}
            </span>
          </p>

          <p className="book-description">{description}</p>

          <Button className="book-overview-btn">
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            <span className="font-bebas-neue text-xl text-dark-100">
              Borrow Book
            </span>
          </Button>
        </div>
      </div>

      <div className="relative flex flex-1 justify-center ">
        <div className="relative">
          <BookCover
            coverColor={color}
            coverImage={cover}
            variant="wide"
            className="z-10"
          />

          <div className=" absolute left-[70px] top-[60px] z-0 rotate-12 opacity-40 blur-sm max-sm:hidden">
            <BookCover coverColor={color} coverImage={cover} variant="wide" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
