"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
type Language = "en" | "de"

// Define translations
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
      partners: "Our Partners",
      paymentMethods: "Our Payment Methods",
      benefits: "Our Benefits",
      freeShipping: "Free shipping for orders over €50.00",
      returnPolicy: "30-day return policy",
      flexiblePayment: "Flexible payment methods",
    },
    user: {
      signin: "Sign In",
      register: "Register",
      account: "My Account",
      orders: "Orders",
      wishlist: "Wishlist",
      details: "Settings",
      signOut: "Sign Out",
    },
    contact: {
      title: "Get in Touch",
      subtitle:
        "We'd love to hear from you. Whether you have a question about our products, need help with an order, or want to collaborate, we're here to help.",
      formTitle: "Send us a message",
      formDescription: "Fill out the form below and we'll get back to you as soon as possible.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      messageSent: "Message Sent!",
      thankYou: "Thank you for reaching out. We'll get back to you shortly.",
      contactInfo: "Contact Information",
      contactDescription: "Here's how you can reach us directly.",
      address: "Address",
      phone: "Phone",
      businessHours: "Business Hours",
      followUs: "Follow Us",
      stayConnected: "Stay connected with us on social media.",
      otherWays: "Other Ways to Contact Us",
    },
    account: {
      title: "My Account",
      welcomeBack: "Welcome back",
      overview: "Overview",
      orders: "Orders",
      wishlist: "Wishlist",
      details: "Account Details",
      cart: "Cart",
      itemsInCart: "items in cart",
      totalOrders: "total orders",
      viewCart: "View Cart",
      viewOrders: "View Orders",
      recentActivity: "Recent Activity",
      lastLogin: "Last login",
      memberSince: "Member since",
      recentOrders: "Recent Orders",
      recentPurchases: "Your recent purchases",
      noOrders: "You haven't placed any orders yet",
      startShopping: "Start Shopping",
      orderHistory: "Order History",
      viewAllOrders: "View all your past orders",
      placedOn: "Placed on",
      items: "Items",
      viewDetails: "View Details",
      noOrdersYet: "No Orders Yet",
      myWishlist: "My Wishlist",
      savedForLater: "Items you've saved for later",
      wishlistEmpty: "Your Wishlist is Empty",
      saveItems: "Save items you like to your wishlist",
      exploreProducts: "Explore Products",
      accountInfo: "Account Information",
      personalDetails: "Your personal details",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      editProfile: "Edit Profile",
      addresses: "Addresses",
      manageAddresses: "Manage your saved addresses",
      noAddresses: "You don't have any saved addresses yet",
      addAddress: "Add Address",
      editProfileTitle: "Edit Profile",
      cancel: "Cancel",
      saveChanges: "Save Changes",
      addNewAddress: "Add New Address",
      streetAddress: "Street Address",
      city: "City",
      stateProvince: "State/Province",
      zipCode: "ZIP Code",
      country: "Country",
      saveAddress: "Save Address",
      selected: "Selected",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      remove: "Remove",
      continueShopping: "Continue Shopping",
    },
    cart: {
      title: "Cart",
      empty: "Your cart is empty",
      emptyMessage: "Looks like you haven't added any items to your cart yet.",
      continueShopping: "Continue Shopping",
      subtotal: "Subtotal",
      checkout: "Checkout",
      viewCart: "View Cart",
      shippingTaxes: "Shipping and taxes calculated at checkout",
      orderSummary: "Order Summary",
      discount: "Discount",
      total: "Total",
      promoCode: "Promo code",
      apply: "Apply",
      promoApplied: "Promo code applied successfully!",
      promoTry: 'Try "WELCOME10" for 10% off your first order',
      proceedToCheckout: "Proceed to Checkout",
      cartItems: "Cart Items",
      remove: "Remove",
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
      policy: {
        title: "Cookie Policy",
        lastUpdated: "Last Updated",
        intro:
          'This Cookie Policy explains how LEGRINO TEES ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.',
        whatAre: {
          title: "What Are Cookies?",
          p1: "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.",
          p2: 'Cookies set by the website owner (in this case, LEGRINO TEES) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.',
        },
        whyUse: {
          title: "Why Do We Use Cookies?",
          p1: 'We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes.',
        },
        types: {
          title: "Types of Cookies We Use",
          intro:
            "The specific types of first and third-party cookies served through our website and the purposes they perform include:",
          essential: {
            title: "Essential Cookies",
            desc: "These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.",
          },
          performance: {
            title: "Performance and Functionality Cookies",
            desc: "These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.",
          },
          analytics: {
            title: "Analytics and Customization Cookies",
            desc: "These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.",
          },
          advertising: {
            title: "Advertising Cookies",
            desc: "These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.",
          },
          social: {
            title: "Social Media Cookies",
            desc: "These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites. These cookies may also be used for advertising purposes.",
          },
        },
        control: {
          title: "How Can You Control Cookies?",
          p1: "You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner on our website.",
          p2: "You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.",
        },
        updates: {
          title: "How Often Will We Update This Cookie Policy?",
          p1: "We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.",
          p2: "The date at the top of this Cookie Policy indicates when it was last updated.",
        },
        contact: {
          title: "Where Can You Get Further Information?",
          p1: "If you have any questions about our use of cookies or other technologies, please contact us at:",
          phone: "Phone",
          address: "Address",
        },
        returnHome: "Return to Home",
      },
    },
    shop: {
      title: "Shop Our Collection",
      all: "All",
      men: "Men",
      women: "Women",
      limited: "Limited",
      quickAdd: "Quick Add",
    },
    product: {
      color: "Color",
      size: "Size",
      sizeGuide: "Size Guide",
      selectSize: "Please select a size",
      selectSizeAlert: "Please select a size",
      quantity: "Quantity",
      addToCart: "Add to Cart",
      wishlist: "Wishlist",
      share: "Share this product",
      freeShipping: "Free shipping on orders over $100",
      easyReturns: "30-day easy returns",
      youMayAlsoLike: "You May Also Like",
      reviews: "reviews",
      description: "Description",
      details: "Details",
      reviews_tab: "Reviews",
      selected: "Selected",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      remove: "Remove",
      continueShopping: "Continue Shopping",
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
      findingYourPerfectFit: "Finding Your Perfect Fit",
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
      standardShipping: "Standard Shipping",
      expressShipping: "Express Shipping",
      internationalShipping: "International Shipping",
      businessDays: "business days",
      shippingRates: "Shipping Rates",
      standardShippingUnder100: "Standard Shipping (Orders under $100)",
      standardShippingOver100: "Standard Shipping (Orders over $100)",
      free: "FREE",
      returnPolicy: "Return Policy",
      returnDescription: "Our return and exchange process",
      returnPolicyText:
        "We offer a 30-day return guarantee. If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund of the item price.",
      returnConditions: "Return Conditions",
      returnCondition1: "Items must be unworn, unwashed, and in original condition with all tags attached.",
      returnCondition2: "Return shipping costs are the responsibility of the customer unless the item is defective.",
      returnCondition3: "Refunds will be processed within 5-7 business days after we receive your return.",
      exchangeProcess: "Exchange Process",
      exchangeProcessText:
        "If you need a different size or color, please return your item for a refund and place a new order for the desired item.",
      startReturn: "Start Return",
      faq: "Frequently Asked Questions",
      trackOrder: "How can I track my order?",
      trackOrderAnswer:
        "Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can use this number to track your package on our website or directly on the carrier's website.",
      lostPackage: "What happens if my package is lost or damaged?",
      lostPackageAnswer:
        "If your package is lost or damaged during transit, please contact our customer service team within 7 days of the expected delivery date. We'll work with the shipping carrier to resolve the issue.",
      faq3: "How long will it take to receive my refund?",
      faq3Answer:
        "Once we receive your return, it typically takes 3-5 business days to process. After processing, it may take an additional 5-10 business days for the refund to appear on your original payment method.",
      faq4: "Can I change my shipping address after placing an order?",
      faq4Answer:
        "You can request an address change within 1 hour of placing your order by contacting our customer service team. After this window, we begin processing orders and cannot guarantee changes can be made.",
      faq5: "Do you ship internationally?",
      faq5Answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that customers are responsible for any customs fees or import taxes.",
      freeShipping: "Free Shipping",
      freeShippingText: "On all orders over $100",
      easyReturns: "Easy Returns",
      easyReturnsText: "30-day hassle-free returns",
      secureCheckout: "Secure Checkout",
      secureCheckoutText: "Your data is protected",
      moreQuestions: "Have more questions about shipping or returns?",
      contactUs: "Contact Us",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our products, orders, shipping, and more",
      searchPlaceholder: "Search for answers...",
      categories: {
        orders: "Orders",
        shipping: "Shipping",
        returns: "Returns & Exchanges",
        products: "Products",
        payment: "Payment",
        account: "Account",
      },
      stillHaveQuestions: "Still have questions?",
      cantFindAnswer: "Can't find the answer you're looking for? Please contact our customer service team.",
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated",
      intro:
        "At LEGRINO TEES, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.",
      collection: {
        title: "Information We Collect",
        intro: "We may collect personal information that you voluntarily provide to us when you:",
        register: "Register on our website",
        order: "Place an order",
        subscribe: "Subscribe to our newsletter",
        contact: "Contact us via email, phone, or social media",
        participate: "Participate in promotions or surveys",
        personalInfo:
          "The personal information we collect may include your name, email address, postal address, phone number, payment information, and any other information you choose to provide.",
      },
      usage: {
        title: "How We Use Your Information",
        intro: "We may use the information we collect for various purposes, including to:",
        process: "Process and fulfill your orders",
        send: "Send you order confirmations and updates",
        respond: "Respond to your inquiries and provide customer support",
        marketing: "Send you marketing communications (with your consent)",
        improve: "Improve our website, products, and services",
        administer: "Administer promotions, surveys, or contests",
        protect: "Protect against fraudulent or unauthorized transactions",
        comply: "Comply with legal obligations",
      },
      cookies: {
        title: "Cookies and Tracking Technologies",
        description:
          "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.",
      },
      thirdParty: {
        title: "Third-Party Disclosure",
        description1:
          "We may share your information with third parties that perform services for us or on our behalf, including payment processing, order fulfillment, data analysis, email delivery, hosting services, customer service, and marketing assistance.",
        description2:
          "We may also disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).",
      },
      security: {
        title: "Data Security",
        description:
          "We implement appropriate technical and organizational measures to maintain the safety of your personal information. However, no Internet or email transmission is ever fully secure or error-free. In particular, emails sent to or from our website may not be secure. Therefore, you should take special care in deciding what information you send to us via email.",
      },
      rights: {
        title: "Your Rights",
        intro:
          "Depending on your location, you may have certain rights regarding your personal information, including:",
        access: "The right to access the personal information we have about you",
        correction: "The right to request that we correct or update your personal information",
        deletion: "The right to request that we delete your personal information",
        optout: "The right to opt-out of marketing communications",
        contact:
          'To exercise these rights, please contact us using the information provided in the "Contact Us" section below.',
      },
      changes: {
        title: "Changes to This Privacy Policy",
        description:
          'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.',
      },
      contactUs: {
        title: "Contact Us",
        description: "If you have any questions about this Privacy Policy, please contact us at:",
        phone: "Phone",
        address: "Address",
      },
      returnHome: "Return to Home",
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last Updated",
      intro:
        'Please read these Terms of Service ("Terms") carefully before using the LEGRINO TEES website. These Terms constitute a legally binding agreement between you and LEGRINO TEES governing your access to and use of the website, including any content, functionality, and services offered.',
      acceptance: {
        title: "Acceptance of Terms",
        description:
          "By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our website.",
      },
      changes: {
        title: "Changes to Terms",
        description:
          "We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when we post them. Your continued use of the website following the posting of revised Terms means that you accept and agree to the changes.",
      },
      account: {
        title: "Account Registration",
        description1:
          "To access certain features of the website, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
        description2:
          "You are responsible for safeguarding your password and for all activities that occur under your account. You agree not to disclose your password to any third party.",
      },
      products: {
        title: "Products and Services",
        description1:
          "All features, specifications, products, and prices of products and services described or depicted on this website are subject to change at any time without notice.",
        description2:
          "We make every effort to display as accurately as possible the colors of our products that appear on the website. However, we cannot guarantee that your computer's display of any color will be accurate.",
      },
      payment: {
        title: "Payment Terms",
        description1:
          "All prices are shown in US dollars and applicable taxes and shipping costs are added at checkout. Payment must be made at the time of purchase.",
        description2:
          "We accept various payment methods as indicated on our website. By providing a payment method, you represent and warrant that you are authorized to use the designated payment method and that the payment information you provide is true and accurate.",
      },
      shipping: {
        title: "Shipping and Delivery",
        description:
          "We ship to the address you provide at checkout. Delivery times are estimates and not guaranteed. We are not responsible for delays beyond our control, including but not limited to carrier delays, weather conditions, or other force majeure events.",
      },
      returns: {
        title: "Returns and Refunds",
        description:
          "Please refer to our Return Policy for information about returning products and receiving refunds. Our Return Policy is incorporated into these Terms by reference.",
      },
      intellectual: {
        title: "Intellectual Property Rights",
        description:
          "The website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by LEGRINO TEES, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
      },
      prohibited: {
        title: "Prohibited Uses",
        intro:
          "You may use our website only for lawful purposes and in accordance with these Terms. You agree not to use our website:",
        violate: "In any way that violates any applicable federal, state, local, or international law or regulation",
        transmit:
          "To transmit, or procure the sending of, any advertising or promotional material, including any 'junk mail', 'chain letter', 'spam', or any other similar solicitation",
        impersonate:
          "To impersonate or attempt to impersonate LEGRINO TEES, a LEGRINO TEES employee, another user, or any other person or entity",
        restrict:
          "To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or which, as determined by us, may harm LEGRINO TEES or users of the website, or expose them to liability",
      },
      liability: {
        title: "Limitation of Liability",
        description:
          "In no event will LEGRINO TEES, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the website, any websites linked to it, any content on the website or such other websites, including any direct, indirect, special, incidental, consequential, or punitive damages.",
      },
      governing: {
        title: "Governing Law",
        description:
          "These Terms and any dispute or claim arising out of or related to them, their subject matter, or their formation shall be governed by and construed in accordance with the laws of the State of New York, without giving effect to any choice or conflict of law provision or rule.",
      },
      contact: {
        title: "Contact Us",
        description: "If you have any questions about these Terms, please contact us at:",
        phone: "Phone",
        address: "Address",
      },
      returnHome: "Return to Home",
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
      partners: "Unsere Partner",
      paymentMethods: "Unsere Zahlungsarten",
      benefits: "Unsere Vorteile",
      freeShipping: "Kostenloser Versand ab 50,00€",
      returnPolicy: "30 Tage Rückgaberecht",
      flexiblePayment: "Flexible Zahlungsmethoden",
    },
    user: {
      signin: "Anmelden",
      register: "Registrieren",
      account: "Mein Konto",
      orders: "Bestellungen",
      wishlist: "Wunschliste",
      details: "Einstellungen",
      signOut: "Abmelden",
    },
    contact: {
      title: "Kontaktieren Sie uns",
      subtitle:
        "Wir würden gerne von Ihnen hören. Ob Sie eine Frage zu unseren Produkten haben, Hilfe bei einer Bestellung benötigen oder zusammenarbeiten möchten, wir sind hier, um zu helfen.",
      formTitle: "Senden Sie uns eine Nachricht",
      formDescription:
        "Füllen Sie das untenstehende Formular aus und wir werden uns so schnell wie möglich bei Ihnen melden.",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      send: "Nachricht senden",
      sending: "Wird gesendet...",
      messageSent: "Nachricht gesendet!",
      thankYou: "Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns in Kürze bei Ihnen melden.",
      contactInfo: "Kontaktinformationen",
      contactDescription: "Hier erfahren Sie, wie Sie uns direkt erreichen können.",
      address: "Adresse",
      phone: "Telefon",
      businessHours: "Geschäftszeiten",
      followUs: "Folgen Sie uns",
      stayConnected: "Bleiben Sie mit uns über soziale Medien in Verbindung.",
      otherWays: "Andere Kontaktmöglichkeiten",
    },
    account: {
      title: "Mein Konto",
      welcomeBack: "Willkommen zurück",
      overview: "Übersicht",
      orders: "Bestellungen",
      wishlist: "Wunschliste",
      details: "Kontodetails",
      cart: "Warenkorb",
      itemsInCart: "Artikel im Warenkorb",
      totalOrders: "Gesamtbestellungen",
      viewCart: "Warenkorb anzeigen",
      viewOrders: "Bestellungen anzeigen",
      recentActivity: "Letzte Aktivitäten",
      lastLogin: "Letzter Login",
      memberSince: "Mitglied seit",
      recentOrders: "Letzte Bestellungen",
      recentPurchases: "Ihre letzten Einkäufe",
      noOrders: "Sie haben noch keine Bestellungen aufgegeben",
      startShopping: "Einkauf starten",
      orderHistory: "Bestellverlauf",
      viewAllOrders: "Alle Ihre vergangenen Bestellungen anzeigen",
      placedOn: "Bestellt am",
      items: "Artikel",
      viewDetails: "Details anzeigen",
      noOrdersYet: "Noch keine Bestellungen",
      myWishlist: "Meine Wunschliste",
      savedForLater: "Für später gespeicherte Artikel",
      wishlistEmpty: "Ihre Wunschliste ist leer",
      saveItems: "Speichern Sie Artikel, die Ihnen gefallen, in Ihrer Wunschliste",
      exploreProducts: "Produkte entdecken",
      accountInfo: "Kontoinformationen",
      personalDetails: "Ihre persönlichen Daten",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      editProfile: "Profil bearbeiten",
      addresses: "Adressen",
      manageAddresses: "Verwalten Sie Ihre gespeicherten Adressen",
      noAddresses: "Sie haben noch keine Adressen gespeichert",
      addAddress: "Adresse hinzufügen",
      editProfileTitle: "Profil bearbeiten",
      cancel: "Abbrechen",
      saveChanges: "Änderungen speichern",
      addNewAddress: "Neue Adresse hinzufügen",
      streetAddress: "Straße und Hausnummer",
      city: "Stadt",
      stateProvince: "Bundesland/Provinz",
      zipCode: "Postleitzahl",
      country: "Land",
      saveAddress: "Adresse speichern",
      selected: "Ausgewählt",
      decrease: "Menge verringern",
      increase: "Menge erhöhen",
      remove: "Entfernen",
      continueShopping: "Weiter einkaufen",
    },
    cart: {
      title: "Warenkorb",
      empty: "Dein Warenkorb ist leer",
      emptyMessage: "Es sieht so aus, als hättest du noch keine Artikel in deinen Warenkorb gelegt.",
      continueShopping: "Weiter einkaufen",
      subtotal: "Zwischensumme",
      checkout: "Zur Kasse",
      viewCart: "Warenkorb anzeigen",
      shippingTaxes: "Versand und Steuern werden an der Kasse berechnet",
      orderSummary: "Bestellübersicht",
      discount: "Rabatt",
      total: "Gesamtsumme",
      promoCode: "Gutscheincode",
      apply: "Anwenden",
      promoApplied: "Gutscheincode erfolgreich angewendet!",
      promoTry: 'Versuchen Sie "WELCOME10" für 10% Rabatt auf Ihre erste Bestellung',
      proceedToCheckout: "Zur Kasse gehen",
      cartItems: "Warenkorbartikel",
      remove: "Entfernen",
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
      policy: {
        title: "Cookie-Richtlinie",
        lastUpdated: "Zuletzt aktualisiert",
        intro:
          'Diese Cookie-Richtlinie erklärt, wie LEGRINO TEES ("wir", "uns" oder "unser") Cookies und ähnliche Technologien verwendet, um Sie zu erkennen, wenn Sie unsere Website besuchen. Sie erklärt, was diese Technologien sind und warum wir sie verwenden, sowie Ihre Rechte zur Kontrolle unserer Verwendung dieser Technologien.',
        whatAre: {
          title: "Was sind Cookies?",
          p1: "Cookies sind kleine Datendateien, die auf Ihrem Computer oder Mobilgerät platziert werden, wenn Sie eine Website besuchen. Cookies werden von Website-Betreibern häufig verwendet, um ihre Websites funktionsfähig zu machen oder effizienter zu arbeiten, sowie um Berichtsinformationen bereitzustellen.",
          p2: 'Cookies, die vom Website-Betreiber (in diesem Fall LEGRINO TEES) gesetzt werden, werden als "Erstanbieter-Cookies" bezeichnet. Cookies, die von anderen Parteien als dem Website-Betreiber gesetzt werden, werden als "Drittanbieter-Cookies" bezeichnet. Drittanbieter-Cookies ermöglichen Drittanbieterfunktionen oder -funktionalitäten auf oder über die Website (z.B. Werbung, interaktive Inhalte und Analysen). Die Parteien, die diese Drittanbieter-Cookies setzen, können Ihren Computer sowohl erkennen, wenn er die betreffende Website besucht, als auch wenn er bestimmte andere Websites besucht.',
        },
        whyUse: {
          title: "Warum verwenden wir Cookies?",
          p1: 'Wir verwenden Erstanbieter- und Drittanbieter-Cookies aus mehreren Gründen. Einige Cookies sind aus technischen Gründen erforderlich, damit unsere Website funktioniert, und wir bezeichnen diese als "wesentliche" oder "unbedingt notwendige" Cookies. Andere Cookies ermöglichen es uns auch, die Interessen unserer Benutzer zu verfolgen und zu verfolgen, um das Erlebnis auf unserer Website zu verbessern. Dritte stellen Cookies über unsere Website für Werbung, Analysen und andere Zwecke bereit.',
        },
        types: {
          title: "Arten von Cookies, die wir verwenden",
          intro:
            "Die spezifischen Arten von Erst- und Drittanbieter-Cookies, die über unsere Website bereitgestellt werden, und die Zwecke, die sie erfüllen, umfassen:",
          essential: {
            title: "Wesentliche Cookies",
            desc: "Diese Cookies sind unbedingt erforderlich, um Ihnen die über unsere Website verfügbaren Dienste bereitzustellen und einige ihrer Funktionen zu nutzen, wie z.B. den Zugriff auf sichere Bereiche. Da diese Cookies für die Bereitstellung der Website unbedingt erforderlich sind, können Sie sie nicht ablehnen, ohne die Funktionsweise unserer Website zu beeinträchtigen.",
          },
          performance: {
            title: "Leistungs- und Funktionalitäts-Cookies",
            desc: "Diese Cookies werden verwendet, um die Leistung und Funktionalität unserer Website zu verbessern, sind aber nicht wesentlich für deren Nutzung. Ohne diese Cookies stehen Ihnen jedoch möglicherweise bestimmte Funktionen nicht zur Verfügung.",
          },
          analytics: {
            title: "Analyse- und Anpassungs-Cookies",
            desc: "Diese Cookies sammeln Informationen, die entweder in aggregierter Form verwendet werden, um uns zu helfen zu verstehen, wie unsere Website genutzt wird oder wie effektiv unsere Marketingkampagnen sind, oder um uns zu helfen, unsere Website für Sie anzupassen.",
          },
          advertising: {
            title: "Werbe-Cookies",
            desc: "Diese Cookies werden verwendet, um Werbebotschaften für Sie relevanter zu gestalten. Sie erfüllen Funktionen wie das Verhindern, dass dieselbe Anzeige ständig wieder erscheint, das Sicherstellen, dass Anzeigen ordnungsgemäß angezeigt werden, und in einigen Fällen das Auswählen von Anzeigen, die auf Ihren Interessen basieren.",
          },
          social: {
            title: "Social-Media-Cookies",
            desc: "Diese Cookies werden verwendet, um Ihnen das Teilen von Seiten und Inhalten, die Sie auf unserer Website interessant finden, über Drittanbieter-Social-Networking und andere Websites zu ermöglichen. Diese Cookies können auch für Werbezwecke verwendet werden.",
          },
        },
        control: {
          title: "Wie können Sie Cookies kontrollieren?",
          p1: "Sie haben das Recht zu entscheiden, ob Sie Cookies akzeptieren oder ablehnen möchten. Sie können Ihre Cookie-Präferenzen ausüben, indem Sie auf die entsprechenden Opt-out-Links klicken, die im Cookie-Banner auf unserer Website bereitgestellt werden.",
          p2: "Sie können auch die Steuerelemente Ihres Webbrowsers einstellen oder ändern, um Cookies zu akzeptieren oder abzulehnen. Wenn Sie sich entscheiden, Cookies abzulehnen, können Sie unsere Website trotzdem nutzen, obwohl Ihr Zugriff auf einige Funktionen und Bereiche unserer Website eingeschränkt sein kann. Da die Mittel, mit denen Sie Cookies über die Steuerelemente Ihres Webbrowsers ablehnen können, von Browser zu Browser unterschiedlich sind, sollten Sie das Hilfemenü Ihres Browsers besuchen, um weitere Informationen zu erhalten.",
        },
        updates: {
          title: "Wie oft werden wir diese Cookie-Richtlinie aktualisieren?",
          p1: "Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um beispielsweise Änderungen an den von uns verwendeten Cookies oder aus anderen betrieblichen, rechtlichen oder regulatorischen Gründen widerzuspiegeln. Bitte besuchen Sie diese Cookie-Richtlinie daher regelmäßig, um über unsere Verwendung von Cookies und verwandten Technologien informiert zu bleiben.",
          p2: "Das Datum oben in dieser Cookie-Richtlinie gibt an, wann sie zuletzt aktualisiert wurde.",
        },
        contact: {
          title: "Wo können Sie weitere Informationen erhalten?",
          p1: "Wenn Sie Fragen zu unserer Verwendung von Cookies oder anderen Technologien haben, kontaktieren Sie uns bitte unter:",
          phone: "Telefon",
          address: "Adresse",
        },
        returnHome: "Zurück zur Startseite",
      },
    },
    shop: {
      title: "Unsere Kollektion",
      all: "Alle",
      men: "Herren",
      women: "Damen",
      limited: "Limitierte Edition",
      quickAdd: "Hinzufügen",
    },
    product: {
      color: "Farbe",
      size: "Größe",
      sizeGuide: "Größentabelle",
      selectSize: "Bitte wählen Sie eine Größe",
      selectSizeAlert: "Bitte wählen Sie eine Größe",
      quantity: "Menge",
      addToCart: "In den Warenkorb",
      wishlist: "Wunschliste",
      share: "Produkt teilen",
      freeShipping: "Kostenloser Versand bei Bestellungen über 100€",
      easyReturns: "30 Tage einfache Rückgabe",
      youMayAlsoLike: "Das könnte Ihnen auch gefallen",
      reviews: "Bewertungen",
      description: "Beschreibung",
      details: "Details",
      reviews_tab: "Bewertungen",
      selected: "Ausgewählt",
      decrease: "Menge verringern",
      increase: "Menge erhöhen",
      remove: "Entfernen",
      continueShopping: "Weiter einkaufen",
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
      findingYourPerfectFit: "Finden Sie Ihre perfekte Passform",
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
      businessDays: "Werktage",
      shippingRates: "Versandkosten",
      standardShippingUnder100: "Standardversand (Bestellungen unter 100€)",
      standardShippingOver100: "Standardversand (Bestellungen über 100€)",
      free: "KOSTENLOS",
      returnPolicy: "Rückgaberichtlinien",
      returnDescription: "Unser Rückgabe- und Umtauschprozess",
      returnPolicyText:
        "Wir bieten eine 30-tägige Rückgabegarantie. Wenn Sie mit Ihrem Kauf nicht vollständig zufrieden sind, können Sie ihn innerhalb von 30 Tagen nach Lieferung für eine vollständige Rückerstattung des Artikelpreises zurücksenden.",
      returnConditions: "Rückgabebedingungen",
      returnCondition1:
        "Artikel müssen ungetragen, ungewaschen und im Originalzustand mit allen angebrachten Etiketten sein.",
      returnCondition2: "Die Kosten für den Rückversand trägt der Kunde, es sei denn, der Artikel ist defekt.",
      returnCondition3: "Rückerstattungen werden innerhalb von 5-7 Werktagen nach Erhalt Ihrer Rücksendung bearbeitet.",
      exchangeProcess: "Umtauschprozess",
      exchangeProcessText:
        "Wenn Sie eine andere Größe oder Farbe benötigen, senden Sie bitte Ihren Artikel zur Rückerstattung zurück und bestellen Sie den gewünschten Artikel neu.",
      startReturn: "Rückgabe starten",
      faq: "Häufig gestellte Fragen",
      trackOrder: "Wie kann ich meine Bestellung verfolgen?",
      trackOrderAnswer:
        "Sobald Ihre Bestellung versendet wurde, erhalten Sie eine Versandbestätigungs-E-Mail mit einer Sendungsverfolgungsnummer. Sie können diese Nummer verwenden, um Ihr Paket auf unserer Website oder direkt auf der Website des Transportunternehmens zu verfolgen.",
      lostPackage: "Was passiert, wenn mein Paket verloren geht oder beschädigt wird?",
      lostPackageAnswer:
        "Wenn Ihr Paket während des Transports verloren geht oder beschädigt wird, kontaktieren Sie bitte unser Kundenserviceteam innerhalb von 7 Tagen nach dem erwarteten Lieferdatum. Wir werden mit dem Transportunternehmen zusammenarbeiten, um das Problem zu lösen.",
      faq3: "Wie lange dauert es, bis ich meine Rückerstattung erhalte?",
      faq3Answer:
        "Sobald wir Ihre Rücksendung erhalten haben, dauert die Bearbeitung in der Regel 3-5 Werktage. Nach der Bearbeitung kann es weitere 5-10 Werktage dauern, bis die Rückerstattung auf Ihrer ursprünglichen Zahlungsmethode erscheint.",
      faq4: "Kann ich meine Lieferadresse nach der Bestellung ändern?",
      faq4Answer:
        "Sie können eine Adressänderung innerhalb von 1 Stunde nach der Bestellung beantragen, indem Sie unser Kundenserviceteam kontaktieren. Nach diesem Zeitfenster beginnen wir mit der Bearbeitung der Bestellungen und können nicht garantieren, dass Änderungen vorgenommen werden können.",
      faq5: "Liefern Sie international?",
      faq5Answer:
        "Ja, wir liefern in die meisten Länder weltweit. Die internationalen Versandkosten und Lieferzeiten variieren je nach Standort. Bitte beachten Sie, dass Kunden für alle Zollgebühren oder Einfuhrsteuern verantwortlich sind.",
      freeShipping: "Kostenloser Versand",
      freeShippingText: "Bei allen Bestellungen über 100€",
      easyReturns: "Einfache Rückgabe",
      easyReturnsText: "30 Tage problemlose Rückgabe",
      secureCheckout: "Sicherer Checkout",
      secureCheckoutText: "Ihre Daten sind geschützt",
      moreQuestions: "Haben Sie weitere Fragen zu Versand oder Rückgabe?",
      contactUs: "Kontaktieren Sie uns",
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
    privacy: {
      title: "Datenschutzrichtlinie",
      lastUpdated: "Zuletzt aktualisiert",
      intro:
        "Bei LEGRINO TEES nehmen wir Ihre Privatsphäre ernst. Diese Datenschutzrichtlinie erklärt, wie wir Ihre Informationen sammeln, verwenden, offenlegen und schützen, wenn Sie unsere Website besuchen oder einen Kauf tätigen.",
      collection: {
        title: "Informationen, die wir sammeln",
        intro: "Wir können personenbezogene Daten sammeln, die Sie uns freiwillig zur Verfügung stellen, wenn Sie:",
        register: "Sich auf unserer Website registrieren",
        order: "Eine Bestellung aufgeben",
        subscribe: "Unseren Newsletter abonnieren",
        contact: "Uns per E-Mail, Telefon oder soziale Medien kontaktieren",
        participate: "An Werbeaktionen oder Umfragen teilnehmen",
        personalInfo:
          "Die personenbezogenen Daten, die wir sammeln, können Ihren Namen, Ihre E-Mail-Adresse, Ihre Postanschrift, Ihre Telefonnummer, Ihre Zahlungsinformationen und alle anderen Informationen umfassen, die Sie uns zur Verfügung stellen möchten.",
      },
      usage: {
        title: "Wie wir Ihre Informationen verwenden",
        intro: "Wir können die von uns gesammelten Informationen für verschiedene Zwecke verwenden, unter anderem um:",
        process: "Ihre Bestellungen zu bearbeiten und zu erfüllen",
        send: "Ihnen Bestellbestätigungen und Updates zu senden",
        respond: "Auf Ihre Anfragen zu antworten und Kundenservice zu bieten",
        marketing: "Ihnen Marketingmitteilungen zu senden (mit Ihrer Zustimmung)",
        improve: "Unsere Website, Produkte und Dienstleistungen zu verbessern",
        administer: "Werbeaktionen, Umfragen oder Gewinnspiele zu verwalten",
        protect: "Vor betrügerischen oder unbefugten Transaktionen zu schützen",
        comply: "Gesetzliche Verpflichtungen zu erfüllen",
      },
      cookies: {
        title: "Cookies und Tracking-Technologien",
        description:
          "Wir verwenden Cookies und ähnliche Tracking-Technologien, um Aktivitäten auf unserer Website zu verfolgen und bestimmte Informationen zu speichern. Cookies sind Dateien mit einer kleinen Datenmenge, die möglicherweise eine anonyme eindeutige Kennung enthalten. Sie können Ihren Browser anweisen, alle Cookies abzulehnen oder anzuzeigen, wann ein Cookie gesendet wird. Wenn Sie jedoch keine Cookies akzeptieren, können Sie möglicherweise einige Teile unserer Website nicht nutzen.",
      },
      thirdParty: {
        title: "Offenlegung an Dritte",
        description1:
          "Wir können Ihre Informationen mit Dritten teilen, die Dienstleistungen für uns oder in unserem Namen erbringen, einschließlich Zahlungsabwicklung, Auftragserfüllung, Datenanalyse, E-Mail-Zustellung, Hosting-Dienste, Kundenservice und Marketingunterstützung.",
        description2:
          "Wir können Ihre Informationen auch offenlegen, wenn dies gesetzlich vorgeschrieben ist oder als Reaktion auf gültige Anfragen von Behörden (z.B. einem Gericht oder einer Regierungsbehörde).",
      },
      security: {
        title: "Datensicherheit",
        description:
          "Wir implementieren angemessene technische und organisatorische Maßnahmen, um die Sicherheit Ihrer persönlichen Daten zu gewährleisten. Jedoch ist keine Internet- oder E-Mail-Übertragung jemals vollständig sicher oder fehlerfrei. Insbesondere E-Mails, die an oder von unserer Website gesendet werden, sind möglicherweise nicht sicher. Daher sollten Sie besondere Sorgfalt walten lassen, wenn Sie entscheiden, welche Informationen Sie uns per E-Mail senden.",
      },
      rights: {
        title: "Ihre Rechte",
        intro:
          "Je nach Ihrem Standort haben Sie möglicherweise bestimmte Rechte in Bezug auf Ihre personenbezogenen Daten, darunter:",
        access: "Das Recht auf Zugang zu den personenbezogenen Daten, die wir über Sie haben",
        correction: "Das Recht zu verlangen, dass wir Ihre personenbezogenen Daten korrigieren oder aktualisieren",
        deletion: "Das Recht zu verlangen, dass wir Ihre personenbezogenen Daten löschen",
        optout: "Das Recht, sich von Marketingmitteilungen abzumelden",
        contact:
          'Um diese Rechte auszuüben, kontaktieren Sie uns bitte unter den im Abschnitt "Kontaktieren Sie uns" angegebenen Informationen.',
      },
      changes: {
        title: "Änderungen dieser Datenschutzrichtlinie",
        description:
          'Wir können unsere Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Datenschutzrichtlinie auf dieser Seite veröffentlichen und das Datum "Zuletzt aktualisiert" oben auf dieser Seite aktualisieren. Es wird empfohlen, diese Datenschutzrichtlinie regelmäßig auf Änderungen zu überprüfen.',
      },
      contactUs: {
        title: "Kontaktieren Sie uns",
        description: "Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte unter:",
        phone: "Telefon",
        address: "Adresse",
      },
      returnHome: "Zurück zur Startseite",
    },
    terms: {
      title: "Nutzungsbedingungen",
      lastUpdated: "Zuletzt aktualisiert",
      intro:
        'Bitte lesen Sie diese Nutzungsbedingungen ("Bedingungen") sorgfältig durch, bevor Sie die LEGRINO TEES-Website nutzen. Diese Bedingungen stellen eine rechtsverbindliche Vereinbarung zwischen Ihnen und LEGRINO TEES dar, die Ihren Zugriff auf und die Nutzung der Website regelt, einschließlich aller Inhalte, Funktionalitäten und angebotenen Dienste.',
      acceptance: {
        title: "Annahme der Bedingungen",
        description:
          "Durch den Zugriff auf oder die Nutzung unserer Website stimmen Sie zu, an diese Bedingungen gebunden zu sein. Wenn Sie diesen Bedingungen nicht zustimmen, dürfen Sie nicht auf unsere Website zugreifen oder diese nutzen.",
      },
      changes: {
        title: "Änderungen der Bedingungen",
        description:
          "Wir können diese Bedingungen von Zeit zu Zeit nach eigenem Ermessen überarbeiten und aktualisieren. Alle Änderungen sind sofort wirksam, wenn wir sie veröffentlichen. Ihre fortgesetzte Nutzung der Website nach der Veröffentlichung überarbeiteter Bedingungen bedeutet, dass Sie die Änderungen akzeptieren und ihnen zustimmen.",
      },
      account: {
        title: "Kontoregistrierung",
        description1:
          "Um auf bestimmte Funktionen der Website zugreifen zu können, müssen Sie möglicherweise ein Konto registrieren. Sie stimmen zu, während des Registrierungsprozesses genaue, aktuelle und vollständige Informationen anzugeben und diese Informationen zu aktualisieren, um sie genau, aktuell und vollständig zu halten.",
        description2:
          "Sie sind für den Schutz Ihres Passworts und für alle Aktivitäten, die unter Ihrem Konto stattfinden, verantwortlich. Sie stimmen zu, Ihr Passwort keinem Dritten offenzulegen.",
      },
      products: {
        title: "Produkte und Dienstleistungen",
        description1:
          "Alle Merkmale, Spezifikationen, Produkte und Preise von Produkten und Dienstleistungen, die auf dieser Website beschrieben oder dargestellt werden, können jederzeit ohne vorherige Ankündigung geändert werden.",
        description2:
          "Wir bemühen uns, die Farben unserer Produkte, die auf der Website erscheinen, so genau wie möglich darzustellen. Wir können jedoch nicht garantieren, dass die Anzeige einer Farbe auf Ihrem Computer genau ist.",
      },
      payment: {
        title: "Zahlungsbedingungen",
        description1:
          "Alle Preise werden in US-Dollar angezeigt, und anwendbare Steuern und Versandkosten werden beim Checkout hinzugefügt. Die Zahlung muss zum Zeitpunkt des Kaufs erfolgen.",
        description2:
          "Wir akzeptieren verschiedene Zahlungsmethoden, wie auf unserer Website angegeben. Indem Sie eine Zahlungsmethode angeben, erklären und garantieren Sie, dass Sie zur Nutzung der angegebenen Zahlungsmethode berechtigt sind und dass die von Ihnen angegebenen Zahlungsinformationen wahr und korrekt sind.",
      },
      shipping: {
        title: "Versand und Lieferung",
        description:
          "Wir versenden an die Adresse, die Sie beim Checkout angeben. Lieferzeiten sind Schätzungen und nicht garantiert. Wir sind nicht verantwortlich für Verzögerungen, die außerhalb unserer Kontrolle liegen, einschließlich, aber nicht beschränkt auf Transportverzögerungen, Wetterbedingungen oder andere höhere Gewalt.",
      },
      returns: {
        title: "Rückgaben und Erstattungen",
        description:
          "Bitte beachten Sie unsere Rückgaberichtlinie für Informationen zur Rückgabe von Produkten und zum Erhalt von Erstattungen. Unsere Rückgaberichtlinie ist durch Bezugnahme in diese Bedingungen eingebunden.",
      },
      intellectual: {
        title: "Rechte an geistigem Eigentum",
        description:
          "Die Website und ihr gesamter Inhalt, ihre Funktionen und Funktionalität (einschließlich, aber nicht beschränkt auf alle Informationen, Software, Text, Anzeigen, Bilder, Video und Audio sowie das Design, die Auswahl und Anordnung davon) sind Eigentum von LEGRINO TEES, seinen Lizenzgebern oder anderen Anbietern solcher Materialien und sind durch Urheberrechts-, Marken-, Patent-, Geschäftsgeheimnis- und andere Gesetze zum geistigen Eigentum oder zu Eigentumsrechten geschützt.",
      },
      prohibited: {
        title: "Verbotene Nutzungen",
        intro:
          "Sie dürfen unsere Website nur für rechtmäßige Zwecke und in Übereinstimmung mit diesen Bedingungen nutzen. Sie stimmen zu, unsere Website nicht zu nutzen:",
        violate:
          "In einer Weise, die gegen geltende Bundes-, Landes-, lokale oder internationale Gesetze oder Vorschriften verstößt",
        transmit:
          "Um Werbematerial oder Werbung zu übermitteln oder deren Versendung zu veranlassen, einschließlich 'Junk-Mail', 'Kettenbrief', 'Spam' oder ähnlicher Aufforderungen",
        impersonate:
          "Um sich als LEGRINO TEES, einen Mitarbeiter von LEGRINO TEES, einen anderen Benutzer oder eine andere Person oder Einrichtung auszugeben oder dies zu versuchen",
        restrict:
          "Um sich an einem anderen Verhalten zu beteiligen, das die Nutzung oder den Genuss der Website durch andere einschränkt oder hemmt, oder das nach unserer Feststellung LEGRINO TEES oder Benutzer der Website schädigen oder einer Haftung aussetzen könnte",
      },
      liability: {
        title: "Haftungsbeschränkung",
        description:
          "In keinem Fall haften LEGRINO TEES, seine verbundenen Unternehmen oder deren Lizenzgeber, Dienstleister, Mitarbeiter, Vertreter, leitende Angestellte oder Direktoren für Schäden jeglicher Art, unter jeder Rechtstheorie, die aus oder in Verbindung mit Ihrer Nutzung oder Unfähigkeit zur Nutzung der Website, jeder mit ihr verlinkten Website, jeglichem Inhalt auf der Website oder solchen anderen Websites entstehen, einschließlich direkter, indirekter, besonderer, zufälliger, Folge- oder Strafschäden.",
      },
      governing: {
        title: "Geltendes Recht",
        description:
          "Diese Bedingungen und jeder Streit oder Anspruch, der aus ihnen oder in Verbindung mit ihnen, ihrem Gegenstand oder ihrer Entstehung entsteht, unterliegen den Gesetzen des Bundesstaates New York und werden in Übereinstimmung mit diesen ausgelegt, ohne Berücksichtigung von Rechtswahl- oder Kollisionsnormen.",
      },
      contact: {
        title: "Kontaktieren Sie uns",
        description: "Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte unter:",
        phone: "Telefon",
        address: "Adresse",
      },
      returnHome: "Zurück zur Startseite",
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
        console.warn(`Translation key not found: ${key}`)
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
