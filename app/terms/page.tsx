"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

// Modificar la función TermsOfService para manejar correctamente las traducciones

export default function TermsOfService() {
  const { t, language } = useLanguage()

  // Definir traducciones directamente en el componente para evitar problemas con las claves
  const translations = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last Updated",
      intro:
        'Please read these Terms of Service ("Terms") carefully before using the LEGRINO TEES website. These Terms constitute a legally binding agreement between you and LEGRINO TEES governing your access to and use of the website, including any content, functionality, and services offered.',
      acceptance: {
        title: "Acceptance of Terms",
        p1: "By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our website.",
      },
      changes: {
        title: "Changes to Terms",
        p1: "We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when we post them. Your continued use of the website following the posting of revised Terms means that you accept and agree to the changes.",
      },
      account: {
        title: "Account Registration",
        p1: "To access certain features of the website, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
        p2: "You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to or use of your account.",
      },
      products: {
        title: "Products and Purchases",
        p1: "All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice.",
        p2: "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.",
      },
      payment: {
        title: "Payment Terms",
        p1: "We accept various payment methods for the convenience of our customers. All credit/debit card information is processed through secure and encrypted payment gateways. We do not store your full credit card details on our servers.",
        p2: "By providing a payment method, you represent and warrant that you are authorized to use the designated payment method and that you authorize us to charge your payment method for the total amount of your order (including any applicable taxes and other charges).",
      },
      shipping: {
        title: "Shipping and Delivery",
        p1: "We will make every effort to ship products within the timeframe specified on our website. However, shipping times are estimates and not guaranteed. We are not responsible for delays caused by events outside of our reasonable control.",
      },
      returns: {
        title: "Returns and Refunds",
        p1: "Our return and refund policy is outlined separately on our website. By making a purchase, you agree to be bound by our return and refund policy.",
      },
      intellectual: {
        title: "Intellectual Property Rights",
        p1: "The website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by LEGRINO TEES, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
      },
      prohibited: {
        title: "Prohibited Uses",
        p1: "You may use the website only for lawful purposes and in accordance with these Terms. You agree not to use the website:",
        li1: "In any way that violates any applicable federal, state, local, or international law or regulation",
        li2: 'To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation',
        li3: "To impersonate or attempt to impersonate LEGRINO TEES, a LEGRINO TEES employee, another user, or any other person or entity",
        li4: "To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website",
      },
      limitation: {
        title: "Limitation of Liability",
        p1: "In no event will LEGRINO TEES, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the website, any websites linked to it, any content on the website or such other websites, including any direct, indirect, special, incidental, consequential, or punitive damages.",
      },
      governing: {
        title: "Governing Law",
        p1: "These Terms and any dispute or claim arising out of or related to them, their subject matter, or their formation shall be governed by and construed in accordance with the laws of the State of New York, without giving effect to any choice or conflict of law provision or rule.",
      },
      contact: {
        title: "Contact Information",
        p1: "Questions or comments about the website or these Terms may be directed to:",
        phone: "Phone",
        address: "Address",
      },
      returnHome: "Return to Home",
    },
    de: {
      title: "Nutzungsbedingungen",
      lastUpdated: "Zuletzt aktualisiert",
      intro:
        'Bitte lesen Sie diese Nutzungsbedingungen ("Bedingungen") sorgfältig durch, bevor Sie die LEGRINO TEES-Website nutzen. Diese Bedingungen stellen eine rechtsverbindliche Vereinbarung zwischen Ihnen und LEGRINO TEES dar, die Ihren Zugang und Ihre Nutzung der Website regelt, einschließlich aller Inhalte, Funktionen und angebotenen Dienste.',
      acceptance: {
        title: "Annahme der Bedingungen",
        p1: "Durch den Zugriff auf oder die Nutzung unserer Website stimmen Sie zu, an diese Bedingungen gebunden zu sein. Wenn Sie diesen Bedingungen nicht zustimmen, dürfen Sie nicht auf unsere Website zugreifen oder diese nutzen.",
      },
      changes: {
        title: "Änderungen der Bedingungen",
        p1: "Wir können diese Bedingungen von Zeit zu Zeit nach eigenem Ermessen überarbeiten und aktualisieren. Alle Änderungen sind sofort wirksam, wenn wir sie veröffentlichen. Ihre fortgesetzte Nutzung der Website nach der Veröffentlichung überarbeiteter Bedingungen bedeutet, dass Sie die Änderungen akzeptieren und ihnen zustimmen.",
      },
      account: {
        title: "Kontoregistrierung",
        p1: "Um auf bestimmte Funktionen der Website zugreifen zu können, müssen Sie möglicherweise ein Konto registrieren. Sie stimmen zu, während des Registrierungsprozesses genaue, aktuelle und vollständige Informationen anzugeben und diese Informationen zu aktualisieren, um sie genau, aktuell und vollständig zu halten.",
        p2: "Sie sind für den Schutz Ihres Passworts und für alle Aktivitäten, die unter Ihrem Konto stattfinden, verantwortlich. Sie stimmen zu, uns sofort über jeden unbefugten Zugriff auf oder Nutzung Ihres Kontos zu informieren.",
      },
      products: {
        title: "Produkte und Käufe",
        p1: "Alle Produkte unterliegen der Verfügbarkeit. Wir behalten uns das Recht vor, jedes Produkt jederzeit einzustellen. Preise für unsere Produkte können ohne vorherige Ankündigung geändert werden.",
        p2: "Wir behalten uns das Recht vor, jede von Ihnen bei uns aufgegebene Bestellung abzulehnen. Wir können nach eigenem Ermessen die pro Person, pro Haushalt oder pro Bestellung gekauften Mengen begrenzen oder stornieren.",
      },
      payment: {
        title: "Zahlungsbedingungen",
        p1: "Wir akzeptieren verschiedene Zahlungsmethoden für die Bequemlichkeit unserer Kunden. Alle Kredit-/Debitkartendaten werden über sichere und verschlüsselte Zahlungsgateways verarbeitet. Wir speichern Ihre vollständigen Kreditkartendaten nicht auf unseren Servern.",
        p2: "Indem Sie eine Zahlungsmethode angeben, versichern und garantieren Sie, dass Sie zur Nutzung der angegebenen Zahlungsmethode berechtigt sind und dass Sie uns autorisieren, Ihre Zahlungsmethode für den Gesamtbetrag Ihrer Bestellung (einschließlich aller anwendbaren Steuern und sonstigen Gebühren) zu belasten.",
      },
      shipping: {
        title: "Versand und Lieferung",
        p1: "Wir werden uns bemühen, Produkte innerhalb des auf unserer Website angegebenen Zeitrahmens zu versenden. Die Versandzeiten sind jedoch Schätzungen und nicht garantiert. Wir sind nicht verantwortlich für Verzögerungen, die durch Ereignisse außerhalb unserer angemessenen Kontrolle verursacht werden.",
      },
      returns: {
        title: "Rückgaben und Erstattungen",
        p1: "Unsere Rückgabe- und Erstattungsrichtlinie ist separat auf unserer Website beschrieben. Durch einen Kauf stimmen Sie zu, an unsere Rückgabe- und Erstattungsrichtlinie gebunden zu sein.",
      },
      intellectual: {
        title: "Rechte an geistigem Eigentum",
        p1: "Die Website und ihre gesamten Inhalte, Funktionen und Funktionalitäten (einschließlich, aber nicht beschränkt auf alle Informationen, Software, Texte, Anzeigen, Bilder, Videos und Audio sowie deren Design, Auswahl und Anordnung) sind Eigentum von LEGRINO TEES, seinen Lizenzgebern oder anderen Anbietern solcher Materialien und sind durch Urheberrechte, Marken, Patente, Geschäftsgeheimnisse und andere Gesetze zum Schutz geistigen Eigentums oder Eigentumsrechte geschützt.",
      },
      prohibited: {
        title: "Verbotene Nutzungen",
        p1: "Sie dürfen die Website nur für rechtmäßige Zwecke und in Übereinstimmung mit diesen Bedingungen nutzen. Sie stimmen zu, die Website nicht zu nutzen:",
        li1: "In einer Weise, die gegen geltende bundesstaatliche, staatliche, lokale oder internationale Gesetze oder Vorschriften verstößt",
        li2: 'Um Werbematerial oder Werbematerial zu übermitteln oder zu versenden, einschließlich "Junk-Mail", "Kettenbrief", "Spam" oder ähnliche Werbung',
        li3: "Um sich als LEGRINO TEES, einen LEGRINO TEES-Mitarbeiter, einen anderen Benutzer oder eine andere Person oder Einrichtung auszugeben oder dies zu versuchen",
        li4: "Um sich an einem anderen Verhalten zu beteiligen, das die Nutzung oder den Genuss der Website durch andere einschränkt oder behindert",
      },
      limitation: {
        title: "Haftungsbeschränkung",
        p1: "In keinem Fall haften LEGRINO TEES, seine verbundenen Unternehmen oder deren Lizenzgeber, Dienstleister, Mitarbeiter, Vertreter, leitende Angestellte oder Direktoren für Schäden jeglicher Art, nach irgendeiner Rechtstheorie, die aus oder im Zusammenhang mit Ihrer Nutzung oder Unfähigkeit zur Nutzung der Website, mit der Website verknüpften Websites, Inhalten auf der Website oder solchen anderen Websites entstehen, einschließlich direkter, indirekter, besonderer, zufälliger, Folge- oder Strafschäden.",
      },
      governing: {
        title: "Geltendes Recht",
        p1: "Diese Bedingungen und alle Streitigkeiten oder Ansprüche, die sich aus oder im Zusammenhang mit ihnen, ihrem Gegenstand oder ihrer Entstehung ergeben, unterliegen dem Recht des Bundesstaates New York und werden in Übereinstimmung mit diesem ausgelegt, ohne Berücksichtigung von Bestimmungen oder Regeln zur Rechtswahl oder zum Konflikt von Gesetzen.",
      },
      contact: {
        title: "Kontaktinformationen",
        p1: "Fragen oder Kommentare zur Website oder zu diesen Bedingungen können gerichtet werden an:",
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

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.acceptance.title}</h2>

          <p className="mb-6">{currentTranslations.acceptance.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.changes.title}</h2>

          <p className="mb-6">{currentTranslations.changes.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.account.title}</h2>

          <p className="mb-6">{currentTranslations.account.p1}</p>

          <p className="mb-6">{currentTranslations.account.p2}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.products.title}</h2>

          <p className="mb-6">{currentTranslations.products.p1}</p>

          <p className="mb-6">{currentTranslations.products.p2}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.payment.title}</h2>

          <p className="mb-6">{currentTranslations.payment.p1}</p>

          <p className="mb-6">{currentTranslations.payment.p2}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.shipping.title}</h2>

          <p className="mb-6">{currentTranslations.shipping.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.returns.title}</h2>

          <p className="mb-6">{currentTranslations.returns.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.intellectual.title}</h2>

          <p className="mb-6">{currentTranslations.intellectual.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.prohibited.title}</h2>

          <p className="mb-6">{currentTranslations.prohibited.p1}</p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>{currentTranslations.prohibited.li1}</li>
            <li>{currentTranslations.prohibited.li2}</li>
            <li>{currentTranslations.prohibited.li3}</li>
            <li>{currentTranslations.prohibited.li4}</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.limitation.title}</h2>

          <p className="mb-6">{currentTranslations.limitation.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.governing.title}</h2>

          <p className="mb-6">{currentTranslations.governing.p1}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{currentTranslations.contact.title}</h2>

          <p className="mb-6">{currentTranslations.contact.p1}</p>

          <p className="mb-10">
            Email: legal@legrinotees.com
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
