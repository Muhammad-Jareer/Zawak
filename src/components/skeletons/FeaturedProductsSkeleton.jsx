import { ChevronRight } from "lucide-react";

const FeaturedProductsSkeleton = () => {
  const skeletonSlides = Array.from({ length: 5 }); // Adjust to match your layout

  return (
    <div className="relative animate-pulse">
      <h1 className="text-xl md:text-3xl font-bold mt-8 text-primary-600 bg-gray-200 h-8 w-60 rounded" />
      <section className="px-3 lg:px-4">
        <div className="my-8 flex justify-center gap-4 overflow-x-auto no-scrollbar">
          {skeletonSlides.map((_, index) => (
            <div
              key={index}
              className="w-40 sm:w-48 lg:w-64 h-64 bg-gray-200 rounded-lg"
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous Slide"
          className="flex absolute top-[35%] -left-3 lg:-left-2 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next Slide"
          className="flex absolute top-[35%] -right-3 lg:-right-2 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
        </button>

        <div className="text-center mt-12">
          <div className="inline-block bg-gray-200 h-10 w-40 rounded-md" />
        </div>
      </section>
    </div>
  );
};

export default FeaturedProductsSkeleton;
