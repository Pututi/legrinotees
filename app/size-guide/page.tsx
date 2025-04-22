"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, Shirt, Info } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function SizeGuidePage() {
  const { t } = useLanguage()

  return (
    <div className="py-24 px-4 sm:px-6 lg:px:8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("sizeGuide.title")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("sizeGuide.subtitle")}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <Info className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-1">{t("sizeGuide.howToMeasure")}</h3>
              <p className="text-gray-600 text-sm">{t("sizeGuide.measurementInstructions")}</p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc pl-4">
                <li>{t("sizeGuide.chest")}</li>
                <li>{t("sizeGuide.waist")}</li>
                <li>{t("sizeGuide.hips")}</li>
                <li>{t("sizeGuide.length")}</li>
              </ul>
            </div>
          </div>

          <Tabs defaultValue="men">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="men" className="flex items-center gap-2">
                <Shirt className="w-4 h-4" />
                {t("sizeGuide.menSizes")}
              </TabsTrigger>
              <TabsTrigger value="women" className="flex items-center gap-2">
                <Shirt className="w-4 h-4" />
                {t("sizeGuide.womenSizes")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="men">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Size</TableHead>
                      <TableHead>Chest (in)</TableHead>
                      <TableHead>Chest (cm)</TableHead>
                      <TableHead>Waist (in)</TableHead>
                      <TableHead>Waist (cm)</TableHead>
                      <TableHead>Length (in)</TableHead>
                      <TableHead>Length (cm)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">XS</TableCell>
                      <TableCell>34-36</TableCell>
                      <TableCell>86-91</TableCell>
                      <TableCell>28-30</TableCell>
                      <TableCell>71-76</TableCell>
                      <TableCell>27</TableCell>
                      <TableCell>68.5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">S</TableCell>
                      <TableCell>36-38</TableCell>
                      <TableCell>91-97</TableCell>
                      <TableCell>30-32</TableCell>
                      <TableCell>76-81</TableCell>
                      <TableCell>28</TableCell>
                      <TableCell>71</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">M</TableCell>
                      <TableCell>38-40</TableCell>
                      <TableCell>97-102</TableCell>
                      <TableCell>32-34</TableCell>
                      <TableCell>81-86</TableCell>
                      <TableCell>29</TableCell>
                      <TableCell>73.5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">L</TableCell>
                      <TableCell>40-42</TableCell>
                      <TableCell>102-107</TableCell>
                      <TableCell>34-36</TableCell>
                      <TableCell>86-91</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>76</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XL</TableCell>
                      <TableCell>42-44</TableCell>
                      <TableCell>107-112</TableCell>
                      <TableCell>36-38</TableCell>
                      <TableCell>91-97</TableCell>
                      <TableCell>31</TableCell>
                      <TableCell>78.5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XXL</TableCell>
                      <TableCell>44-46</TableCell>
                      <TableCell>112-117</TableCell>
                      <TableCell>38-40</TableCell>
                      <TableCell>97-102</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>81</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="women">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Size</TableHead>
                      <TableHead>Bust (in)</TableHead>
                      <TableHead>Bust (cm)</TableHead>
                      <TableHead>Waist (in)</TableHead>
                      <TableHead>Waist (cm)</TableHead>
                      <TableHead>Hips (in)</TableHead>
                      <TableHead>Hips (cm)</TableHead>
                      <TableHead>Length (in)</TableHead>
                      <TableHead>Length (cm)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">XS</TableCell>
                      <TableCell>31-33</TableCell>
                      <TableCell>79-84</TableCell>
                      <TableCell>24-26</TableCell>
                      <TableCell>61-66</TableCell>
                      <TableCell>34-36</TableCell>
                      <TableCell>86-91</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>63.5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">S</TableCell>
                      <TableCell>33-35</TableCell>
                      <TableCell>84-89</TableCell>
                      <TableCell>26-28</TableCell>
                      <TableCell>66-71</TableCell>
                      <TableCell>36-38</TableCell>
                      <TableCell>91-97</TableCell>
                      <TableCell>25.5</TableCell>
                      <TableCell>65</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">M</TableCell>
                      <TableCell>35-37</TableCell>
                      <TableCell>89-94</TableCell>
                      <TableCell>28-30</TableCell>
                      <TableCell>71-76</TableCell>
                      <TableCell>38-40</TableCell>
                      <TableCell>97-102</TableCell>
                      <TableCell>26</TableCell>
                      <TableCell>66</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">L</TableCell>
                      <TableCell>37-39</TableCell>
                      <TableCell>94-99</TableCell>
                      <TableCell>30-32</TableCell>
                      <TableCell>76-81</TableCell>
                      <TableCell>40-42</TableCell>
                      <TableCell>102-107</TableCell>
                      <TableCell>26.5</TableCell>
                      <TableCell>67.5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XL</TableCell>
                      <TableCell>39-41</TableCell>
                      <TableCell>99-104</TableCell>
                      <TableCell>32-34</TableCell>
                      <TableCell>81-86</TableCell>
                      <TableCell>42-44</TableCell>
                      <TableCell>107-112</TableCell>
                      <TableCell>27</TableCell>
                      <TableCell>68.5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XXL</TableCell>
                      <TableCell>41-43</TableCell>
                      <TableCell>104-109</TableCell>
                      <TableCell>34-36</TableCell>
                      <TableCell>86-91</TableCell>
                      <TableCell>44-46</TableCell>
                      <TableCell>112-117</TableCell>
                      <TableCell>27.5</TableCell>
                      <TableCell>70</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <h2 className="text-xl font-bold mb-4">{t("sizeGuide.findingYourPerfectFit")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Ruler className="w-5 h-5 mr-2" />
                {t("sizeGuide.betweenSizes")}
              </h3>
              <p className="text-gray-600 text-sm">{t("sizeGuide.betweenSizesText")}</p>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Shirt className="w-5 h-5 mr-2" />
                {t("sizeGuide.fabricShrinkage")}
              </h3>
              <p className="text-gray-600 text-sm">{t("sizeGuide.fabricShrinkageText")}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">{t("sizeGuide.questions")}</p>
          <Link href="/contact">
            <Button>{t("sizeGuide.contactUs")}</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
