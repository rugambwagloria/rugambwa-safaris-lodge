import { FormEvent, useState } from "react";
import lodgeAFrame from "./assets/lodge-a-frame.png";
import lodgeGarden from "./assets/lodge-garden.png";
import lodgeRoom from "./assets/lodge-room.png";
import lodgeVeranda from "./assets/lodge-veranda.png";
import gazeboFireplace from "./assets/gazebo_fireplace.png";
import backyard from "./assets/bachyard.png";
import cozyBedroom from "./assets/cozy_bedroom.png";
import gazeboFeels from "./assets/gazebo_feels.png";
import outdoorCard from "./assets/outdoor_card.png";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  if (window.location.pathname === "/stay") {
    return <StayPage />;
  }

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <section className="hero" id="home">
        <img className="hero-image" src={photos.hero} alt="Garden lounge surrounded by lush greenery at Rugambwa Safaris Lodge" />
        <div className="hero-shade" />
        <nav className="nav shell" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Rugambwa Safaris Lodge home">
            <LeafMark />
            <span>
              Rugambwa
              <small>Safaris Lodge</small>
            </span>
          </a>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#stay" onClick={() => setMenuOpen(false)}>Stay</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
          <a className="nav-book" href="#book">Plan your stay <ArrowIcon /></a>
          <button
            className="menu-button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span />
          </button>
        </nav>

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
                  href={service.title === "Stay" ? "/stay" : "#book"}
                  aria-label={service.title === "Stay" ? "Explore our stay" : `Enquire about ${service.title}`}
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
  return (
    <main className="stay-page">
      <header className="stay-header shell">
        <a className="brand stay-brand" href="/" aria-label="Rugambwa Safaris Lodge home">
          <LeafMark />
          <span>
            Rugambwa
            <small>Safaris Lodge</small>
          </span>
        </a>
        <a className="text-link" href="/">Back to the lodge <ArrowIcon /></a>
      </header>

      <section className="stay-intro shell">
        <p className="eyebrow">Stay a little longer</p>
        <h1>Find your quiet<br /><em>place to unwind.</em></h1>
        <p>Gather around the fire, take in the gardens, and make room for a slower moment at Rugambwa Safaris Lodge.</p>
      </section>

      <section className="stay-features shell" aria-label="Places to relax">
        <article className="stay-feature">
          <img src={gazeboFireplace} alt="Outdoor gazebo with a warm, hand-laid fireplace" />
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
          <img src={backyard} alt="Peaceful landscaped backyard and pavilion at the lodge" />
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
          <img src={cozyBedroom} alt="Warm lodge bedroom with a thatched ceiling and a view of the greenery" />
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
          <img src={gazeboFeels} alt="Garden sign welcoming family, friends, and guests to relax and enjoy" />
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
          <img src={outdoorCard} alt="Shaded outdoor lounge with cushioned seating beneath a thatched pavilion" />
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
