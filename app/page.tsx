import Image from "next/image";
import { BrandMark } from "../components/BrandMark";
import { ContactForm } from "../components/ContactForm";
import { processSteps, services } from "../data/content";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a href="#inicio" className="brand-link">
          <BrandMark label />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#enfoque">Enfoque</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <section id="inicio" className="hero-section">
        <Image
          className="hero-image"
          src="/images/hero-transformacion.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-content">
          <h1>Transformación & IA</h1>
          <p className="hero-line">Estrategia + Personas + Procesos + Tecnología</p>
          <p className="hero-copy">
            Acompañamos a empresas e instituciones educativas en sus procesos de transformación,
            integrando estrategia, tecnología, inteligencia artificial y desarrollo de capacidades
            para responder a nuevos desafíos y oportunidades.
          </p>
          <a className="primary-link" href="#rutas">
            Elegí tu ruta
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="next-hint">Transformación antes que herramientas.</div>
      </section>

      <section id="rutas" className="routes-section" aria-labelledby="rutas-title">
        <div className="section-heading">
          <p>Dos rutas. Un propósito.</p>
          <h2 id="rutas-title">Integrar IA con estrategia, criterio y humanidad.</h2>
        </div>
        <div className="route-grid">
          <a href="#empresas" className="route-card route-empresas">
            <span className="route-icon" aria-hidden="true">⌁</span>
            <span>EMPRESAS</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="#educacion" className="route-card route-educacion">
            <span className="route-icon" aria-hidden="true">◫</span>
            <span>EDUCACIÓN</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section id="enfoque" className="approach-section">
        <div className="approach-copy">
          <p className="section-label">Nuestro enfoque</p>
          <h2>La IA como capacidad organizacional, no como moda tecnológica.</h2>
        </div>
        <p>
          Trabajamos desde una mirada integral, combinando innovación, tecnología y cambio
          organizacional para impulsar mejoras sostenibles en los procesos, fortalecer la toma de
          decisiones y generar nuevas formas de crear valor.
        </p>
      </section>

      <section id="servicios" className="services-shell">
        <ServiceRoute
          id="empresas"
          label="Ruta Empresas"
          title="Convertimos la IA en ventaja estratégica y sostenible."
          items={services.empresas}
        />
        <ServiceRoute
          id="educacion"
          label="Ruta Educación"
          title="Impulsamos instituciones que enseñan y aprenden con visión de futuro."
          items={services.educacion}
          education
        />
      </section>

      <section className="process-section" aria-labelledby="proceso-title">
        <div className="section-heading">
          <p>Nuestro proceso de transformación</p>
          <h2 id="proceso-title">Del entendimiento a resultados sostenibles.</h2>
        </div>
        <ol className="process-list">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="contacto" className="contact-section">
        <Image
          className="contact-image"
          src="/images/contacto-proceso.png"
          alt=""
          fill
          sizes="100vw"
        />
        <div className="contact-copy">
          <p className="section-label">Hablemos</p>
          <h2>Conversemos sobre el próximo paso de tu organización.</h2>
          <p>
            Una primera conversación alcanza para ordenar prioridades, detectar oportunidades y
            decidir por dónde conviene empezar.
          </p>
        </div>
        <ContactForm />
      </section>

      <footer className="site-footer">
        <BrandMark />
        <p>Consultoría IA FMC</p>
        <p>Acompañamos transformaciones con impacto sostenible.</p>
        <a href="#contacto">Contacto</a>
      </footer>

      <a className="sticky-contact" href="#contacto" aria-label="Ir al formulario de contacto">
        Contactar
      </a>
      <a
        className="whatsapp-contact"
        href="https://wa.me/5491130097978?text=Hola%2C%20quiero%20consultar%20por%20Consultor%C3%ADa%20IA%20FMC."
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <span aria-hidden="true">WA</span>
      </a>
    </main>
  );
}

function ServiceRoute({
  id,
  label,
  title,
  items,
  education = false
}: {
  id: string;
  label: string;
  title: string;
  items: { title: string; body: string }[];
  education?: boolean;
}) {
  return (
    <section id={id} className={`service-route ${education ? "education" : ""}`}>
      <div className="service-intro">
        <p className="section-label">{label}</p>
        <h2>{title}</h2>
      </div>
      <div className="service-list">
        {items.map((item, index) => (
          <article key={item.title} className="service-row">
            <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
            <span className="service-arrow" aria-hidden="true">→</span>
          </article>
        ))}
      </div>
    </section>
  );
}
