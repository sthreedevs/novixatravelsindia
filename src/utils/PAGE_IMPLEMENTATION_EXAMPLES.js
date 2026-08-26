/**
 * Example Page Implementations with SEO
 * Copy these patterns to your page components
 */

// ============================================
// Example 1: Home Page with SEO
// ============================================
/*
import React from 'react';
import SEOMeta from '@/components/SEOMeta';
import { getMetaTags } from './utils/seoMetaTags';
import { organizationSchema } from './utils/schemaMarkup';

export default function Home() {
  const meta = getMetaTags('home');
  
  return (
    <>
      <SEOMeta 
        {...meta}
        structuredData={organizationSchema}
      />
      
      <main>
        <h1>Novixa Travels India - Your Complete Travel Partner</h1>
        
        <section>
          <h2>Our Services</h2>
          <ul>
            <li><a href="/services/packages">Tour Packages</a></li>
            <li><a href="/services/flights">Flight Booking</a></li>
            <li><a href="/services/visa">Visa Assistance</a></li>
          </ul>
        </section>

        <section>
          <h2>Why Choose Novixa Travels?</h2>
          <p>With over 10 years of experience, we provide comprehensive travel solutions...</p>
        </section>
      </main>
    </>
  );
}
*/

// ============================================
// Example 2: Service Page (Flights) with SEO
// ============================================
/*
import React from 'react';
import SEOMeta from '@/components/SEOMeta';
import { getMetaTags } from './utils/seoMetaTags';
import { serviceSchema, breadcrumbSchema } from './utils/schemaMarkup';
import { optimizeImage } from './utils/seoHelpers';

export default function FlightBooking() {
  const meta = getMetaTags('flights');
  const schema = serviceSchema(
    'Flight Booking & Reservations',
    'Book domestic and international flights with the best deals'
  );
  const breadcrumbs = breadcrumbSchema([
    { name: 'Services', url: 'https://www.novixatravelsindia.com/#services' },
    { name: 'Flights', url: 'https://www.novixatravelsindia.com/services/flights' }
  ]);

  return (
    <>
      <SEOMeta 
        {...meta}
        structuredData={schema}
      />
      
      <nav>
        {/* Breadcrumb Navigation */}
        <a href="/">Home</a> &gt; 
        <a href="#services">Services</a> &gt; 
        <span>Flights</span>
      </nav>

      <main>
        <h1>Book Flights Online | Domestic & International | Novixa Travels</h1>
        
        <section>
          <h2>Find Your Perfect Flight</h2>
          {/* Flight search form */}
        </section>

        <section>
          <h2>Popular Flight Destinations</h2>
          <ul>
            <li><a href="/destination/dubai">Flights to Dubai</a></li>
            <li><a href="/destination/bangkok">Flights to Bangkok</a></li>
            <li><a href="/destination/london">Flights to London</a></li>
          </ul>
        </section>

        <section>
          <h2>Why Book Flights with Novixa?</h2>
          <ul>
            <li>Lowest prices guaranteed</li>
            <li>Free cancellation on selected flights</li>
            <li>24/7 customer support</li>
            <li>Secure payment gateway</li>
          </ul>
        </section>

        <section>
          <h2>How to Book Your Flight</h2>
          <ol>
            <li>Search flights by date and route</li>
            <li>Compare prices and airlines</li>
            <li>Select your preferred flight</li>
            <li>Enter passenger details</li>
            <li>Complete payment</li>
            <li>Receive confirmation email</li>
          </ol>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>
          <h3>Can I cancel my flight booking?</h3>
          <p>Yes, cancellations are allowed up to 24 hours before departure...</p>
          
          <h3>What documents do I need?</h3>
          <p>You'll need a valid passport and any required visas...</p>
        </section>
      </main>
    </>
  );
}
*/

// ============================================
// Example 3: Blog Post with SEO
// ============================================
/*
import React from 'react';
import SEOMeta from '@/components/SEOMeta';
import { articleSchema } from './utils/schemaMarkup';
import { optimizeImage } from './utils/seoHelpers';

export default function BlogPost({ blog }) {
  const schema = articleSchema({
    title: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage,
    datePublished: blog.publishedDate,
    dateModified: blog.updatedDate || blog.publishedDate
  });

  return (
    <>
      <SEOMeta 
        title={blog.title + ' | Novixa Travels Blog'}
        description={blog.excerpt}
        canonicalUrl={`https://www.novixatravelsindia.com/blogs/${blog._id}`}
        ogImage={blog.featuredImage}
        structuredData={schema}
      />

      <main>
        <article>
          <h1>{blog.title}</h1>
          
          <img 
            {...optimizeImage(
              blog.featuredImage, 
              blog.title,
              'Featured image for ' + blog.title
            )}
          />

          <p className="byline">
            Written by {blog.author} | Published: {blog.publishedDate}
          </p>

          <div dangerouslySetInnerHTML={{ __html: blog.content }} />

          <footer>
            <p>Topics: {blog.tags?.join(', ')}</p>
          </footer>
        </article>

        <section>
          <h2>Related Articles</h2>
          {/* Related blog posts */}
        </section>
      </main>
    </>
  );
}
*/

// ============================================
// Example 4: Package/Product Page with SEO
// ============================================
/*
import React from 'react';
import SEOMeta from '@/components/SEOMeta';
import { productSchema } from './utils/schemaMarkup';
import { optimizeImage } from './utils/seoHelpers';

export default function Package({ package }) {
  const schema = productSchema({
    name: package.name,
    description: package.description,
    image: package.image,
    price: package.price,
    rating: {
      value: package.rating,
      count: package.reviewCount
    }
  });

  return (
    <>
      <SEOMeta 
        title={package.name + ' | Tour Package | Novixa Travels'}
        description={package.excerpt}
        canonicalUrl={`https://www.novixatravelsindia.com/services/packages/${package._id}`}
        ogImage={package.image}
        structuredData={schema}
      />

      <main>
        <h1>{package.name}</h1>

        <img 
          {...optimizeImage(
            package.image,
            package.name,
            package.name + ' tour package'
          )}
        />

        <section>
          <h2>Package Details</h2>
          <p>{package.description}</p>
          <p><strong>Price:</strong> ₹{package.price}</p>
          <p><strong>Duration:</strong> {package.duration} days</p>
        </section>

        <section>
          <h2>Itinerary</h2>
          {package.itinerary?.map((day, i) => (
            <div key={i}>
              <h3>Day {i + 1}: {day.title}</h3>
              <p>{day.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>What's Included</h2>
          <ul>
            {package.inclusions?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Customer Reviews</h2>
          {/* Customer testimonials with schema markup */}
        </section>
      </main>
    </>
  );
}
*/

// ============================================
// Example 5: Destination Page with SEO
// ============================================
/*
import React from 'react';
import SEOMeta from '@/components/SEOMeta';
import { serviceSchema } from './utils/schemaMarkup';
import { optimizeImage } from './utils/seoHelpers';

export default function Destination({ destination }) {
  const meta = {
    title: `${destination.name} Travel Guide | Tours, Flights & Hotels | Novixa Travels`,
    description: `Plan your ${destination.name} trip with Novixa Travels. Discover tours, flights, hotels, and travel tips for ${destination.name}.`,
    keywords: `${destination.name} travel, ${destination.name} tour, ${destination.name} hotels, ${destination.name} flights`,
    ogTitle: `${destination.name} - Your Travel Guide`,
    ogDescription: `Explore ${destination.name} with Novixa Travels. Book tours, flights, and accommodations.`,
    ogImage: destination.heroImage
  };

  const schema = serviceSchema(
    `Travel to ${destination.name}`,
    `Comprehensive travel guide and booking services for ${destination.name}`
  );

  return (
    <>
      <SEOMeta 
        {...meta}
        canonicalUrl={`https://www.novixatravelsindia.com/destination/${destination.slug}`}
        structuredData={schema}
      />

      <main>
        <h1>Travel to {destination.name} | Best Tours & Travel Guide</h1>

        <img 
          {...optimizeImage(
            destination.heroImage,
            `${destination.name} travel destination`,
            destination.name
          )}
        />

        <section>
          <h2>About {destination.name}</h2>
          <p>{destination.about}</p>
        </section>

        <section>
          <h2>Things to Do in {destination.name}</h2>
          <ul>
            {destination.attractions?.map((attr, i) => (
              <li key={i}>
                <strong>{attr.name}:</strong> {attr.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Tour Packages to {destination.name}</h2>
          {/* Related tour packages */}
        </section>

        <section>
          <h2>Best Time to Visit</h2>
          <p>{destination.bestTime}</p>
        </section>

        <section>
          <h2>Travel Guide</h2>
          <h3>Getting There</h3>
          <p>{destination.travelGuide?.getting}</p>

          <h3>Where to Stay</h3>
          <p>{destination.travelGuide?.accommodation}</p>

          <h3>What to Eat</h3>
          <p>{destination.travelGuide?.food}</p>

          <h3>Safety Tips</h3>
          <p>{destination.travelGuide?.safety}</p>
        </section>
      </main>
    </>
  );
}
*/

export default {
  note: "These are example implementations. Copy the patterns to your actual page files."
};
