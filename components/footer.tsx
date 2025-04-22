"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUp, Instagram, Facebook } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const { t } = useLanguage()

  return (
    <motion.footer className="bg-black text-white relative">
      {/* Back to top button */}
      <motion.button
        className="absolute -top-6 right-6 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
        onClick={scrollToTop}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LEGRINO TEES</h3>
            <p className="text-gray-400 mb-4">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <FooterSocialIcon label="Instagram" url="https://instagram.com/legrinotees" icon={Instagram} />
              <FooterSocialIcon label="Facebook" url="https://facebook.com/legrinotees" icon={Facebook} />
              <a
                href="https://tiktok.com/@legrinotees"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                  <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                  <line x1="15" y1="4" x2="15" y2="12"></line>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">{t("footer.shop")}</h4>
            <ul className="space-y-2">
              <FooterLink href="/shop?category=men" label={t("footer.men")} />
              <FooterLink href="/shop?category=women" label={t("footer.women")} />
              <FooterLink href="/shop?category=limited" label={t("footer.limited")} />
              <FooterLink href="/shop" label={t("footer.all")} />
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">{t("footer.company")}</h4>
            <ul className="space-y-2">
              <FooterLink href="/about" label={t("footer.about")} />
              <FooterLink href="/about#sustainability" label={t("footer.sustainability")} />
              <FooterLink href="/contact" label={t("footer.contact")} />
              <FooterLink href="/cart" label={t("footer.cart")} />
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">{t("footer.service")}</h4>
            <ul className="space-y-2">
              <FooterLink href="/contact" label={t("footer.contact")} />
              <FooterLink href="/faq" label={t("footer.faq")} />
              <FooterLink href="/shipping" label={t("footer.shipping")} />
              <FooterLink href="/size-guide" label={t("footer.size")} />
            </ul>
          </div>
        </div>

        {/* Nueva sección de partners y métodos de pago */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-800">
          {/* Columna 1: Unsere Partner */}
          <div>
            <h4 className="text-lg font-medium mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t("footer.partners")}
            </h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-yellow-400 rounded p-2 flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">DHL</span>
              </div>
              <div className="bg-yellow-400 rounded p-2 flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">DHL EXPRESS</span>
              </div>
              <div className="bg-white rounded p-2 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">Hermes</span>
              </div>
              <div className="bg-blue-800 rounded p-2 flex items-center justify-center">
                <span className="text-xs font-bold text-white">GLS</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Unsere Bezahlarten */}
          <div>
            <h4 className="text-lg font-medium mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              {t("footer.paymentMethods")}
            </h4>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="bg-white rounded p-2 flex items-center justify-center">
                <div className="relative h-6 w-10 flex items-center justify-center">
                  <div className="absolute left-0 h-5 w-5 bg-red-500 rounded-full"></div>
                  <div className="absolute right-0 h-5 w-5 bg-yellow-500 rounded-full opacity-90"></div>
                </div>
              </div>
              <div className="bg-white rounded p-2 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-900">VISA</span>
              </div>
              <div className="bg-white rounded p-2 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">PayPal</span>
              </div>
              <div className="bg-white rounded p-2 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800">Rechnung</span>
              </div>
              <div className="bg-white rounded p-2 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-800">SEPA</span>
              </div>
            </div>
          </div>

          {/* Columna 3: Unsere Vorteile */}
          <div>
            <h4 className="text-lg font-medium mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t("footer.benefits")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t("footer.freeShipping")}</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t("footer.returnPolicy")}</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t("footer.flexiblePayment")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} LEGRINO TEES. {t("footer.rights")}
          </p>
          <div className="flex space-x-6">
            <FooterLink href="/privacy" label={t("footer.privacy")} small />
            <FooterLink href="/terms" label={t("footer.terms")} small />
            <FooterLink href="/cookies" label={t("footer.cookies")} small />
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

function FooterLink({ href, label, small = false }) {
  return (
    <li>
      <Link
        href={href}
        className={`text-gray-400 hover:text-white hover:underline transition-colors duration-300 ${small ? "text-sm" : ""}`}
      >
        {label}
      </Link>
    </li>
  )
}

function FooterSocialIcon({ label, url, icon: Icon }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors duration-300"
    >
      {Icon ? <Icon className="w-5 h-5" /> : label.charAt(0)}
    </a>
  )
}
