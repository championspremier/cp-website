import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Champions Premier",
  description:
    "Champions Premier's privacy policy outlining how we collect, use, and protect personal information.",
  alternates: {
    canonical: "https://www.championspremier.net/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
            Futbol Program Run By Pros in Northern Virginia
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            Your privacy is very important to us. Accordingly, we have developed this
            Policy in order for you to understand how we collect, use, communicate,
            disclose, and make use of personal information. The following outlines our
            privacy policy.
          </p>

          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              Before or at the time of collecting personal information, we will identify
              the purposes for which information is being collected.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              We will collect and use personal information solely with the objective of
              fulfilling those purposes specified by us and for other compatible purposes,
              unless we obtain the consent of the individual concerned or as required by law.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              We will only retain personal information as long as necessary for the
              fulfillment of those purposes.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              We will collect personal information by lawful and fair means and, where
              appropriate, with the knowledge or consent of the individual concerned.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Personal data should be relevant to the purposes for which it is to be used,
              and, to the extent necessary for those purposes, should be accurate, complete,
              and up-to-date.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              We will protect personal information by reasonable security safeguards
              against loss or theft, as well as unauthorized access, disclosure, copying,
              use, or modification.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              We will make readily available to customers information about our policies
              and practices relating to the management of personal information.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              End-user mobile information will not be shared with third parties or affiliates.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              No mobile information will be shared with third parties or affiliates for
              marketing or promotional purposes. Information sharing to subcontractors in
              support services, such as customer service, is permitted. All other use case
              categories exclude text messaging originator opt-in data and consent; this
              information will not be shared with any third parties.
            </li>
          </ul>

          <p>
            We are committed to conducting our business in accordance with these principles
            in order to ensure that the confidentiality of personal information is protected
            and maintained.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
