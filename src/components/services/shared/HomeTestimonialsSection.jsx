"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TestimonialCard } from "@/components/home/HomeClientComponents";
import { getPublicTestimonials } from "@/lib/actions/testimonials.actions";

const defaultTestimonials = [
  {
    _id: "68265d239175105d8a7af73a",
    name: "Madhura Kalekar",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1747344674/yyolno5e25xcgays3wpq.jpg",
    review: "We recently booked our international trip through Novixa Travels India, and it was nothing short of amazing! Everything was perfectly planned — from the accommodations, flights, transfers and guided tours. We truly enjoyed every moment and felt completely taken care of throughout the journey. A big thank you to the Novixa team for making our vacation so smooth and memorable.",
  },
  {
    _id: "68265eb69175105d8a7af748",
    name: "Adarsh Sinha",
    designation: "Artist",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1747345078/tqc4xxdonnebki9fckpd.png",
    review: "I booked my rail journey with Novixa Travels India, and I must say, the entire experience was incredibly smooth and well-organized. From the moment I made the booking to the time I reached my destination, their team ensured everything was taken care of with great attention and professionalism.",
  },
  {
    _id: "68265fe49175105d8a7af759",
    name: "Nitin Sharma",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1747345379/c1tgyffom81oc2o8yjz9.webp",
    review: "Our holiday with Novixa Travels India was an unforgettable experience! Right from the planning stage to the return journey, everything was handled with such professionalism and care. The hotel, transport, and local coordination were all top-notch. What really stood out was their constant support.",
  },
  {
    _id: "682661129175105d8a7af78c",
    name: "Mithilesh Kumar",
    designation: "Teacher",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1747345682/pvxiqezbupik35fmq8yu.webp",
    review: "The entire process was incredibly smooth and hassle-free. Their team guided me through each step with complete clarity and professionalism. What I appreciated most was their quick response and personalized assistance, making what is usually stressful feel easy and efficient.",
  },
  {
    _id: "682662029175105d8a7af793",
    name: "Rinku Agarwal",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1787789549/aka4hvqp70qv10qis8vl.webp",
    review: "The booking process was quick, transparent, and completely stress-free. They gave me the best available options based on my preferences and helped me choose the most convenient and cost-effective journey. What really impressed me was their 24/7 support and prompt communication.",
  },
  {
    _id: "688b3c391ae54593ac485fa2",
    name: "Utkarsh Agrawal",
    designation: "Student",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1753955385/csvuuq9tnssyjfrxuvfr.webp",
    review: "Pura process bhot smooth aur stress-free tha. Team ne har step pe clear information di, documents ka kaam bilkul perfect kiya. Har step pe proper guidance mili. Highly recommend their service to everyone.",
  },
  {
    _id: "696ea013a33fe586533f5ca7",
    name: "Nitin",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1768857618/zfozajboi3qpwlhunxx5.jpg",
    review: "We booked our recent trip from Novixa Travels India and their service is best. The price was also very budget friendly, they provide better services in our budget. Planning was very smooth from booking to activities. Everything was well planned.",
  },
  {
    _id: "6ad855b3ac7d082f5c48fba7",
    name: "Vipul Jangid",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1792562611/c56vaukrhy1li4hziqmu.jpg",
    review: "Novixa Travels India provided us great service, the team was very professional and prompt in all coordination. Thank you for making our trip seamless!",
  },
];

export default function HomeTestimonialsSection({
  eyebrow = "CUSTOMER STORIES",
  title = "What Our Customers Say",
  subtitle = "Real stories and experiences from happy travellers who explored with Novixa Travels.",
  initialTestimonials = defaultTestimonials,
  containerClassName = "w-full px-4 lg:px-10",
  scriptLine1 = "More Smiles ♡",
  scriptLine2 = "More Memories ✈",
}) {
  const [testimonials, setTestimonials] = useState(
    initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : defaultTestimonials
  );
  const scrollRef = useRef(null);
  const isNormalizingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Fetch live testimonials from DB on mount
  useEffect(() => {
    let isMounted = true;
    getPublicTestimonials()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch live testimonials:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Ensure base list is even-length so alternating stagger (80px vs 0px) aligns 100% across looped sets
  const baseList = React.useMemo(() => {
    if (!testimonials || testimonials.length === 0) return defaultTestimonials;
    return testimonials.length % 2 !== 0 ? [...testimonials, ...testimonials] : testimonials;
  }, [testimonials]);

  // Triple the list to provide infinite runways in both directions
  const displayList = React.useMemo(() => {
    return [...baseList, ...baseList, ...baseList];
  }, [baseList]);

  // Set initial scroll position to the start of the middle set (Set 1)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const initPosition = () => {
      const oneSetWidth = el.scrollWidth / 3;
      if (oneSetWidth > 0) {
        el.scrollTo({ left: oneSetWidth, behavior: "instant" });
      }
    };

    const timer = setTimeout(initPosition, 80);
    return () => clearTimeout(timer);
  }, [displayList]);

  // Handle re-centering when scrolling settles (seamless infinite cycle)
  const handleScrollSettle = () => {
    const el = scrollRef.current;
    if (!el || !el.scrollWidth) return;
    const oneSetWidth = el.scrollWidth / 3;
    if (oneSetWidth <= 0) return;

    // If drifted into Set 2, silently warp back to Set 1
    if (el.scrollLeft >= oneSetWidth * 2) {
      isNormalizingRef.current = true;
      el.scrollTo({ left: el.scrollLeft - oneSetWidth, behavior: "instant" });
      setTimeout(() => {
        isNormalizingRef.current = false;
      }, 50);
    }
    // If drifted into Set 0, silently warp forward to Set 1
    else if (el.scrollLeft < oneSetWidth * 0.8) {
      isNormalizingRef.current = true;
      el.scrollTo({ left: el.scrollLeft + oneSetWidth, behavior: "instant" });
      setTimeout(() => {
        isNormalizingRef.current = false;
      }, 50);
    }
  };

  const handleScroll = () => {
    if (isNormalizingRef.current) return;
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(handleScrollSettle, 150);
  };

  // Modern browsers support scrollend for immediate seamless normalization
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScrollEnd = () => handleScrollSettle();
    el.addEventListener("scrollend", onScrollEnd);
    return () => el.removeEventListener("scrollend", onScrollEnd);
  }, [displayList]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    // Dynamically calculate one card's width + gap
    const firstCard = el.querySelector(".snap-start");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 16 : 380;
    const shift = direction === "left" ? -cardWidth : cardWidth;
    const oneSetWidth = el.scrollWidth / 3;

    if (oneSetWidth > 0) {
      // If moving right and nearing Set 2 threshold, silently warp back to Set 1 first
      if (direction === "right" && el.scrollLeft >= oneSetWidth * 2 - cardWidth * 1.5) {
        el.scrollTo({ left: el.scrollLeft - oneSetWidth, behavior: "instant" });
      }
      // If moving left and nearing Set 0 threshold, silently warp forward to Set 1 first
      else if (direction === "left" && el.scrollLeft <= oneSetWidth * 0.5 + cardWidth) {
        el.scrollTo({ left: el.scrollLeft + oneSetWidth, behavior: "instant" });
      }
    }

    // Smoothly scroll to the next / previous testimonial
    el.scrollBy({ left: shift, behavior: "smooth" });
  };

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#07080c] text-white overflow-hidden border-t border-zinc-900">
      <div className={containerClassName}>
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-1.5">
                {eyebrow}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Side: Handwriting Flourish & Navigation Arrows */}
          <div className="flex items-center gap-6 md:text-right shrink-0">
            <div
              className="font-handwriting text-2xl sm:text-3xl text-zinc-300 select-none drop-shadow-sm -rotate-2 hidden sm:block"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              <div>{scriptLine1}</div>
              <div className="text-[#deb06c]">{scriptLine2}</div>
            </div>

            {/* Desktop Left/Right Scroll Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous testimonials"
                className="w-9 h-9 rounded-full border border-zinc-800 bg-[#0c101d] hover:bg-[#deb06c]/20 hover:border-[#deb06c] text-white hover:text-[#deb06c] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next testimonials"
                className="w-9 h-9 rounded-full border border-zinc-800 bg-[#0c101d] hover:bg-[#deb06c]/20 hover:border-[#deb06c] text-white hover:text-[#deb06c] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Horizontal Wave (Seamless Infinite Cycle) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 py-6 sm:py-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {displayList.map((data, idx) => (
            <div key={`${data._id || "testimonial"}-${idx}`} className="shrink-0 snap-start">
              <TestimonialCard index={idx} data={data} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
