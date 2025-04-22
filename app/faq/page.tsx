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

  // FAQ categories and questions
  const ordersFAQs = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our collection, selecting your desired items, choosing your size and quantity, and proceeding to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. After this window, we begin processing orders and cannot guarantee changes can be made.",
    },
    {
      question: "How can I check the status of my order?",
      answer:
        "You can check the status of your order by logging into your account and viewing your order history. You'll also receive email updates as your order is processed, shipped, and delivered.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, we offer gift wrapping for an additional $5 per item. You can select this option during checkout and include a personalized message for the recipient.",
    },
    {
      question: "Can I order by phone?",
      answer:
        "Currently, we only accept orders through our website to ensure all order details are accurately captured and processed.",
    },
  ]

  const shippingFAQs = [
    {
      question: "How long will it take to receive my order?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. Express shipping is 1-2 business days. International shipping can take 7-14 business days depending on the destination.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that customers are responsible for any customs fees or import taxes.",
    },
    {
      question: "Is free shipping available?",
      answer:
        "Yes, we offer free standard shipping on all domestic orders over $100. Orders under $100 have a flat shipping rate of $5.99.",
    },
    {
      question: "How can I track my shipment?",
      answer:
        "Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can use this number to track your package on our website or directly through the carrier's site.",
    },
    {
      question: "What if my package is lost or damaged?",
      answer:
        "If your package is lost or damaged during transit, please contact our customer service team within 7 days of the expected delivery date. We'll work with the shipping carrier to resolve the issue.",
    },
  ]

  const returnsFAQs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy. If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund of the item price.",
    },
    {
      question: "How do I return an item?",
      answer:
        "To initiate a return, please contact our customer service team with your order number and the reason for your return. We'll provide you with a return authorization and instructions on how to send the item back to us.",
    },
    {
      question: "Do I have to pay for return shipping?",
      answer:
        "Yes, customers are responsible for return shipping costs unless the item is defective or we made an error. We recommend using a trackable shipping method for returns.",
    },
    {
      question: "How long does it take to process a refund?",
      answer:
        "Once we receive your return, it typically takes 3-5 business days to process. After processing, it may take an additional 5-10 business days for the refund to appear on your original payment method.",
    },
    {
      question: "Can I exchange an item for a different size or color?",
      answer:
        "We currently do not offer direct exchanges. If you need a different size or color, please return your item for a refund and place a new order for the desired item.",
    },
  ]

  const productFAQs = [
    {
      question: "What materials are your t-shirts made from?",
      answer:
        "Our t-shirts are made from 100% organic cotton that is sustainably sourced and ethically produced. We prioritize quality and comfort in all our products.",
    },
    {
      question: "How do I care for my t-shirts?",
      answer:
        "For best results, machine wash cold with like colors, use mild detergent, and tumble dry low or hang to dry. Avoid bleach and high heat to preserve the fabric quality and print longevity.",
    },
    {
      question: "Are your products true to size?",
      answer:
        "Yes, our products are designed to be true to size with a modern, slightly fitted silhouette. Please refer to our size guide for detailed measurements to find your perfect fit.",
    },
    {
      question: "Are your products sustainable?",
      answer:
        "Yes, sustainability is at the core of our brand. We use organic materials, eco-friendly dyes, and ethical manufacturing processes to minimize our environmental impact.",
    },
    {
      question: "Do you offer custom or personalized t-shirts?",
      answer:
        "We currently do not offer custom or personalized t-shirts for individual orders. However, we do offer bulk customization for corporate orders of 50+ items.",
    },
  ]

  const paymentFAQs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.",
    },
    {
      question: "Is it safe to use my credit card on your website?",
      answer:
        "Yes, our website uses SSL encryption to protect your personal and payment information. We do not store your full credit card details on our servers.",
    },
    {
      question: "When will my credit card be charged?",
      answer:
        "Your credit card will be charged immediately when you place your order. If for any reason we cannot fulfill your order, a full refund will be issued.",
    },
    {
      question: "Do you offer installment payment options?",
      answer:
        "Yes, we offer installment payments through Affirm and Klarna. You can select these options during checkout to split your payment into multiple installments.",
    },
    {
      question: "Can I use multiple payment methods for a single order?",
      answer:
        "Currently, we can only process one payment method per order. If you wish to use multiple payment methods, you'll need to place separate orders.",
    },
  ]

  const accountFAQs = [
    {
      question: "Do I need to create an account to make a purchase?",
      answer:
        "No, you can check out as a guest without creating an account. However, creating an account allows you to track orders, save shipping information, and earn rewards.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the 'Register' link in the top navigation menu. You'll need to provide your email address and create a password. You can also register using your social media accounts for quicker access.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "To reset your password, click on the 'Login' link, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to reset your password.",
    },
    {
      question: "Can I update my account information?",
      answer:
        "Yes, you can update your account information by logging into your account and navigating to the 'Account Settings' section. Here you can modify your personal details, shipping addresses, and payment methods.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your consent.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To delete your account, please contact our customer service team. Please note that deleting your account will permanently remove all your order history and saved information.",
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
