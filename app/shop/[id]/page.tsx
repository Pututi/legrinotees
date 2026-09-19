"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { Star, Heart, Share2, Truck, RefreshCw, ZoomIn, X } from "lucide-react"
import { formatPrice } from "@/lib/currency"

// Define product interface
interface Product {
  id: number
  name: string
  price: number
  description: string
  sizes: string[]
  colors: string[]
  colorImages: Record<string, string>
  images: string[]
  category: string
  rating: number
  reviews: number
}

// Mapeo de nombres de colores a valores CSS
const colorMap = {
  Black: "#000000",
  White: "#ffffff",
  Gray: "#808080",
  Navy: "#000080",
  Pink: "#FFC0CB",
  Green: "#008000",
  Cream: "#FFFDD0",
  Charcoal: "#36454F",
  Natural: "#F1EDE4",
  Sage: "#B2C2AE",
  Sand: "#D9CBB8",
  Olive: "#5C5A42",
}

// Importar los productos desde el archivo de la página de tienda
const products = [
  {
    id: 1,
    name: "Pray More Worry Less",
    price: 34.99,
    description:
      "A soft, natural-tone t-shirt featuring a delicate floral wreath and the message 'Pray More, Worry Less' inspired by Philippians 4:6.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/pray-more-worry-less-flat.webp",
    },
    images: [
      "/images/products/pray-more-worry-less-flat.webp",
      "/images/products/pray-more-worry-less-model.webp",
    ],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 2,
    name: "Chosen Loved Redeemed",
    price: 34.99,
    description: "A bold statement tee reading 'Chosen. Loved. Redeemed.' inspired by 1 Peter 2:9.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/chosen-loved-redeemed.webp",
    },
    images: ["/images/products/chosen-loved-redeemed.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 3,
    name: "Strength and Dignity",
    price: 34.99,
    description:
      "An elegant floral silhouette design with the message 'She is clothed in Strength and Dignity', inspired by Proverbs 31:25.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/strength-and-dignity.webp",
    },
    images: ["/images/products/strength-and-dignity.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 4,
    name: "Wildflower Warrior",
    price: 32.99,
    description:
      "A hand-drawn wildflower bouquet with the words 'Wildflower Warrior', inspired by Isaiah 41:10.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/wildflower-warrior.webp",
    },
    images: ["/images/products/wildflower-warrior.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 5,
    name: "I Came I Saw I Went Home",
    price: 32.99,
    description: "A celestial moth design paired with the introvert-approved line 'I came. I saw. I went home.'",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/moth-i-came-i-saw.webp",
    },
    images: ["/images/products/moth-i-came-i-saw.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 6,
    name: "Beach Please",
    price: 29.99,
    description: "A playful beach-themed tee with flip flops, seashells and the pun 'Beach Please'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/beach-please.webp",
    },
    images: ["/images/products/beach-please.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 7,
    name: "Happily Unavailable",
    price: 29.99,
    description: "A meditating frog on a lily pad with the funny caption 'Happily Unavailable — est. since forever'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage"],
    colorImages: {
      Sage: "/images/products/happily-unavailable.webp",
    },
    images: ["/images/products/happily-unavailable.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 8,
    name: "World in His Hands",
    price: 34.99,
    description: "A minimalist line-art globe held by two hands, with the message 'He's got the whole world in His hands.'",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/world-in-his-hands.webp",
    },
    images: ["/images/products/world-in-his-hands.webp"],
    category: "limited",
    rating: 0,
    reviews: 0,
  },
  {
    id: 9,
    name: "Read Dream Bloom",
    price: 32.99,
    description: "A stack of books surrounded by florals with the words 'Read, Dream, Bloom' — made for book lovers.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/read-dream-bloom.webp",
    },
    images: ["/images/products/read-dream-bloom.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 10,
    name: "Born With Rhythm",
    price: 34.99,
    description: "A radiant sun design surrounded by maracas and music notes with the phrase 'Born With Rhythm — est. in the groove'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/born-with-rhythm-sun.webp",
    },
    images: ["/images/products/born-with-rhythm-sun.webp"],
    category: "limited",
    rating: 0,
    reviews: 0,
  },
  {
    id: 11,
    name: "Solitude is my Superpower",
    price: 32.99,
    description: "A cozy mushroom cottage illustration with the message 'Solitude is my Superpower'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/solitude-superpower.webp",
    },
    images: ["/images/products/solitude-superpower.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 12,
    name: "Alone in Space",
    price: 32.99,
    description: "A cute cartoon astronaut floating among planets and stars with the caption 'Alone in Space, Exactly as Planned'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage"],
    colorImages: {
      Sage: "/images/products/alone-in-space.webp",
    },
    images: ["/images/products/alone-in-space.webp"],
    category: "limited",
    rating: 0,
    reviews: 0,
  },
  {
    id: 13,
    name: "Moon Dancer",
    price: 34.99,
    description: "A dancer silhouette on a crescent moon surrounded by percussion instruments, with the phrase 'Born With Rhythm — children of the beat'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/moon-dancer.webp",
    },
    images: ["/images/products/moon-dancer.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 14,
    name: "Busy Do Not Disturb",
    price: 29.99,
    description: "A sleepy black cat curled up on an open book under a crescent moon, with the caption 'Busy: Do Not Disturb'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/busy-do-not-disturb.webp",
    },
    images: ["/images/products/busy-do-not-disturb.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 15,
    name: "Bold Soul",
    price: 34.99,
    description: "An oversized tee with the statement 'Bold Soul — urban spirit / inner strength'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sand"],
    colorImages: {
      Sand: "/images/products/bold-soul.webp",
    },
    images: ["/images/products/bold-soul.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 16,
    name: "Dream Loud",
    price: 34.99,
    description: "An oversized tee with the statement 'Dream Loud — chase / create / inspire'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sand"],
    colorImages: {
      Sand: "/images/products/dream-loud.webp",
    },
    images: ["/images/products/dream-loud.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 17,
    name: "Inner Force",
    price: 34.99,
    description: "An oversized black tee with the statement 'Inner Force — strong mind / strong life'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/inner-force.webp",
    },
    images: ["/images/products/inner-force.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 18,
    name: "No Limits",
    price: 34.99,
    description: "An oversized tee with the statement 'No Limits — mind over everything'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/no-limits.webp",
    },
    images: ["/images/products/no-limits.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 19,
    name: "Silent Power",
    price: 34.99,
    description: "An oversized black tee with the statement 'Silent Power — discipline built within'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/silent-power.webp",
    },
    images: ["/images/products/silent-power.webp"],
    category: "limited",
    rating: 0,
    reviews: 0,
  },
  {
    id: 20,
    name: "Rhythm",
    price: 34.99,
    description: "An oversized tee with the vertical typographic statement 'Rhythm — feel it, don't force it'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/rhythm.webp",
    },
    images: ["/images/products/rhythm.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 21,
    name: "Mix Tape",
    price: 34.99,
    description: "A vintage-wash tee featuring a bold cassette-tape character with sunglasses, headphones and gold chain — 'Mix Tape'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White"],
    colorImages: {
      Black: "/images/products/mix-tape-black.webp",
      White: "/images/products/mix-tape-white.webp",
    },
    images: ["/images/products/mix-tape-black.webp", "/images/products/mix-tape-white.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 22,
    name: "Protect Your Peace",
    price: 32.99,
    description: "An ornate sea turtle mandala design with the message 'Protect Your Peace — Deep Waters, Still Soul'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/protect-your-peace-1.webp",
    },
    images: ["/images/products/protect-your-peace-1.webp", "/images/products/protect-your-peace-2.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 23,
    name: "Gorilla Ballerina",
    price: 32.99,
    description: "A muscular gorilla dancing en pointe in a tutu — a playful, unexpected illustration for the confident and unbothered.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black"],
    colorImages: {
      White: "/images/products/gorilla-ballerina-white.webp",
      Black: "/images/products/gorilla-ballerina-black.webp",
    },
    images: ["/images/products/gorilla-ballerina-white.webp", "/images/products/gorilla-ballerina-black.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 24,
    name: "Tokyo Land of the Rhythm",
    price: 34.99,
    description: "A streetwear-inspired gorilla in sunglasses and cap, with Tokyo skyline and the statement 'Tokyo — Land of the Rhythm'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/tokyo-rhythm-1.webp",
    },
    images: ["/images/products/tokyo-rhythm-1.webp", "/images/products/tokyo-rhythm-2.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 25,
    name: "Rhythm Squad",
    price: 29.99,
    description: "A fun retro grid of eight monkey icons in sunglasses and headphones, for music lovers who don't take themselves too seriously.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/rhythm-squad-1.webp",
    },
    images: ["/images/products/rhythm-squad-1.webp", "/images/products/rhythm-squad-2.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 26,
    name: "I Am Watching You Dance",
    price: 32.99,
    description: "A striking watercolor eye design paired with the bold statement 'I Am Watching You Dance'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/watching-you-dance-1.webp",
    },
    images: ["/images/products/watching-you-dance-1.webp", "/images/products/watching-you-dance-2.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 27,
    name: "Life's Better by the Sea",
    price: 29.99,
    description: "A retro beach-icon grid — palm tree, wave, sunset and hibiscus — with the message 'Life's Better by the Sea'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/better-by-the-sea-1.webp",
    },
    images: ["/images/products/better-by-the-sea-1.webp", "/images/products/better-by-the-sea-2.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 28,
    name: "Cuban Flow",
    price: 34.99,
    description: "An oversized white tee with the statement 'Cuban Flow — sabor / ritmo / calle'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/cuban-flow.webp",
    },
    images: ["/images/products/cuban-flow.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 29,
    name: "Urban Flow",
    price: 34.99,
    description: "An oversized olive tee with the statement 'Urban Flow — move with purpose'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Olive"],
    colorImages: {
      Olive: "/images/products/urban-flow.webp",
    },
    images: ["/images/products/urban-flow.webp", "/images/products/urban-flow-2.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 30,
    name: "Legacy",
    price: 34.99,
    description: "An oversized sage tee with the statement 'Legacy — made by discipline'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage"],
    colorImages: {
      Sage: "/images/products/legacy-discipline.webp",
    },
    images: ["/images/products/legacy-discipline.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 31,
    name: "Balance",
    price: 34.99,
    description: "An oversized cream tee with the vertical statement 'Balance — mind / body / soul'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/balance-mind-body-soul.webp",
    },
    images: ["/images/products/balance-mind-body-soul.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 32,
    name: "Street Soul",
    price: 34.99,
    description: "An oversized black tee with the vertical statement 'Street Soul — urban culture / inner fire'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/street-soul.webp",
    },
    images: ["/images/products/street-soul.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 33,
    name: "Trust the Flow",
    price: 34.99,
    description: "An oversized olive tee with the vertical statement 'Trust the Flow — move with purpose'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Olive"],
    colorImages: {
      Olive: "/images/products/trust-the-flow.webp",
    },
    images: ["/images/products/trust-the-flow.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 34,
    name: "Baila Libre",
    price: 34.99,
    description: "An oversized cream tee with the vertical statement 'Baila Libre — sabor / calle / corazón'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/baila-libre.webp",
    },
    images: ["/images/products/baila-libre.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 35,
    name: "Created by Motion",
    price: 34.99,
    description: "An oversized black tee with the vertical statement 'Created by Motion — driven by purpose'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/created-by-motion.webp",
    },
    images: ["/images/products/created-by-motion.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 36,
    name: "Unbound Spirit",
    price: 34.99,
    description: "An oversized white tee with the statement 'Unbound Spirit — beyond limits / beyond fear'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/unbound-spirit.webp",
    },
    images: ["/images/products/unbound-spirit.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 37,
    name: "Awaken Within",
    price: 34.99,
    description: "An oversized black tee with the statement 'Awaken Within — wake the fire within'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/awaken-within.webp",
    },
    images: ["/images/products/awaken-within.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 38,
    name: "Unshaken Mind",
    price: 34.99,
    description: "An oversized beige tee with the statement 'Unshaken Mind — pressure cannot break you'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sand"],
    colorImages: {
      Sand: "/images/products/unshaken-mind.webp",
    },
    images: ["/images/products/unshaken-mind.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 39,
    name: "Ascend Higher",
    price: 34.99,
    description: "An oversized white tee with the statement 'Ascend Higher — rise beyond the ordinary'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/ascend-higher.webp",
    },
    images: ["/images/products/ascend-higher.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 40,
    name: "Reinvent Yourself",
    price: 34.99,
    description: "An oversized black tee with the statement 'Reinvent Yourself — destroy the old / create the new'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/reinvent-yourself.webp",
    },
    images: ["/images/products/reinvent-yourself.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 41,
    name: "Revolution / Evolution",
    price: 34.99,
    description: "An oversized black tee with the statement 'Revolution / Evolution — become what comes next'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/revolution-evolution.webp",
    },
    images: ["/images/products/revolution-evolution.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 42,
    name: "Inner Revolution",
    price: 34.99,
    description: "An oversized off-white tee with the vertical statement 'Inner Revolution — break the pattern / create your path'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/inner-revolution.webp",
    },
    images: ["/images/products/inner-revolution.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 43,
    name: "Quiet Revolution",
    price: 34.99,
    description: "An oversized olive tee with the statement 'Quiet Revolution — no noise / just movement'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Olive"],
    colorImages: {
      Olive: "/images/products/quiet-revolution.webp",
    },
    images: ["/images/products/quiet-revolution.webp"],
    category: "men",
    rating: 0,
    reviews: 0,
  },
  {
    id: 44,
    name: "Bloom Within",
    price: 34.99,
    description: "An oversized natural tee with the statement 'Bloom Within — soft growth / quiet strength'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/bloom-within.webp",
    },
    images: ["/images/products/bloom-within.webp", "/images/products/bloom-within-model.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 45,
    name: "Pure Form",
    price: 34.99,
    description: "An oversized black tee with the statement 'Pure Form — shape / soul / silence'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/pure-form.webp",
    },
    images: ["/images/products/pure-form.webp", "/images/products/pure-form-model.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 46,
    name: "She Dances",
    price: 34.99,
    description: "An oversized white tee with the statement 'She Dances — rhythm / grace / soul'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "/images/products/she-dances.webp",
    },
    images: ["/images/products/she-dances.webp", "/images/products/she-dances-model.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 47,
    name: "Soul Bloom",
    price: 34.99,
    description: "An oversized natural tee with the statement 'Soul Bloom — soft growth / inner calm'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/soul-bloom.webp",
    },
    images: ["/images/products/soul-bloom.webp", "/images/products/soul-bloom-model.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 48,
    name: "Wild Grace",
    price: 34.99,
    description: "An oversized black tee with the statement 'Wild Grace — calm / bold / free'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "/images/products/wild-grace.webp",
    },
    images: ["/images/products/wild-grace.webp", "/images/products/wild-grace-model.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 49,
    name: "She Moves",
    price: 34.99,
    description: "An oversized sage tee with the statement 'She Moves — grace in motion'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage"],
    colorImages: {
      Sage: "/images/products/she-moves.webp",
    },
    images: ["/images/products/she-moves.webp", "/images/products/she-moves-model.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
  {
    id: 50,
    name: "Wild Nectar",
    price: 34.99,
    description: "A fitted natural tee with the statement 'Wild Nectar — light / freedom / bloom'.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural"],
    colorImages: {
      Natural: "/images/products/wild-nectar.webp",
    },
    images: ["/images/products/wild-nectar.webp", "/images/products/wild-nectar-model.webp"],
    category: "women",
    rating: 0,
    reviews: 0,
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { t, language } = useLanguage()

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [productImages, setProductImages] = useState([])
  const [isZoomed, setIsZoomed] = useState(false)

  // Cerrar la vista ampliada con la tecla Escape
  useEffect(() => {
    if (!isZoomed) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isZoomed])

  useEffect(() => {
    // Obtener el ID del producto de los parámetros de la URL
    const productId = Number.parseInt(params.id)

    // Buscar el producto en la lista de productos
    const foundProduct = products.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
      // Establecer el primer color como predeterminado
      const defaultColor = foundProduct.colors[0]
      setSelectedColor(defaultColor)

      // Establecer las imágenes basadas en el color seleccionado
      if (foundProduct.colorImages && foundProduct.colorImages[defaultColor]) {
        // Si hay imágenes específicas para el color, usarlas
        setProductImages([foundProduct.colorImages[defaultColor], ...foundProduct.images.slice(1)])
      } else {
        // Si no, usar las imágenes predeterminadas
        setProductImages(foundProduct.images)
      }

      // Obtener productos relacionados de la misma categoría
      const related = products
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    } else {
      // Si no se encuentra el producto, redirigir a la página de tienda
      router.push("/shop")
    }
  }, [params.id, router])

  // Actualizar las imágenes cuando cambia el color seleccionado
  useEffect(() => {
    if (product && selectedColor) {
      if (product.colorImages && product.colorImages[selectedColor]) {
        // Si hay imágenes específicas para el color, usarlas
        setProductImages([product.colorImages[selectedColor], ...product.images.slice(1)])
        // Resetear la imagen seleccionada al cambiar de color
        setSelectedImage(0)
      }
    }
  }, [selectedColor, product])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(t("product.selectSizeAlert"))
      return
    }

    // Usar la imagen correspondiente al color seleccionado
    const imageToUse =
      product.colorImages && product.colorImages[selectedColor] ? product.colorImages[selectedColor] : product.images[0]

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageToUse,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    })
  }

  if (!product) {
    return (
      <div className="py-24 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {/* Product Images */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button
            type="button"
            className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-5 w-full cursor-zoom-in group"
            onClick={() => setIsZoomed(true)}
            aria-label="Bild vergrößern"
          >
            <img
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4 text-black" />
            </span>
          </button>
          <div className="flex gap-3">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden bg-gray-50 transition-opacity ${
                  selectedImage === index ? "ring-1 ring-black" : "opacity-50 hover:opacity-100"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:pt-2"
        >
          <h1 className="text-2xl md:text-3xl font-normal mb-2">{product.name}</h1>
          <p className="text-xl font-normal mb-4">{formatPrice(product.price, language)}</p>
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-gray-900 fill-gray-900" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-500">
              {product.rating} ({product.reviews} {t("product.reviews")})
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-10">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">{t("product.color")}</h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => {
                const bgColor = colorMap[color] || color.toLowerCase()

                return (
                  <button
                    key={color}
                    className={`w-7 h-7 rounded-full border border-gray-300 transition-shadow ${
                      selectedColor === color ? "ring-1 ring-black ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: bgColor }}
                    onClick={() => {
                      setSelectedColor(color)
                    }}
                    aria-label={color}
                  >
                    {selectedColor === color && (
                      <span
                        className={`flex items-center justify-center h-full text-xs ${
                          color === "White" || color === "Cream" || color === "Natural" ? "text-black" : "text-white"
                        }`}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {t("product.selected")}: {selectedColor}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs uppercase tracking-wider text-gray-500">{t("product.size")}</h3>
              <Link href="/size-guide" className="text-xs text-gray-500 underline underline-offset-2">
                {t("product.sizeGuide")}
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`py-2.5 border text-sm font-normal transition-colors ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-900 border-gray-300 hover:border-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-red-500 mt-2">{t("product.selectSize")}</p>}
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">{t("product.quantity")}</h3>
            <div className="flex items-center border border-gray-300 w-28">
              <button
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                aria-label={t("product.decrease")}
              >
                -
              </button>
              <span className="flex-1 text-center text-sm">{quantity}</span>
              <button
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                onClick={() => setQuantity(quantity + 1)}
                aria-label={t("product.increase")}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mb-10">
            <Button className="w-full h-12 rounded-none text-sm tracking-wide" onClick={handleAddToCart}>
              {t("product.addToCart")}
            </Button>
            <div className="flex items-center gap-6 mt-4">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                <Heart className="w-4 h-4" />
                {t("product.wishlist")}
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                <Share2 className="w-4 h-4" />
                {t("product.share")}
              </button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-600">{t("product.freeShipping")}</p>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-4 h-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-600">{t("product.easyReturns")}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Tabs */}
      <div className="mt-20 max-w-3xl">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start gap-8 bg-transparent p-0 h-auto border-b border-gray-200 rounded-none">
            <TabsTrigger
              value="description"
              className="rounded-none px-0 pb-3 text-xs uppercase tracking-wider font-normal text-gray-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-black"
            >
              {t("product.description")}
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none px-0 pb-3 text-xs uppercase tracking-wider font-normal text-gray-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-black"
            >
              {t("product.details")}
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none px-0 pb-3 text-xs uppercase tracking-wider font-normal text-gray-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-black"
            >
              {t("product.reviews_tab")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="text-sm text-gray-600 leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>
                Our t-shirts are designed with comfort and style in mind. Each piece is crafted from premium materials
                that are soft to the touch and built to last. The minimalist design ensures versatility, making it easy
                to pair with any outfit for any occasion.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <ul className="text-sm text-gray-600 leading-relaxed space-y-1.5">
              <li>100% organic cotton</li>
              <li>Medium weight fabric (180 gsm)</li>
              <li>Relaxed fit</li>
              <li>Pre-shrunk</li>
              <li>Machine wash cold, tumble dry low</li>
              <li>Made ethically in Portugal</li>
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              This product has received {product.reviews} reviews with an average rating of {product.rating} out of 5
              stars.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-lg font-normal mb-8">{t("product.youMayAlsoLike")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-3">
                    <img
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-normal group-hover:underline">{relatedProduct.name}</h3>
                  <p className="text-sm text-gray-500">{formatPrice(relatedProduct.price, language)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Zoomed image lightbox */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsZoomed(false)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setIsZoomed(false)}
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              className="relative w-full max-w-lg h-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 32%" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
