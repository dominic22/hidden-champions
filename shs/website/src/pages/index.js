import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import SiteNavbar from "../components/SiteNavbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import CostComparison from "../components/CostComparison";
import Process from "../components/Process";
import About from "../components/About";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function IndexPage() {
  return (
    <main className="min-h-screen bg-cream">
      <SiteNavbar />
      <Hero />
      <Services />
      <CostComparison />
      <Process />
      <About />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}

export function Head() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const { title, description } = data.site.siteMetadata;

  return (
    <>
      <html lang="de" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}
