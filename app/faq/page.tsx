"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, ShoppingBag, Truck, RefreshCw, CreditCard, Users } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useLanguage()

  // Filter FAQs based on search query
  const filterFAQs = (faqs) => {
    if (!searchQuery) return faqs

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // FAQ-Kategorien und Fragen
  const ordersFAQs = [
    {
      question: "Wie gebe ich eine Bestellung auf?",
      answer:
        "Du kannst eine Bestellung aufgeben, indem du unsere Kollektion durchstöberst, die gewünschten Artikel auswählst, Größe und Menge festlegst und zur Kasse gehst. Du musst Versand- und Zahlungsinformationen angeben, um deinen Kauf abzuschließen.",
    },
    {
      question: "Kann ich meine Bestellung ändern oder stornieren?",
      answer:
        "Du kannst deine Bestellung innerhalb von 1 Stunde nach der Aufgabe ändern oder stornieren, indem du unseren Kundenservice kontaktierst. Danach beginnen wir mit der Bearbeitung der Bestellungen und können Änderungen nicht mehr garantieren.",
    },
    {
      question: "Wie kann ich den Status meiner Bestellung überprüfen?",
      answer:
        "Du kannst den Status deiner Bestellung überprüfen, indem du dich in dein Konto einloggst und deinen Bestellverlauf ansiehst. Außerdem erhältst du per E-Mail Updates, sobald deine Bestellung bearbeitet, versendet und zugestellt wird.",
    },
    {
      question: "Bietet ihr Geschenkverpackung an?",
      answer:
        "Ja, wir bieten Geschenkverpackung für zusätzlich 5 € pro Artikel an. Du kannst diese Option beim Checkout auswählen und eine persönliche Nachricht für den Empfänger hinzufügen.",
    },
    {
      question: "Kann ich telefonisch bestellen?",
      answer:
        "Derzeit nehmen wir Bestellungen ausschließlich über unsere Website entgegen, um sicherzustellen, dass alle Bestelldetails korrekt erfasst und bearbeitet werden.",
    },
  ]

  const shippingFAQs = [
    {
      question: "Wie lange dauert es, bis ich meine Bestellung erhalte?",
      answer:
        "Der Standardversand dauert in der Regel 3-5 Werktage innerhalb Deutschlands. Expressversand dauert 1-2 Werktage. Internationaler Versand kann je nach Zielort 7-14 Werktage dauern.",
    },
    {
      question: "Versendet ihr international?",
      answer:
        "Ja, wir versenden in die meisten Länder weltweit. Internationale Versandkosten und Lieferzeiten variieren je nach Standort. Bitte beachte, dass Kunden für eventuelle Zollgebühren oder Einfuhrsteuern selbst verantwortlich sind.",
    },
    {
      question: "Gibt es kostenlosen Versand?",
      answer:
        "Ja, wir bieten kostenlosen Standardversand für alle Bestellungen über 100 € an. Bestellungen unter 100 € haben eine Pauschalversandgebühr von 5,99 €.",
    },
    {
      question: "Wie kann ich meine Sendung verfolgen?",
      answer:
        "Sobald deine Bestellung versendet wurde, erhältst du eine Versandbestätigungs-E-Mail mit einer Sendungsnummer. Mit dieser Nummer kannst du dein Paket auf unserer Website oder direkt auf der Seite des Zustellers verfolgen.",
    },
    {
      question: "Was passiert, wenn mein Paket verloren geht oder beschädigt wird?",
      answer:
        "Wenn dein Paket während des Transports verloren geht oder beschädigt wird, kontaktiere bitte unseren Kundenservice innerhalb von 7 Tagen nach dem erwarteten Lieferdatum. Wir arbeiten mit dem Versanddienstleister zusammen, um das Problem zu lösen.",
    },
  ]

  const returnsFAQs = [
    {
      question: "Wie lautet eure Rückgaberichtlinie?",
      answer:
        "Wir bieten eine 30-tägige Rückgaberichtlinie an. Wenn du mit deinem Kauf nicht vollständig zufrieden bist, kannst du ihn innerhalb von 30 Tagen nach Lieferung für eine vollständige Rückerstattung des Artikelpreises zurückgeben.",
    },
    {
      question: "Wie gebe ich einen Artikel zurück?",
      answer:
        "Um eine Rücksendung zu starten, kontaktiere bitte unseren Kundenservice mit deiner Bestellnummer und dem Grund für die Rücksendung. Wir stellen dir eine Rückgabegenehmigung sowie Anweisungen zur Verfügung, wie du den Artikel an uns zurücksenden kannst.",
    },
    {
      question: "Muss ich für den Rückversand bezahlen?",
      answer:
        "Ja, Kunden sind für die Rückversandkosten verantwortlich, es sei denn, der Artikel ist defekt oder wir haben einen Fehler gemacht. Wir empfehlen, für Rücksendungen eine nachverfolgbare Versandmethode zu verwenden.",
    },
    {
      question: "Wie lange dauert die Bearbeitung einer Rückerstattung?",
      answer:
        "Sobald wir deine Rücksendung erhalten haben, dauert die Bearbeitung in der Regel 3-5 Werktage. Danach kann es weitere 5-10 Werktage dauern, bis die Rückerstattung auf deiner ursprünglichen Zahlungsmethode erscheint.",
    },
    {
      question: "Kann ich einen Artikel gegen eine andere Größe oder Farbe umtauschen?",
      answer:
        "Derzeit bieten wir keinen direkten Umtausch an. Wenn du eine andere Größe oder Farbe benötigst, sende deinen Artikel bitte zur Rückerstattung zurück und gib eine neue Bestellung für den gewünschten Artikel auf.",
    },
  ]

  const productFAQs = [
    {
      question: "Aus welchen Materialien bestehen eure T-Shirts?",
      answer:
        "Unsere T-Shirts bestehen aus 100% Bio-Baumwolle, die nachhaltig angebaut und fair produziert wird. Wir legen bei all unseren Produkten Wert auf Qualität und Komfort.",
    },
    {
      question: "Wie pflege ich meine T-Shirts?",
      answer:
        "Für beste Ergebnisse wasche sie maschinell kalt mit ähnlichen Farben, verwende ein mildes Waschmittel und trockne sie im Trockner bei niedriger Temperatur oder hänge sie zum Trocknen auf. Vermeide Bleichmittel und hohe Hitze, um die Stoffqualität und die Haltbarkeit des Drucks zu erhalten.",
    },
    {
      question: "Fallen eure Produkte größentreu aus?",
      answer:
        "Ja, unsere Produkte sind so gestaltet, dass sie größentreu mit einer modernen, leicht taillierten Silhouette ausfallen. Bitte schau dir unseren Größenleitfaden für detaillierte Maße an, um die perfekte Passform zu finden.",
    },
    {
      question: "Sind eure Produkte nachhaltig?",
      answer:
        "Ja, Nachhaltigkeit steht im Mittelpunkt unserer Marke. Wir verwenden Bio-Materialien, umweltfreundliche Farbstoffe und faire Produktionsprozesse, um unsere Umweltauswirkungen zu minimieren.",
    },
    {
      question: "Bietet ihr individuelle oder personalisierte T-Shirts an?",
      answer:
        "Derzeit bieten wir keine individuellen oder personalisierten T-Shirts für Einzelbestellungen an. Für Firmenbestellungen ab 50 Artikeln bieten wir jedoch eine Massenanpassung an.",
    },
  ]

  const paymentFAQs = [
    {
      question: "Welche Zahlungsmethoden akzeptiert ihr?",
      answer:
        "Wir akzeptieren alle gängigen Kreditkarten (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay und Google Pay.",
    },
    {
      question: "Ist es sicher, meine Kreditkarte auf eurer Website zu verwenden?",
      answer:
        "Ja, unsere Website verwendet SSL-Verschlüsselung, um deine persönlichen und Zahlungsinformationen zu schützen. Wir speichern deine vollständigen Kreditkartendaten nicht auf unseren Servern.",
    },
    {
      question: "Wann wird meine Kreditkarte belastet?",
      answer:
        "Deine Kreditkarte wird sofort belastet, wenn du deine Bestellung aufgibst. Falls wir deine Bestellung aus irgendeinem Grund nicht erfüllen können, erhältst du eine vollständige Rückerstattung.",
    },
    {
      question: "Bietet ihr Ratenzahlungsoptionen an?",
      answer:
        "Ja, wir bieten Ratenzahlungen über Affirm und Klarna an. Du kannst diese Optionen beim Checkout auswählen, um deine Zahlung in mehrere Raten aufzuteilen.",
    },
    {
      question: "Kann ich mehrere Zahlungsmethoden für eine Bestellung verwenden?",
      answer:
        "Derzeit können wir nur eine Zahlungsmethode pro Bestellung verarbeiten. Wenn du mehrere Zahlungsmethoden verwenden möchtest, musst du separate Bestellungen aufgeben.",
    },
  ]

  const accountFAQs = [
    {
      question: "Muss ich ein Konto erstellen, um einzukaufen?",
      answer:
        "Nein, du kannst auch als Gast bestellen, ohne ein Konto zu erstellen. Ein Konto ermöglicht es dir jedoch, Bestellungen zu verfolgen, Versandinformationen zu speichern und Prämien zu sammeln.",
    },
    {
      question: "Wie erstelle ich ein Konto?",
      answer:
        "Du kannst ein Konto erstellen, indem du auf den Link 'Registrieren' im oberen Navigationsmenü klickst. Du musst deine E-Mail-Adresse angeben und ein Passwort erstellen. Du kannst dich auch über deine Social-Media-Konten für einen schnelleren Zugang registrieren.",
    },
    {
      question: "Wie kann ich mein Passwort zurücksetzen?",
      answer:
        "Um dein Passwort zurückzusetzen, klicke auf den Link 'Anmelden' und wähle dann 'Passwort vergessen'. Gib die mit deinem Konto verknüpfte E-Mail-Adresse ein, und wir senden dir Anweisungen zum Zurücksetzen deines Passworts.",
    },
    {
      question: "Kann ich meine Kontoinformationen aktualisieren?",
      answer:
        "Ja, du kannst deine Kontoinformationen aktualisieren, indem du dich in dein Konto einloggst und zum Bereich 'Kontoeinstellungen' navigierst. Dort kannst du deine persönlichen Daten, Versandadressen und Zahlungsmethoden ändern.",
    },
    {
      question: "Sind meine persönlichen Daten sicher?",
      answer:
        "Ja, wir nehmen Datensicherheit sehr ernst. Wir verwenden branchenübliche Verschlüsselung und Sicherheitsmaßnahmen, um deine persönlichen Daten zu schützen. Wir geben deine Daten niemals ohne deine Zustimmung an Dritte weiter.",
    },
    {
      question: "Wie lösche ich mein Konto?",
      answer:
        "Um dein Konto zu löschen, kontaktiere bitte unseren Kundenservice. Bitte beachte, dass beim Löschen deines Kontos dein gesamter Bestellverlauf und alle gespeicherten Informationen dauerhaft entfernt werden.",
    },
  ]

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("faq.title")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">{t("faq.subtitle")}</p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t("faq.searchPlaceholder")}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="orders" className="mb-16">
          <TabsList className="w-full grid-cols-6 sm:grid-cols-3 md:grid-cols-6 grid gap-1">
            <TabsTrigger value="orders" className="flex items-center justify-center gap-2 px-2 py-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="whitespace-nowrap">{t("faq.categories.orders")}</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center justify-center gap-2 px-2 py-2">
              <Truck className="w-4 h-4" />
              <span className="whitespace-nowrap">{t("faq.categories.shipping")}</span>
            </TabsTrigger>
            <TabsTrigger value="returns" className="flex items-center justify-center gap-2 px-2 py-2">
              <RefreshCw className="w-4 h-4" />
              <span className="whitespace-nowrap">{t("faq.categories.returns")}</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center justify-center gap-2 px-2 py-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="whitespace-nowrap">{t("faq.categories.products")}</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center justify-center gap-2 px-2 py-2">
              <CreditCard className="w-4 h-4" />
              <span className="whitespace-nowrap">{t("faq.categories.payment")}</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center justify-center gap-2 px-2 py-2">
              <Users className="w-4 h-4" />
              <span className="whitespace-nowrap">{t("faq.categories.account")}</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <TabsContent value="orders">
              <h2 className="text-xl font-bold mb-6">{t("faq.categories.orders")}</h2>
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(ordersFAQs).map((faq, index) => (
                  <AccordionItem key={index} value={`orders-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="shipping">
              <h2 className="text-xl font-bold mb-6">{t("faq.categories.shipping")}</h2>
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(shippingFAQs).map((faq, index) => (
                  <AccordionItem key={index} value={`shipping-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="returns">
              <h2 className="text-xl font-bold mb-6">{t("faq.categories.returns")}</h2>
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(returnsFAQs).map((faq, index) => (
                  <AccordionItem key={index} value={`returns-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="products">
              <h2 className="text-xl font-bold mb-6">{t("faq.categories.products")}</h2>
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(productFAQs).map((faq, index) => (
                  <AccordionItem key={index} value={`products-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="payment">
              <h2 className="text-xl font-bold mb-6">{t("faq.categories.payment")}</h2>
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(paymentFAQs).map((faq, index) => (
                  <AccordionItem key={index} value={`payment-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="account">
              <h2 className="text-xl font-bold mb-6">{t("faq.categories.account")}</h2>
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(accountFAQs).map((faq, index) => (
                  <AccordionItem key={index} value={`account-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </div>
        </Tabs>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold mb-4">{t("faq.stillHaveQuestions")}</h2>
          <p className="text-gray-600 mb-6">{t("faq.cantFindAnswer")}</p>
          <Link href="/contact">
            <Button>{t("sizeGuide.contactUs")}</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
