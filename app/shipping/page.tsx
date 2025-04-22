"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, RefreshCw, Clock, Globe, ShieldCheck } from "lucide-react"

// Update the Shipping page to use translations
import { useLanguage } from "@/context/language-context"

export default function ShippingPage() {
  const { t } = useLanguage()

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("shipping.title")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("shipping.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                {t("shipping.shippingPolicy")}
              </CardTitle>
              <CardDescription>{t("shipping.shippingDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{t("shipping.processingTime")}</h3>
                  <p className="text-sm text-gray-600">{t("shipping.processingTimeText")}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">{t("shipping.deliveryMethods")}</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <Clock className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <span className="font-medium">{t("shipping.standardShipping")}:</span> 3-5{" "}
                        {t("shipping.businessDays")}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <span className="font-medium">{t("shipping.expressShipping")}:</span> 1-2{" "}
                        {t("shipping.businessDays")}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Globe className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <span className="font-medium">{t("shipping.internationalShipping")}:</span> 7-14{" "}
                        {t("shipping.businessDays")}
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">{t("shipping.shippingRates")}</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex justify-between">
                      <span>{t("shipping.standardShippingUnder100")}</span>
                      <span className="font-medium">$5.99</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("shipping.standardShippingOver100")}</span>
                      <span className="font-medium text-green-600">{t("shipping.free")}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("shipping.expressShipping")}</span>
                      <span className="font-medium">$12.99</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("shipping.internationalShipping")}</span>
                      <span className="font-medium">$19.99</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                {t("shipping.returnPolicy")}
              </CardTitle>
              <CardDescription>{t("shipping.returnDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">{t("shipping.returnPolicy")}</h3>
                <p className="text-sm text-gray-600">{t("shipping.returnPolicyText")}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">{t("shipping.returnConditions")}</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li>{t("shipping.returnCondition1")}</li>
                  <li>{t("shipping.returnCondition2")}</li>
                  <li>{t("shipping.returnCondition3")}</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">{t("shipping.exchangeProcess")}</h3>
                <p className="text-sm text-gray-600">{t("shipping.exchangeProcessText")}</p>
              </div>

              <div className="pt-2">
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="w-full">
                    {t("shipping.startReturn")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-16">
          <h2 className="text-xl font-bold mb-6">{t("shipping.faq")}</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t("shipping.trackOrder")}</AccordionTrigger>
              <AccordionContent>{t("shipping.trackOrderAnswer")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>{t("shipping.lostPackage")}</AccordionTrigger>
              <AccordionContent>{t("shipping.lostPackageAnswer")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>{t("shipping.faq3")}</AccordionTrigger>
              <AccordionContent>{t("shipping.faq3Answer")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>{t("shipping.faq4")}</AccordionTrigger>
              <AccordionContent>{t("shipping.faq4Answer")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>{t("shipping.faq5")}</AccordionTrigger>
              <AccordionContent>{t("shipping.faq5Answer")}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-bold mb-2">{t("shipping.freeShipping")}</h3>
            <p className="text-sm text-gray-600">{t("shipping.freeShippingText")}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-bold mb-2">{t("shipping.easyReturns")}</h3>
            <p className="text-sm text-gray-600">{t("shipping.easyReturnsText")}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-bold mb-2">{t("shipping.secureCheckout")}</h3>
            <p className="text-sm text-gray-600">{t("shipping.secureCheckoutText")}</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">{t("shipping.moreQuestions")}</p>
          <Link href="/contact">
            <Button>{t("shipping.contactUs")}</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
