"\"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Definir los idiomas disponibles
type Language = "en" | "de"

// Definir las traducciones
const translations = {
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      about: "About",
      contact: "Contact",
    },
    footer: {
      description: "Minimalist t-shirts for men and women, designed with care and made to last.",
      shop: "Shop",
      men: "Men's Collection",
      women: "Women's Collection",
      limited: "Limited Edition",
      all: "All Products",
      company: "Company",
      about: "About Us",
      sustainability: "Sustainability",
      contact: "Contact Us",
      cart: "Shopping Cart",
      service: "Customer Service",
      faq: "FAQ",
      shipping: "Shipping & Returns",
      size: "Size Guide",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Policy",
    },
    user: {
      signin: "Sign In",
      register: "Register",
    },
    account: {
      title: "My Account",
      orders: "Orders",
      wishlist: "Wishlist",
      details: "Settings",
      signOut: "Sign Out",
    },
    cart: {
      title: "Cart",
      empty: "Your cart is empty",
      emptyMessage: "Looks like you haven't added any items to your cart yet.",
      continueShopping: "Continue Shopping",
      subtotal: "Subtotal",
      checkout: "Checkout",
    },
    cookies: {
      title: "Cookie Preferences",
      description:
        "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.",
      learnMore: "Learn more",
      customize: "Customize",
      acceptNecessary: "Accept Necessary",
      acceptAll: "Accept All",
      manage: "Manage Cookies",
      preferences: {
        title: "Cookie Preferences",
        description:
          "Manage your cookie preferences below. Necessary cookies help make a website usable by enabling basic functions.",
        necessary: {
          title: "Necessary Cookies",
          description: "These cookies are required for the website to function and cannot be switched off.",
        },
        analytics: {
          title: "Analytics Cookies",
          description: "These cookies help us understand how visitors interact with our website.",
        },
        marketing: {
          title: "Marketing Cookies",
          description: "These cookies are used to track visitors across websites to display relevant advertisements.",
        },
        save: "Save Preferences",
        cancel: "Cancel",
      },
    },
    styles: {
      title: "Explore Our Styles",
      subtitle: "Discover the perfect style that matches your personality",
      urban: "Urban",
      "urban.description": "Modern and sleek designs for city life",
      colorful: "Colorful",
      "colorful.description": "Vibrant patterns to express yourself",
      hover: "Hover to explore",
      description: "Our collection features a wide range of styles to suit every taste and occasion.",
    },
    // Add new translations for the new pages
    sizeGuide: {
      title: "Size Guide",
      subtitle: "Find your perfect fit with our comprehensive size guide",
      howToMeasure: "How to Measure",
      measurementInstructions: "For the most accurate fit, measure your body as follows:",
      chest: "Chest: Measure around the fullest part of your chest, keeping the tape horizontal.",
      waist: "Waist: Measure around your natural waistline, keeping the tape comfortably loose.",
      hips: "Hips: Measure around the fullest part of your hips.",
      length: "Length: Measure from the highest point of the shoulder to the bottom hem.",
      menSizes: "Men's Sizes",
      womenSizes: "Women's Sizes",
      betweenSizes: "Between Sizes?",
      betweenSizesText:
        "If you're between sizes, we recommend sizing up for a more relaxed fit or sizing down for a more fitted look. Our t-shirts are designed with a modern, slightly fitted silhouette that's not too tight and not too loose.",
      fabricShrinkage: "Fabric & Shrinkage",
      fabricShrinkageText:
        "Our t-shirts are pre-shrunk, but may still experience minimal shrinkage (approximately 2-3%) after washing. We recommend washing in cold water and air drying to maintain the original fit and extend the life of your garment.",
      questions: "Still have questions about finding your perfect size?",
      contactUs: "Contact Us",
    },
    shipping: {
      title: "Shipping & Returns",
      subtitle: "Everything you need to know about our shipping policies and return process",
      shippingPolicy: "Shipping Policy",
      shippingDescription: "Our shipping methods and delivery times",
      processingTime: "Processing Time",
      processingTimeText:
        "All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email.",
      deliveryMethods: "Shipping Methods & Delivery Times",
      standardShipping: "Standardversand",
      expressShipping: "Expressversand",
      internationalShipping: "Internationaler Versand",
      shippingRates: "Versandkosten",
      free: "KOSTENLOS",
      returnPolicy: "Rückgaberichtlinien",
      returnPolicyText:
        "Wir bieten eine 30-tägige Rückgabegarantie. Wenn Sie mit Ihrem Kauf nicht vollständig zufrieden sind, können Sie ihn innerhalb von 30 Tagen nach Lieferung für eine vollständige Rückerstattung des Artikelpreises zurücksenden.",
      returnConditions: "Rückgabebedingungen",
      exchangeProcess: "Umtauschprozess",
      startReturn: "Rückgabe starten",
      faq: "Häufig gestellte Fragen",
      trackOrder: "Wie kann ich meine Bestellung verfolgen?",
      trackOrderAnswer:
        "Sobald Ihre Bestellung versendet wurde, erhalten Sie eine Versandbestätigungs-E-Mail mit einer Sendungsverfolgungsnummer. Sie können diese Nummer verwenden, um Ihr Paket auf unserer Website oder direkt auf der Website des Transportunternehmens zu verfolgen.",
      lostPackage: "Was passiert, wenn mein Paket verloren geht oder beschädigt wird?",
      lostPackageAnswer:
        "Wenn Ihr Paket während des Transports verloren geht oder beschädigt wird, kontaktieren Sie bitte unser Kundenserviceteam innerhalb von 7 Tagen nach dem erwarteten Lieferdatum. Wir werden mit dem Transportunternehmen zusammenarbeiten, um das Problem zu lösen.",
      freeShipping: "Kostenloser Versand",
      freeShippingText: "Bei allen Bestellungen über 100€",
      easyReturns: "Einfache Rückgabe",
      easyReturnsText: "30 Tage problemlose Rückgabe",
      secureCheckout: "Sicherer Checkout",
      secureCheckoutText: "Ihre Daten sind geschützt",
      moreQuestions: "Haben Sie weitere Fragen zu Versand oder Rückgabe?",
    },
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Finden Sie Antworten auf häufige Fragen zu unseren Produkten, Bestellungen, Versand und mehr",
      searchPlaceholder: "Nach Antworten suchen...",
      categories: {
        orders: "Bestellungen",
        shipping: "Versand",
        returns: "Rückgabe & Umtausch",
        products: "Produkte",
        payment: "Zahlung",
        account: "Konto",
      },
      stillHaveQuestions: "Noch Fragen?",
      cantFindAnswer: "Können Sie die gesuchte Antwort nicht finden? Bitte kontaktieren Sie unser Kundenserviceteam.",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      shop: "Einkaufen",
      about: "Über uns",
      contact: "Kontakt",
    },
    footer: {
      description: "Minimalistische T-Shirts für Männer und Frauen, mit Sorgfalt entworfen und langlebig hergestellt.",
      shop: "Einkaufen",
      men: "Männerkollektion",
      women: "Frauenkollektion",
      limited: "Limitierte Auflage",
      all: "Alle Produkte",
      company: "Unternehmen",
      about: "Über uns",
      sustainability: "Nachhaltigkeit",
      contact: "Kontakt",
      cart: "Warenkorb",
      service: "Kundenservice",
      faq: "FAQ",
      shipping: "Versand & Rückgabe",
      size: "Größentabelle",
      rights: "Alle Rechte vorbehalten.",
      privacy: "Datenschutzrichtlinie",
      terms: "Nutzungsbedingungen",
      cookies: "Cookie-Richtlinie",
    },
    user: {
      signin: "Anmelden",
      register: "Registrieren",
    },
    account: {
      title: "Mein Konto",
      orders: "Bestellungen",
      wishlist: "Wunschliste",
      details: "Einstellungen",
      signOut: "Abmelden",
    },
    cart: {
      title: "Warenkorb",
      empty: "Dein Warenkorb ist leer",
      emptyMessage: "Es sieht so aus, als hättest du noch keine Artikel in deinen Warenkorb gelegt.",
      continueShopping: "Weiter einkaufen",
      subtotal: "Zwischensumme",
      checkout: "Zur Kasse",
    },
    cookies: {
      title: "Cookie-Einstellungen",
      description:
        "Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern, personalisierte Anzeigen oder Inhalte zu schalten und unseren Verkehr zu analysieren.",
      learnMore: "Mehr erfahren",
      customize: "Anpassen",
      acceptNecessary: "Nur notwendige akzeptieren",
      acceptAll: "Alle akzeptieren",
      manage: "Cookies verwalten",
      preferences: {
        title: "Cookie-Einstellungen",
        description:
          "Verwalten Sie Ihre Cookie-Einstellungen unten. Notwendige Cookies helfen, eine Website nutzbar zu machen, indem sie Grundfunktionen ermöglichen.",
        necessary: {
          title: "Notwendige Cookies",
          description:
            "Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden.",
        },
        analytics: {
          title: "Analyse-Cookies",
          description: "Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.",
        },
        marketing: {
          title: "Marketing-Cookies",
          description:
            "Diese Cookies werden verwendet, um Besucher auf Websites zu verfolgen, um relevante Werbung anzuzeigen.",
        },
        save: "Einstellungen speichern",
        cancel: "Abbrechen",
      },
    },
    styles: {
      title: "Entdecke unsere Stile",
      subtitle: "Finde den perfekten Stil, der zu deiner Persönlichkeit passt",
      urban: "Urban",
      "urban.description": "Moderne und elegante Designs für das Stadtleben",
      colorful: "Farbenfroh",
      "colorful.description": "Lebendige Muster, um dich auszudrücken",
      hover: "Hover zum Erkunden",
      description: "Unsere Kollektion bietet eine breite Palette an Stilen für jeden Geschmack und jede Gelegenheit.",
    },
    // Add new translations for the new pages in German
    sizeGuide: {
      title: "Größentabelle",
      subtitle: "Finde deine perfekte Größe mit unserer umfassenden Größentabelle",
      howToMeasure: "Wie man misst",
      measurementInstructions: "Für die genaueste Passform messen Sie Ihren Körper wie folgt:",
      chest: "Brust: Messen Sie um den vollsten Teil Ihrer Brust und halten Sie das Maßband horizontal.",
      waist: "Taille: Messen Sie um Ihre natürliche Taille und halten Sie das Maßband locker.",
      hips: "Hüfte: Messen Sie um den vollsten Teil Ihrer Hüfte.",
      length: "Länge: Messen Sie vom höchsten Punkt der Schulter bis zum unteren Saum.",
      menSizes: "Herrengrößen",
      womenSizes: "Damengrößen",
      betweenSizes: "Zwischen den Größen?",
      betweenSizesText:
        "Wenn Sie zwischen den Größen liegen, empfehlen wir, eine Größe größer für eine lockerere Passform oder eine Größe kleiner für eine engere Passform zu wählen. Unsere T-Shirts sind mit einer modernen, leicht anliegenden Silhouette gestaltet, die weder zu eng noch zu locker ist.",
      fabricShrinkage: "Stoff & Einlaufen",
      fabricShrinkageText:
        "Unsere T-Shirts sind vorgeschrumpft, können aber nach dem Waschen noch minimal einlaufen (ca. 2-3%). Wir empfehlen, mit kaltem Wasser zu waschen und an der Luft zu trocknen, um die ursprüngliche Passform zu erhalten und die Lebensdauer des Kleidungsstücks zu verlängern.",
      questions: "Haben Sie noch Fragen zur Findung Ihrer perfekten Größe?",
      contactUs: "Kontaktieren Sie uns",
    },
    shipping: {
      title: "Versand & Rückgabe",
      subtitle: "Alles, was Sie über unsere Versandrichtlinien und den Rückgabeprozess wissen müssen",
      shippingPolicy: "Versandrichtlinien",
      shippingDescription: "Unsere Versandmethoden und Lieferzeiten",
      processingTime: "Bearbeitungszeit",
      processingTimeText:
        "Alle Bestellungen werden innerhalb von 1-2 Werktagen (ausgenommen Wochenenden und Feiertage) nach Erhalt Ihrer Bestellbestätigung bearbeitet.",
      deliveryMethods: "Versandmethoden & Lieferzeiten",
      standardShipping: "Standardversand",
      expressShipping: "Expressversand",
      internationalShipping: "Internationaler Versand",
      shippingRates: "Versandkosten",
      free: "KOSTENLOS",
      returnPolicy: "Rückgaberichtlinien",
      returnPolicyText:
        "Wir bieten eine 30-tägige Rückgabegarantie. Wenn Sie mit Ihrem Kauf nicht vollständig zufrieden sind, können Sie ihn innerhalb von 30 Tagen nach Lieferung für eine vollständige Rückerstattung des Artikelpreises zurücksenden.",
      returnConditions: "Rückgabebedingungen",
      exchangeProcess: "Umtauschprozess",
      startReturn: "Rückgabe starten",
      faq: "Häufig gestellte Fragen",
      trackOrder: "Wie kann ich meine Bestellung verfolgen?",
      trackOrderAnswer:
        "Sobald Ihre Bestellung versendet wurde, erhalten Sie eine Versandbestätigungs-E-Mail mit einer Sendungsverfolgungsnummer. Sie können diese Nummer verwenden, um Ihr Paket auf unserer Website oder direkt auf der Website des Transportunternehmens zu verfolgen.",
      lostPackage: "Was passiert, wenn mein Paket verloren geht oder beschädigt wird?",
      lostPackageAnswer:
        "Wenn Ihr Paket während des Transports verloren geht oder beschädigt wird, kontaktieren Sie bitte unser Kundenserviceteam innerhalb von 7 Tagen nach dem erwarteten Lieferdatum. Wir werden mit dem Transportunternehmen zusammenarbeiten, um das Problem zu lösen.",
      freeShipping: "Kostenloser Versand",
      freeShippingText: "Bei allen Bestellungen über 100€",
      easyReturns: "Einfache Rückgabe",
      easyReturnsText: "30 Tage problemlose Rückgabe",
      secureCheckout: "Sicherer Checkout",
      secureCheckoutText: "Ihre Daten sind geschützt",
      moreQuestions: "Haben Sie weitere Fragen zu Versand oder Rückgabe?",
    },
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Finden Sie Antworten auf häufige Fragen zu unseren Produkten, Bestellungen, Versand und mehr",
      searchPlaceholder: "Nach Antworten suchen...",
      categories: {
        orders: "Bestellungen",
        shipping: "Versand",
        returns: "Rückgabe & Umtausch",
        products: "Produkte",
        payment: "Zahlung",
        account: "Konto",
      },
      stillHaveQuestions: "Noch Fragen?",
      cantFindAnswer: "Können Sie die gesuchte Antwort nicht finden? Bitte kontaktieren Sie unser Kundenserviceteam.",
    },
  },
}

// Tipo para el contexto
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Crear el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Proveedor del contexto
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Estado para el idioma actual
  const [language, setLanguage] = useState<Language>("en")

  // Cargar el idioma preferido del usuario desde localStorage al montar el componente
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Guardar el idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Función para obtener traducciones
  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k]
      } else {
        // Si no se encuentra la clave, devolver la clave como fallback
        return key
      }
    }

    return value
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Hook personalizado para usar el contexto
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
