"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

// Modificar la función PrivacyPolicy para manejar correctamente las traducciones

export default function PrivacyPolicy() {
  const { t, language } = useLanguage()

  // Definir traducciones directamente en el componente para evitar problemas con las claves
  const translations = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated",
      intro:
        "At LEGRINO TEES, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.",
      infoCollect: {
        title: "Information We Collect",
        p1: "We may collect personal information that you voluntarily provide to us when you:",
        li1: "Register on our website",
        li2: "Place an order",
        li3: "Subscribe to our newsletter",
        li4: "Contact us via email, phone, or social media",
        li5: "Participate in promotions or surveys",
      },
      infoUse: {
        title: "How We Use Your Information",
        p1: "We may use the information we collect for various purposes, including to:",
        li1: "Process and fulfill your orders",
        li2: "Send you order confirmations and updates",
        li3: "Respond to your inquiries and provide customer support",
        li4: "Send you marketing communications (with your consent)",
        li5: "Improve our website, products, and services",
        li6: "Administer promotions, surveys, or contests",
        li7: "Protect against fraudulent or unauthorized transactions",
        li8: "Comply with legal obligations",
      },
      cookies: {
        title: "Cookies and Tracking Technologies",
        p1: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.",
      },
      thirdParty: {
        title: "Third-Party Disclosure",
        p1: "We may share your information with third parties that perform services for us or on our behalf, including payment processing, order fulfillment, data analysis, email delivery, hosting services, customer service, and marketing assistance.",
        p2: "We may also disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).",
      },
      security: {
        title: "Data Security",
        p1: "We implement appropriate technical and organizational measures to maintain the safety of your personal information. However, no Internet or email transmission is ever fully secure or error-free. In particular, emails sent to or from our website may not be secure. Therefore, you should take special care in deciding what information you send to us via email.",
      },
      rights: {
        title: "Your Rights",
        p1: "Depending on your location, you may have certain rights regarding your personal information, including:",
        li1: "The right to access the personal information we have about you",
        li2: "The right to request that we correct or update your personal information",
        li3: "The right to request that we delete your personal information",
        li4: "The right to opt-out of marketing communications",
      },
      changes: {
        title: "Changes to This Privacy Policy",
        p1: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.',
      },
      contact: {
        title: "Contact Us",
        p1: "If you have any questions about this Privacy Policy, please contact us at:",
        phone: "Phone",
        address: "Address",
      },
      returnHome: "Return to Home",
    },
    de: {
      title: "Datenschutzrichtlinie",
      lastUpdated: "Zuletzt aktualisiert",
      intro:
        "Bei LEGRINO TEES nehmen wir Ihre Privatsphäre ernst. Diese Datenschutzrichtlinie erklärt, wie wir Ihre Informationen sammeln, verwenden, offenlegen und schützen, wenn Sie unsere Website besuchen oder einen Kauf tätigen.",
      infoCollect: {
        title: "Informationen, die wir sammeln",
        p1: "Wir können personenbezogene Daten sammeln, die Sie uns freiwillig zur Verfügung stellen, wenn Sie:",
        li1: "Sich auf unserer Website registrieren",
        li2: "Eine Bestellung aufgeben",
        li3: "Unseren Newsletter abonnieren",
        li4: "Uns per E-Mail, Telefon oder soziale Medien kontaktieren",
        li5: "An Werbeaktionen oder Umfragen teilnehmen",
      },
      infoUse: {
        title: "Wie wir Ihre Informationen verwenden",
        p1: "Wir können die von uns gesammelten Informationen für verschiedene Zwecke verwenden, unter anderem um:",
        li1: "Ihre Bestellungen zu bearbeiten und zu erfüllen",
        li2: "Ihnen Bestellbestätigungen und Updates zu senden",
        li3: "Auf Ihre Anfragen zu antworten und Kundensupport zu bieten",
        li4: "Ihnen Marketingmitteilungen zu senden (mit Ihrer Zustimmung)",
        li5: "Unsere Website, Produkte und Dienstleistungen zu verbessern",
        li6: "Werbeaktionen, Umfragen oder Wettbewerbe zu verwalten",
        li7: "Vor betrügerischen oder unbefugten Transaktionen zu schützen",
        li8: "Gesetzlichen Verpflichtungen nachzukommen",
      },
      cookies: {
        title: "Cookies und Tracking-Technologien",
        p1: "Wir verwenden Cookies und ähnliche Tracking-Technologien, um Aktivitäten auf unserer Website zu verfolgen und bestimmte Informationen zu speichern. Cookies sind Dateien mit einer kleinen Datenmenge, die eine anonyme eindeutige Kennung enthalten können. Sie können Ihren Browser anweisen, alle Cookies abzulehnen oder anzuzeigen, wenn ein Cookie gesendet wird. Wenn Sie jedoch keine Cookies akzeptieren, können Sie möglicherweise einige Teile unserer Website nicht nutzen.",
      },
      thirdParty: {
        title: "Offenlegung an Dritte",
        p1: "Wir können Ihre Informationen mit Dritten teilen, die Dienstleistungen für uns oder in unserem Namen erbringen, einschließlich Zahlungsabwicklung, Auftragserfüllung, Datenanalyse, E-Mail-Zustellung, Hosting-Dienste, Kundendienst und Marketingunterstützung.",
        p2: "Wir können Ihre Informationen auch offenlegen, wenn dies gesetzlich vorgeschrieben ist oder als Antwort auf berechtigte Anfragen von Behörden (z.B. einem Gericht oder einer Regierungsbehörde).",
      },
      security: {
        title: "Datensicherheit",
        p1: "Wir implementieren angemessene technische und organisatorische Maßnahmen, um die Sicherheit Ihrer persönlichen Daten zu gewährleisten. Allerdings ist keine Internet- oder E-Mail-Übertragung jemals vollständig sicher oder fehlerfrei. Insbesondere E-Mails, die an oder von unserer Website gesendet werden, sind möglicherweise nicht sicher. Daher sollten Sie besondere Sorgfalt walten lassen, wenn Sie entscheiden, welche Informationen Sie uns per E-Mail senden.",
      },
      rights: {
        title: "Ihre Rechte",
        p1: "Je nach Ihrem Standort haben Sie möglicherweise bestimmte Rechte in Bezug auf Ihre personenbezogenen Daten, darunter:",
        li1: "Das Recht auf Zugang zu den personenbezogenen Daten, die wir über Sie haben",
        li2: "Das Recht zu verlangen, dass wir Ihre personenbezogenen Daten korrigieren oder aktualisieren",
        li3: "Das Recht zu verlangen, dass wir Ihre personenbezogenen Daten löschen",
        li4: "Das Recht, sich von Marketingmitteilungen abzumelden",
      },
      changes: {
        title: "Änderungen dieser Datenschutzrichtlinie",
        p1: 'Wir können unsere Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Datenschutzrichtlinie auf dieser Seite veröffentlichen und das Datum der "Letzten Aktualisierung" oben auf dieser Seite aktualisieren. Es wird empfohlen, diese Datenschutzrichtlinie regelmäßig auf Änderungen zu überprüfen.',
      },
      contact: {
        title: "Kontaktieren Sie uns",
        p1: "Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte unter:",
        phone: "Telefon",
        address: "Adresse",
      },
      returnHome: "Zurück zur Startseite",
    },
  }

  // Seleccionar las traducciones según el idioma actual
  const currentTranslations = language === "de" ? translations.de : translations.en

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-8">{currentTranslations.title}</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            {currentTranslations.lastUpdated}: {language === "de" ? "27. März 2024" : "March 27, 2024"}
          </p>

          <p className="mb-6">{currentTranslations.intro}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.infoCollect.title}</h2>

          <p className="mb-4">{currentTranslations.infoCollect.p1}</p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>{currentTranslations.infoCollect.li1}</li>
            <li>{currentTranslations.infoCollect.li2}</li>
            <li>{currentTranslations.infoCollect.li3}</li>
            <li>{currentTranslations.infoCollect.li4}</li>
            <li>{currentTranslations.infoCollect.li5}</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.infoUse.title}</h2>

          <p className="mb-4">{currentTranslations.infoUse.p1}</p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>{currentTranslations.infoUse.li1}</li>
            <li>{currentTranslations.infoUse.li2}</li>
            <li>{currentTranslations.infoUse.li3}</li>
            <li>{currentTranslations.infoUse.li4}</li>
            <li>{currentTranslations.infoUse.li5}</li>
            <li>{currentTranslations.infoUse.li6}</li>
            <li>{currentTranslations.infoUse.li7}</li>
            <li>{currentTranslations.infoUse.li8}</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.cookies.title}</h2>

          <p className="mb-6">{currentTranslations.cookies.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.thirdParty.title}</h2>

          <p className="mb-6">{currentTranslations.thirdParty.p1}</p>

          <p className="mb-6">{currentTranslations.thirdParty.p2}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.security.title}</h2>

          <p className="mb-6">{currentTranslations.security.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.rights.title}</h2>

          <p className="mb-4">{currentTranslations.rights.p1}</p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>{currentTranslations.rights.li1}</li>
            <li>{currentTranslations.rights.li2}</li>
            <li>{currentTranslations.rights.li3}</li>
            <li>{currentTranslations.rights.li4}</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.changes.title}</h2>

          <p className="mb-6">{currentTranslations.changes.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.contact.title}</h2>

          <p className="mb-6">{currentTranslations.contact.p1}</p>

          <p className="mb-10">
            Email: privacy@legrinotees.com
            <br />
            {currentTranslations.contact.phone}: +1 (555) 123-4567
            <br />
            {currentTranslations.contact.address}: 123 Fashion Street, Design District, New York, NY 10001
          </p>

          <div className="mt-12 flex justify-center">
            <Link href="/">
              <Button>{currentTranslations.returnHome}</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
