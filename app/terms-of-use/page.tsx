import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | Champions Premier",
  description:
    "Champions Premier's terms of use for accessing and using our website and services.",
  alternates: {
    canonical: "https://www.championspremier.net/terms-of-use",
  },
};

const SECTIONS = [
  {
    title: "1. Terms",
    body:
      "By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade mark law.",
  },
  {
    title: "2. Use License",
    body:
      "Permission is granted to temporarily download one copy of the materials (information or software) on Champions Premier's web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on Champions Premier's web site; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or \"mirror\" the materials on any other server. This license shall automatically terminate if you violate any of these restrictions and may be terminated by Champions Premier at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.",
  },
  {
    title: "3. Disclaimer",
    body:
      "The materials on Champions Premier's web site are provided \"as is\". Champions Premier makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Champions Premier does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.",
  },
  {
    title: "4. Limitations",
    body:
      "In no event shall Champions Premier or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Champions Premier's Internet site, even if Champions Premier or a Champions Premier authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.",
  },
  {
    title: "5. Revisions and Errata",
    body:
      "The materials appearing on Champions Premier's web site could include technical, typographical, or photographic errors. Champions Premier does not warrant that any of the materials on its web site are accurate, complete, or current. Champions Premier may make changes to the materials contained on its web site at any time without notice. Champions Premier does not, however, make any commitment to update the materials.",
  },
  {
    title: "6. Links",
    body:
      "Champions Premier has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Champions Premier of the site. Use of any such linked web site is at the user's own risk.",
  },
  {
    title: "7. Site Terms of Use Modifications",
    body:
      "Champions Premier may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.",
  },
  {
    title: "8. Governing Law",
    body:
      "Any claim relating to Champions Premier's web site shall be governed by the laws of the State without regard to its conflict of law provisions. General Terms and Conditions applicable to Use of a Web Site.",
  },
  {
    title: "9. Messaging",
    body:
      "We may send appointment confirmations, message notifications, and offers for free trial classes to existing clients or new clients who have opted in to receive SMS notifications. The communications are sent via in-person POS, website forms, or web chat. You can cancel the SMS service at any time. Simply text \"STOP\" to the shortcode. Upon sending \"STOP,\" we will confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did initially, and we will resume sending SMS messages to you. If you experience issues with the messaging program, reply with the keyword HELP for more assistance. Carriers are not liable for delayed or undelivered messages. Message and data rates may apply. Message frequency varies. For questions about your text plan or data plan, contact your wireless provider. For privacy-related inquiries, please refer to our privacy policy.",
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "100px" }}>
        <article
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "3rem 1.5rem 6rem",
            color: "#4b5563",
            lineHeight: 1.8,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "var(--text)",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Terms of Use
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
            Futbol Program Run By Pros in Northern Virginia
          </p>

          {SECTIONS.map((section) => (
            <section key={section.title} style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--text)",
                  marginBottom: "0.75rem",
                }}
              >
                {section.title}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
