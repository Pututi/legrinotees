"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import { useCookieConsent } from "@/context/cookie-consent-context"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

export default function CookieConsentBanner() {
  const {
    consentGiven,
    cookiePreferences,
    setConsentGiven,
    setCookiePreferences,
    showBanner,
    setShowBanner,
    openPreferences,
    setOpenPreferences,
  } = useCookieConsent()
  const { t } = useLanguage()

  // Local state for preferences modal
  const [localPreferences, setLocalPreferences] = useState({ ...cookiePreferences })

  // Accept all cookies
  const acceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    })
    setConsentGiven(true)
    setShowBanner(false)
    setOpenPreferences(false)
  }

  // Accept only necessary cookies
  const acceptNecessary = () => {
    setCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    })
    setConsentGiven(true)
    setShowBanner(false)
    setOpenPreferences(false)
  }

  // Save preferences
  const savePreferences = () => {
    setCookiePreferences(localPreferences)
    setConsentGiven(true)
    setShowBanner(false)
    setOpenPreferences(false)
  }

  // If consent is already given and banner is not shown, don't render anything
  if (!showBanner && consentGiven && !openPreferences) {
    return null
  }

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && !openPreferences && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-4 md:p-6 border-t"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{t("cookies.title")}</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {t("cookies.description")}{" "}
                    <Link href="/cookies" className="text-black underline">
                      {t("cookies.learnMore")}
                    </Link>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => setOpenPreferences(true)}>
                    {t("cookies.customize")}
                  </Button>
                  <Button variant="outline" onClick={acceptNecessary}>
                    {t("cookies.acceptNecessary")}
                  </Button>
                  <Button onClick={acceptAll}>{t("cookies.acceptAll")}</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {openPreferences && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenPreferences(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{t("cookies.preferences.title")}</h2>
                  <button
                    onClick={() => setOpenPreferences(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">{t("cookies.preferences.description")}</p>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start">
                      <Checkbox id="necessary" checked={localPreferences.necessary} disabled className="mt-1" />
                      <div className="ml-3">
                        <label htmlFor="necessary" className="font-medium block mb-1">
                          {t("cookies.preferences.necessary.title")}
                        </label>
                        <p className="text-sm text-gray-500">{t("cookies.preferences.necessary.description")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start">
                      <Checkbox
                        id="analytics"
                        checked={localPreferences.analytics}
                        onCheckedChange={(checked) =>
                          setLocalPreferences({ ...localPreferences, analytics: checked === true })
                        }
                        className="mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="analytics" className="font-medium block mb-1">
                          {t("cookies.preferences.analytics.title")}
                        </label>
                        <p className="text-sm text-gray-500">{t("cookies.preferences.analytics.description")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start">
                      <Checkbox
                        id="marketing"
                        checked={localPreferences.marketing}
                        onCheckedChange={(checked) =>
                          setLocalPreferences({ ...localPreferences, marketing: checked === true })
                        }
                        className="mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="marketing" className="font-medium block mb-1">
                          {t("cookies.preferences.marketing.title")}
                        </label>
                        <p className="text-sm text-gray-500">{t("cookies.preferences.marketing.description")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setOpenPreferences(false)}>
                    {t("cookies.preferences.cancel")}
                  </Button>
                  <Button onClick={savePreferences}>{t("cookies.preferences.save")}</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
