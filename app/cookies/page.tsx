"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context" // Asegurarse de importar useLanguage

export default function CookiePolicy() {
  const { t, language } = useLanguage() // Añadir hook useLanguage para obtener traducciones

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-8">{t("cookies.policy.title")}</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            {t("cookies.policy.lastUpdated")}: {language === "de" ? "27. März 2024" : "March 27, 2024"}
          </p>

          <p className="mb-6">{t("cookies.policy.intro")}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{t("cookies.policy.whatAre.title")}</h2>

          <p className="mb-6">{t("cookies.policy.whatAre.p1")}</p>

          <p className="mb-6">{t("cookies.policy.whatAre.p2")}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{t("cookies.policy.whyUse.title")}</h2>

          <p className="mb-6">{t("cookies.policy.whyUse.p1")}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{t("cookies.policy.types.title")}</h2>

          <p className="mb-4">{t("cookies.policy.types.intro")}</p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>{t("cookies.policy.types.essential.title")}:</strong> {t("cookies.policy.types.essential.desc")}
            </li>
            <li>
              <strong>{t("cookies.policy.types.performance.title")}:</strong>{" "}
              {t("cookies.policy.types.performance.desc")}
            </li>
            <li>
              <strong>{t("cookies.policy.types.analytics.title")}:</strong> {t("cookies.policy.types.analytics.desc")}
            </li>
            <li>
              <strong>{t("cookies.policy.types.advertising.title")}:</strong>{" "}
              {t("cookies.policy.types.advertising.desc")}
            </li>
            <li>
              <strong>{t("cookies.policy.types.social.title")}:</strong> {t("cookies.policy.types.social.desc")}
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">{t("cookies.policy.control.title")}</h2>

          <p className="mb-6">{t("cookies.policy.control.p1")}</p>

          <p className="mb-6">{t("cookies.policy.control.p2")}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{t("cookies.policy.updates.title")}</h2>

          <p className="mb-6">{t("cookies.policy.updates.p1")}</p>

          <p className="mb-6">{t("cookies.policy.updates.p2")}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">{t("cookies.policy.contact.title")}</h2>

          <p className="mb-6">{t("cookies.policy.contact.p1")}</p>

          <p className="mb-10">
            Email: info@legrinotees.com
            <br />
            {t("cookies.policy.contact.phone")}: +49 (176) 3148-1934
            <br />
            {t("cookies.policy.contact.address")}: Langenkamp 67, 49082, Osnabrück
          </p>

          <div className="mt-12 flex justify-center">
            <Link href="/">
              <Button>{t("cookies.policy.returnHome")}</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
