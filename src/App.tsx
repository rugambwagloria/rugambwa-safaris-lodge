import { FormEvent, useEffect, useState } from "react";
import lodgeAFrame from "./assets/lodge-a-frame.png";
import lodgeGarden from "./assets/lodge-garden.png";
import lodgeRoom from "./assets/lodge-room.png";
import lodgeVeranda from "./assets/lodge-veranda.png";
import gazeboFireplace from "./assets/gazebo_fireplace.png";
import backyard from "./assets/bachyard.png";
import cozyBedroom from "./assets/cozy_bedroom.png";
import gazeboFeels from "./assets/gazebo_feels.png";
import outdoorCard from "./assets/outdoor_card.png";
import nightDining from "./assets/night dining.png";
import roasts from "./assets/roasts.png";
import meals from "./assets/meals.png";
import fineDine from "./assets/fine dine.png";
import drinks from "./assets/drinks.png";
import fishing from "./assets/fishing.png";
import communityGathering from "./assets/community gathering.png";
import craftMarket from "./assets/craft market.png";
import vegetery from "./assets/vegetery.png";
import forestWalks from "./assets/forestwalks.png";

const photos = {
  hero: lodgeGarden,
  aFrame: lodgeAFrame,
  room: lodgeRoom,
  veranda: lodgeVeranda,
  road: "https://images.unsplash.com/photo-1761069346828-2ca360f8fa3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxVZ2FuZGElMjBncmVlbiUyMGhpbGxzJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc5MjI1MTEyMXww&ixlib=rb-4.1.0&q=85&w=1200",
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <path d="M35.5 8.5C22 8 12.5 15.2 11.8 28.2c7.5 2.8 14.1.8 18.3-4.7 3-4 4.4-9 5.4-15Z" />
      <path d="M8.5 35.5c5.4-8.2 11.5-13.6 21.8-18.9" />
    </svg>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(window.scrollY > 24);

  useEffect(() => {
    let previousY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 24);

      if (currentY < 80) {
        setHidden(false);
      } else if (Math.abs(currentY - previousY) > 4) {
        setHidden(currentY > previousY);
      }

      previousY = currentY;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${hidden && !menuOpen ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header-inner shell">
        <a className="brand site-brand" href="/" aria-label="Rugambwa Safaris Lodge home" onClick={closeMenu}>
          <LeafMark />
          <span>
            Rugambwa
            <small>Safaris Lodge</small>
          </span>
        </a>
        <button
          className={`site-menu-button${menuOpen ? " is-open" : ""}`}
          aria-label={menuOpen ? "Close site navigation" : "Open site navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => {
            setHidden(false);
            setMenuOpen(!menuOpen);
          }}
        >
          <span /><span />
        </button>
      </div>
      <nav
        className={`site-menu${menuOpen ? " is-open" : ""}`}
        id="site-navigation"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        <div className="site-menu-heading">
          <p className="eyebrow light">Your stay, your way</p>
          <h2>Find your next<br /><em>moment.</em></h2>
        </div>
        <div className="site-menu-links">
          <a href="/" aria-current={window.location.pathname === "/" ? "page" : undefined} onClick={closeMenu}>
            <span className="site-menu-number">01</span><span className="site-menu-label">Home</span><ArrowIcon />
          </a>
          <a href="/stay" aria-current={window.location.pathname === "/stay" ? "page" : undefined} onClick={closeMenu}>
            <span className="site-menu-number">02</span><span className="site-menu-label">Stay</span><ArrowIcon />
          </a>
          <a href="/dine" aria-current={window.location.pathname === "/dine" ? "page" : undefined} onClick={closeMenu}>
            <span className="site-menu-number">03</span><span className="site-menu-label">Dine</span><ArrowIcon />
          </a>
          <a href="/travel" aria-current={window.location.pathname === "/travel" ? "page" : undefined} onClick={closeMenu}>
            <span className="site-menu-number">04</span><span className="site-menu-label">Travel</span><ArrowIcon />
          </a>
          <a href="/explore" aria-current={window.location.pathname === "/explore" ? "page" : undefined} onClick={closeMenu}>
            <span className="site-menu-number">05</span><span className="site-menu-label">Explore</span><ArrowIcon />
          </a>
        </div>
        <a className="site-menu-footer" href="/#book" onClick={closeMenu}>
          <span>Ready when you are</span>
          Plan your stay <ArrowIcon />
        </a>
      </nav>
    </header>
  );
}

function useScrollReveals(pageSelector: string) {
  useEffect(() => {
    const page = document.querySelector(pageSelector);
    if (!page) return;

    const targets = page.querySelectorAll<HTMLElement>(
      ".stay-feature-copy, .dine-feature-copy, .explore-feature-copy",
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    page.classList.add("scroll-reveals-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      page.classList.remove("scroll-reveals-ready");
    };
  }, [pageSelector]);
}

const services = [
  {
    number: "01",
    title: "Stay",
    text: "Restful rooms wrapped in quiet, soft linens, and windows that open to green hills.",
  },
  {
    number: "02",
    title: "Dine",
    text: "Wholesome meals inspired by Kigezi, prepared with fresh, locally sourced ingredients.",
  },
  {
    number: "03",
    title: "Travel",
    text: "Reliable transport for airport transfers, local excursions, and your onward safari.",
  },
  {
    number: "04",
    title: "Explore",
    text: "Thoughtful local guidance and simple bookings for memorable days in the highlands.",
  },
];

export default function App() {
  const [sent, setSent] = useState(false);

  if (window.location.pathname === "/stay") {
    return <StayPage />;
  }

  if (window.location.pathname === "/dine") {
    return <DinePage />;
  }

  if (window.location.pathname === "/travel") {
    return <TravelPage />;
  }

  if (window.location.pathname === "/explore") {
    return <ExplorePage />;
  }

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <SiteHeader />
      <section className="hero" id="home">
        <img className="hero-image" src={photos.hero} alt="Garden lounge surrounded by lush greenery at Rugambwa Safaris Lodge" />
        <div className="hero-shade" />

        <div className="hero-content shell">
          <p className="eyebrow light">Welcome to the highlands of Kigezi</p>
          <h1>Come for the view.<br /><em>Stay for the feeling.</em></h1>
          <p className="hero-copy">
            A peaceful hillside hideaway where nature, warm Ugandan hospitality,
            and unhurried days come together.
          </p>
          <a className="button button-light" href="#stay">
            Discover the lodge <ArrowIcon />
          </a>
        </div>
        <div className="hero-bottom shell">
          <span>01° 15′ S</span>
          <span>29° 59′ E</span>
          <a href="#stay" aria-label="Scroll to discover">Scroll to discover <i>↓</i></a>
        </div>
      </section>

      <section className="intro shell" id="stay">
        <div>
          <p className="eyebrow">At home in Kigezi</p>
          <h2>Slow down.<br />Breathe deeper.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Tucked among the rolling hills of southwestern Uganda, Rugambwa Safaris
            Lodge is a calm base for curious travellers and quiet seekers alike.
          </p>
          <p>
            Wake to birdsong, share a generous meal, and let our team take care of
            every detail—from your room to the road ahead.
          </p>
          <a className="text-link" href="#about">Our story <ArrowIcon /></a>
        </div>
      </section>

      <section className="gallery shell" aria-label="Lodge gallery">
        <figure className="gallery-main">
          <img src={photos.aFrame} alt="Airy A-frame lodge suite with a wide view outdoors" />
          <figcaption>Open, airy and close to nature</figcaption>
        </figure>
        <figure className="gallery-small">
          <img src={photos.room} alt="Comfortable lodge bedroom opening onto a green view" />
          <figcaption>Rooms made for resting</figcaption>
        </figure>
        <figure className="gallery-accent">
          <img src={photos.veranda} alt="Lodge veranda overlooking the green landscape" />
          <figcaption>Views worth slowing down for</figcaption>
        </figure>
      </section>

      <section className="services" id="experience">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow light">Everything you need, gently handled</p>
            <h2>A stay shaped<br />around <em>you.</em></h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a
                  href={
                    service.title === "Stay"
                      ? "/stay"
                      : service.title === "Dine"
                        ? "/dine"
                        : service.title === "Travel"
                          ? "/travel"
                          : service.title === "Explore"
                            ? "/explore"
                          : "#book"
                  }
                  aria-label={
                    service.title === "Stay"
                      ? "Explore our stay"
                      : service.title === "Dine"
                        ? "Explore dining at the lodge"
                        : service.title === "Travel"
                          ? "Explore travel services"
                          : service.title === "Explore"
                            ? "Explore activities at the lodge"
                          : `Enquire about ${service.title}`
                  }
                >
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="founder shell" id="about">
        <div className="founder-visual">
          <img src={photos.road} alt="A quiet road winding through the green hills of Uganda" />
          <div className="founder-monogram">
            <span>RG</span>
            <small>Founder</small>
          </div>
        </div>
        <div className="founder-copy">
          <p className="eyebrow">A note from our founder</p>
          <h2>Rooted in place.<br /><em>Made with heart.</em></h2>
          <blockquote>
            “I wanted to create a place that feels like the Kigezi I know—generous,
            beautiful, and ready to welcome you.”
          </blockquote>
          <p>
            <strong>Rugambwa Gloria</strong> founded Rugambwa Safaris Lodge from a
            love of her home region and a belief that travel should feel personal.
            Her vision brings together thoughtful hospitality, local connection,
            and the restorative calm of the highlands.
          </p>
          <div className="signature">Rugambwa Gloria</div>
        </div>
      </section>

      <section className="booking" id="book">
        <div className="shell booking-wrap">
          <div className="booking-intro">
            <p className="eyebrow">Your highland escape awaits</p>
            <h2>Let’s plan your<br /><em>stay.</em></h2>
            <p>Tell us a little about your trip and our team will help shape the rest.</p>
          </div>
          {sent ? (
            <div className="booking-success" role="status">
              <LeafMark />
              <h3>Thank you.</h3>
              <p>Your enquiry is ready. We’ll be in touch to help plan your Kigezi stay.</p>
              <button onClick={() => setSent(false)}>Send another enquiry</button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={submitBooking}>
              <label>
                Your name
                <input name="name" placeholder="e.g. Amara" required />
              </label>
              <label>
                Email address
                <input name="email" type="email" placeholder="you@example.com" required />
              </label>
              <label>
                Check-in
                <input name="arrival" type="date" required />
              </label>
              <label>
                Guests
                <select name="guests" defaultValue="2">
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4+ guests</option>
                </select>
              </label>
              <button className="button button-dark" type="submit">
                Send enquiry <ArrowIcon />
              </button>
            </form>
          )}
        </div>
      </section>

      <footer id="contact">
        <div className="shell footer-top">
          <a className="brand" href="#home">
            <LeafMark />
            <span>Rugambwa<small>Safaris Lodge</small></span>
          </a>
          <p>Come as a guest.<br />Leave as a friend.</p>
          <div>
            <span>Find us</span>
            <p>Highlands of Kigezi<br />Southwestern Uganda</p>
          </div>
          <div>
            <span>Contact</span>
            <a href="mailto:hello@rugambwasafaris.com">hello@rugambwasafaris.com</a>
            <a href="tel:+256700000000">+256 700 000 000</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Rugambwa Safaris Lodge</span>
          <span>Hospitality, naturally.</span>
        </div>
      </footer>
    </main>
  );
}

function StayPage() {
  useScrollReveals(".stay-page");

  return (
    <main className="stay-page">
      <SiteHeader />

      <section className="stay-intro shell">
        <p className="eyebrow">Stay a little longer</p>
        <h1>Find your quiet<br /><em>place to unwind.</em></h1>
        <p>Gather around the fire, take in the gardens, and make room for a slower moment at Rugambwa Safaris Lodge.</p>
      </section>

      <section className="stay-features shell" aria-label="Places to relax">
        <article className="stay-feature">
          <figure className="stay-image-frame">
            <img src={gazeboFireplace} alt="Outdoor gazebo with a warm, hand-laid fireplace" />
          </figure>
          <div className="stay-feature-copy">
            <p className="eyebrow">01 / Fireside evenings</p>
            <h2>The fireplace<br /><em>gazebo.</em></h2>
            <p>
              Escape the chill of the evening air inside our beautifully crafted
              outdoor pavilion. Anchored by a majestic, hand-laid hearth, the
              fireplace gazebo offers a private, starlit haven for cozying up
              with someone special. Sip a glass of wine to the rhythmic dance
              of the flames, wrap yourselves in plush blankets, and let the
              ambient glow melt the rest of the world away.
            </p>
          </div>
        </article>
        <article className="stay-feature stay-feature-reverse">
          <figure className="stay-image-frame">
            <img src={backyard} alt="Peaceful landscaped backyard and pavilion at the lodge" />
          </figure>
          <div className="stay-feature-copy">
            <p className="eyebrow">02 / A peaceful pause</p>
            <h2>A breath of<br /><em>fresh air.</em></h2>
            <p>
              Step away from the road and into a moment of pure relaxation.
              Surrounded by beautifully landscaped grounds, our pavilion
              fireplace serves as the perfect roadside sanctuary. Unwind by the
              gentle warmth of the hearth, stretch your legs, and enjoy a quiet
              moment to recharge before continuing your journey. It is more
              than just a stop—it is a peaceful breath of fresh air.
            </p>
          </div>
        </article>
        <article className="stay-feature">
          <figure className="stay-image-frame">
            <img src={cozyBedroom} alt="Warm lodge bedroom with a thatched ceiling and a view of the greenery" />
          </figure>
          <div className="stay-feature-copy">
            <p className="eyebrow">03 / Rest well</p>
            <h2>Your own<br /><em>quiet retreat.</em></h2>
            <p>
              After a day exploring the highlands, come back to a welcoming room
              made for slowing down. Settle into the comfortable bed, enjoy a
              warm drink, and take in the garden through the open windows. Here,
              restful nights and gentle mornings come naturally.
            </p>
          </div>
        </article>
        <article className="stay-feature stay-feature-reverse">
          <figure className="stay-image-frame">
            <img src={gazeboFeels} alt="Garden sign welcoming family, friends, and guests to relax and enjoy" />
          </figure>
          <div className="stay-feature-copy">
            <p className="eyebrow">04 / Together outdoors</p>
            <h2>Make time<br /><em>for each other.</em></h2>
            <p>
              Gather your favourite people and let the day unfold at its own
              pace. Share stories, enjoy something delicious, and raise a glass
              in the greenery. Whether it is a family catch-up or a
              relaxed evening with friends, this is a lovely place to feel at
              home together.
            </p>
          </div>
        </article>
        <article className="stay-feature">
          <figure className="stay-image-frame">
            <img src={outdoorCard} alt="Shaded outdoor lounge with cushioned seating beneath a thatched pavilion" />
          </figure>
          <div className="stay-feature-copy">
            <p className="eyebrow">05 / The garden lounge</p>
            <h2>Settle into<br /><em>the outdoors.</em></h2>
            <p>
              Find a comfortable seat beneath the thatched pavilion and enjoy a
              little pause in the open air. Surrounded by tropical greenery, it
              is an inviting spot for a quiet conversation, a refreshing drink,
              or simply watching the afternoon drift by.
            </p>
          </div>
        </article>
      </section>

      <section className="stay-cta">
        <div className="shell">
          <p className="eyebrow light">Your highland escape awaits</p>
          <h2>Make room for<br /><em>a slower moment.</em></h2>
          <a className="button button-light" href="/#book">Plan your stay <ArrowIcon /></a>
        </div>
      </section>
    </main>
  );
}

function DinePage() {
  useScrollReveals(".dine-page");

  return (
    <main className="dine-page">
      <SiteHeader />

      <section className="dine-hero shell">
        <img src={fineDine} alt="Outdoor dining tables set beneath a leafy tree for an evening meal" />
        <div className="dine-hero-shade" />
        <div className="dine-hero-copy">
          <p className="eyebrow light">Fresh from the fire, close to the land</p>
          <h1>A taste of<br /><em>the wild.</em></h1>
          <p>Good food, open skies, and time around the table.</p>
        </div>
      </section>

      <section className="dine-intro shell">
        <p className="eyebrow">Gather, share, savour</p>
        <p>
          Dining at Rugambwa is unhurried and rooted in the land. Our kitchen
          serves fresh, flame-grilled and locally inspired dishes, shared
          outdoors under the trees, with the sounds of the wild around you.
        </p>
      </section>

      <section className="dine-features shell" aria-label="Dining at Rugambwa">
        <article className="dine-feature">
          <figure className="dine-image-frame">
            <img src={nightDining} alt="Lantern-lit garden dining beneath trees at night" />
          </figure>
          <div className="dine-feature-copy">
            <p className="eyebrow">01 / Under the stars</p>
            <h2>Garden<br /><em>dining.</em></h2>
            <p className="dine-tagline">Lantern-lit evenings under the trees</p>
            <p>
              As dusk settles, the lawn comes alive with the glow of woven
              lanterns and strings of lights wound through the trees. Gather
              around low timber tables, sink into soft floor cushions, and
              share a meal beneath the open sky. Fresh flowers and flickering
              candles set the scene for long, relaxed evenings with the people
              you love.
            </p>
          </div>
        </article>
        <article className="dine-feature dine-feature-reverse">
          <figure className="dine-image-frame">
            <img src={roasts} alt="Flame-grilled meat skewers served on fresh banana leaves" />
          </figure>
          <div className="dine-feature-copy">
            <p className="eyebrow">02 / The safari grill</p>
            <h2>Skewers on<br /><em>banana leaf.</em></h2>
            <p className="dine-tagline">Flame-grilled skewers, served on banana leaf</p>
            <p>
              Our grill is the heart of the evening. Marinated chicken, tender
              pork, spiced sausages and juicy bites are threaded onto skewers
              and cooked over open flame until smoky and caramelised. They’re
              served hot on fresh banana leaves, as they would be at a bustling
              local night market. Order a few to share, or make a feast of it.
            </p>
          </div>
        </article>
        <article className="dine-feature">
          <figure className="dine-image-frame">
            <img src={meals} alt="Golden plantain and banana chips in baskets lined with banana leaves" />
          </figure>
          <div className="dine-feature-copy">
            <p className="eyebrow">03 / A golden little something</p>
            <h2>Crispy plantain<br /><em>&amp; banana chips.</em></h2>
            <p className="dine-tagline">Golden, crunchy and made in-house</p>
            <p>
              Golden, crunchy and lightly salted, our house-fried plantain and
              banana chips are served in woven baskets lined with fresh banana
              leaves. Choose from thin crisps, thick-cut chips and sweet
              caramelised slices. They’re ideal with a sundowner, a side to the
              grill, or a snack while you plan tomorrow’s game drive.
            </p>
          </div>
        </article>
        <article className="dine-feature dine-feature-reverse">
          <figure className="dine-image-frame">
            <img src={drinks} alt="Fresh fruit coolers and citrus drinks served over ice in the garden" />
          </figure>
          <div className="dine-feature-copy">
            <p className="eyebrow">04 / Fresh coolers &amp; sundowners</p>
            <h2>A little<br /><em>refreshment.</em></h2>
            <p className="dine-tagline">Fresh, fruity and served ice-cold</p>
            <p>
              Refresh yourself with our chilled drinks station. Help yourself
              to crisp lemon and mint water with fresh citrus slices, or a ruby
              fruit punch with berries and orange. We also serve sparkling
              rosemary-and-grapefruit coolers and sunny orange refreshers
              topped with fresh raspberries. Served over ice in cut-crystal
              glasses, they’re the perfect way to end a day in the wild.
            </p>
          </div>
        </article>
      </section>

      <section className="stay-cta">
        <div className="shell">
          <p className="eyebrow light">Good food tastes better together</p>
          <h2>Pull up a chair.<br /><em>Stay for supper.</em></h2>
          <a className="button button-light" href="/#book">Plan your stay <ArrowIcon /></a>
        </div>
      </section>
    </main>
  );
}

function TravelPage() {
  return (
    <main className="travel-page">
      <SiteHeader />

      <section className="travel-hero shell">
        <img src={photos.road} alt="A quiet road winding through the green hills of Uganda" />
        <div className="travel-hero-shade" />
        <div className="travel-hero-copy">
          <p className="eyebrow light">The highlands are closer than you think</p>
          <h1>The road ahead.<br /><em>Handled with care.</em></h1>
          <p>Reliable transport for airport transfers, local excursions, and your onward safari.</p>
          <a className="button button-light" href="/#contact">Plan your journey <ArrowIcon /></a>
        </div>
        <span className="travel-hero-note">Southwestern Uganda · Kigezi Highlands</span>
      </section>

      <section className="travel-intro shell">
        <p className="eyebrow">From here to wherever next</p>
        <p>
          Getting there should feel like part of the adventure. Tell our team
          where your journey begins and where you’d like to go, and we’ll help
          arrange transport around your stay and travel plans.
        </p>
      </section>

      <section className="travel-options shell" aria-label="Travel services">
        <div className="travel-section-heading">
          <div>
            <p className="eyebrow">A smoother way to explore</p>
            <h2>Three ways<br />to <em>get moving.</em></h2>
          </div>
          <p>One thoughtful team to help you make the most of the journey, near and far.</p>
        </div>
        <div className="travel-card-grid">
          <article className="travel-card">
            <span className="travel-card-number">01</span>
            <div className="travel-card-mark" aria-hidden="true">↗</div>
            <p className="eyebrow">A warm welcome</p>
            <h3>Airport<br /><em>transfers.</em></h3>
            <p>Arrive with one less thing to think about. Arrange a pickup to the lodge or transport for your onward departure.</p>
          </article>
          <article className="travel-card travel-card-featured">
            <span className="travel-card-number">02</span>
            <div className="travel-card-mark" aria-hidden="true">⌖</div>
            <p className="eyebrow">Take the scenic route</p>
            <h3>Local<br /><em>excursions.</em></h3>
            <p>Explore the Kigezi region at your own pace, with local transport planned around the places you’d like to visit.</p>
          </article>
          <article className="travel-card">
            <span className="travel-card-number">03</span>
            <div className="travel-card-mark" aria-hidden="true">→</div>
            <p className="eyebrow">Keep the adventure going</p>
            <h3>Your onward<br /><em>safari.</em></h3>
            <p>Heading to your next stop? Let us know your itinerary and we’ll help coordinate the next leg of your journey.</p>
          </article>
        </div>
      </section>

      <section className="travel-planning">
        <div className="shell travel-planning-wrap">
          <div>
            <p className="eyebrow light">A few details make all the difference</p>
            <h2>Let’s make a<br /><em>good plan.</em></h2>
            <p>Share what you know so far. Our team can help you work out the rest.</p>
            <a className="button button-light" href="/#contact">Talk to our team <ArrowIcon /></a>
          </div>
          <div className="travel-checklist">
            <p><span>01</span> Where you’d like to be picked up and dropped off</p>
            <p><span>02</span> Your travel date and preferred timing</p>
            <p><span>03</span> How many people are travelling</p>
            <p><span>04</span> Your next stop or excursion plans</p>
            <p><span>05</span> Any luggage or accessibility needs</p>
          </div>
        </div>
      </section>

      <section className="travel-cta shell">
        <p className="eyebrow">Your journey, your pace</p>
        <h2>Tell us where<br /><em>you’re headed.</em></h2>
        <a className="text-link" href="/#contact">Get in touch to plan your trip <ArrowIcon /></a>
      </section>
    </main>
  );
}

function ExplorePage() {
  useScrollReveals(".explore-page");

  return (
    <main className="explore-page">
      <SiteHeader />

      <section className="explore-hero shell">
        <img src={photos.road} alt="Green hills and a quiet road in southwestern Uganda" />
        <div className="explore-hero-shade" />
        <div className="explore-hero-copy">
          <p className="eyebrow light">Beyond the lodge</p>
          <h1>Step outside.<br /><em>Find your wild.</em></h1>
          <p>Meet the landscape, traditions and people that make this place feel like nowhere else.</p>
          <a className="button button-light" href="#explore-activities">Explore the highlands <ArrowIcon /></a>
        </div>
        <span className="explore-hero-note">Kigezi Highlands · Southwestern Uganda</span>
      </section>

      <section className="explore-intro shell">
        <p className="eyebrow">A little closer to nature</p>
        <p>
          Beyond the lodge, Rugambwa opens onto forest trails, a working river,
          local craft traditions and gardens that feed our kitchen. Slow down,
          step outside and discover the landscape and the people who shape it.
        </p>
      </section>

      <section className="explore-features shell" id="explore-activities" aria-label="Things to explore">
        <article className="explore-feature">
          <figure className="explore-image-frame">
            <img src={forestWalks} alt="Shaded forest trail winding beneath a canopy of trees" />
          </figure>
          <div className="explore-feature-copy">
            <p className="eyebrow">01 / Forest trails</p>
            <h2>Walk beneath<br /><em>the canopy.</em></h2>
            <p className="explore-tagline">Sun-dappled walks through the trees</p>
            <p>
              Follow sun-dappled paths through tall, whispering trees and mossy
              hillsides. Our guided forest walks are gentle and unhurried, with
              time to listen for birdsong, spot wildlife and breathe in the cool,
              green air. Go out in the early morning for soft golden light, or
              in the late afternoon when the forest glows. Suitable for all
              fitness levels.
            </p>
          </div>
        </article>
        <article className="explore-feature explore-feature-reverse">
          <figure className="explore-image-frame">
            <img src={fishing} alt="Local fishermen casting a net from wooden boats at sunset" />
          </figure>
          <div className="explore-feature-copy">
            <p className="eyebrow">02 / Sunset fishing</p>
            <h2>Life along<br /><em>the river.</em></h2>
            <p className="explore-tagline">Cast nets at golden hour</p>
            <p>
              Join local fishermen on the water as the sky turns amber and gold.
              Watch them cast their nets from traditional wooden boats, a skill
              passed down through generations, and see the day’s catch hauled
              in. It’s a quiet, authentic look at river life, and a favourite
              for photographers. The fresh catch can be enjoyed at the lodge’s
              dining table.
            </p>
          </div>
        </article>
        <article className="explore-feature">
          <figure className="explore-image-frame">
            <img src={communityGathering} alt="Guests and local artisans gathered around a creative workshop table" />
          </figure>
          <div className="explore-feature-copy">
            <p className="eyebrow">03 / Craft circles</p>
            <h2>Create together<br /><em>under the trees.</em></h2>
            <p className="explore-tagline">Create something with local artisans</p>
            <p>
              Sit together under the trees and make something with your hands.
              Our outdoor workshops bring guests and skilled local artisans
              around shared tables for jewellery-making, natural crafts and
              creative sessions, surrounded by greenery. Tools and materials
              are provided, no experience is needed, and you leave with a
              keepsake made by you.
            </p>
          </div>
        </article>
        <article className="explore-feature explore-feature-reverse">
          <figure className="explore-image-frame">
            <img src={craftMarket} alt="Handmade crafts, ceramics and woven goods at a local craft market" />
          </figure>
          <div className="explore-feature-copy">
            <p className="eyebrow">04 / The craft market</p>
            <h2>Handmade<br /><em>to take home.</em></h2>
            <p className="explore-tagline">Handmade treasures to take home</p>
            <p>
              Browse a curated selection of handmade goods from local makers:
              woven baskets and wall pieces, hand-thrown ceramics, candles,
              carved wooden decor and more. Each item is crafted by hand, so
              every purchase supports the artisans in our community and gives
              you a meaningful souvenir to take home.
            </p>
          </div>
        </article>
        <article className="explore-feature">
          <figure className="explore-image-frame">
            <img src={vegetery} alt="Fresh lettuces and leafy vegetables growing in the lodge kitchen garden" />
          </figure>
          <div className="explore-feature-copy">
            <p className="eyebrow">05 / The kitchen garden</p>
            <h2>From soil<br /><em>to supper.</em></h2>
            <p className="explore-tagline">From soil to supper</p>
            <p>
              Walk the rows of our organic garden, where crisp lettuces, leafy
              greens, herbs and fruit trees grow in the open air with the hills
              as a backdrop. Much of what you see here ends up on your plate,
              so you can meet your meal before you eat it. Garden tours are
              relaxed and informative, and our team is happy to share how we
              grow.
            </p>
          </div>
        </article>
      </section>

      <section className="stay-cta">
        <div className="shell">
          <p className="eyebrow light">The best moments happen outdoors</p>
          <h2>Take the long way.<br /><em>Stay a little longer.</em></h2>
          <a className="button button-light" href="/#book">Plan your stay <ArrowIcon /></a>
        </div>
      </section>
    </main>
  );
}
