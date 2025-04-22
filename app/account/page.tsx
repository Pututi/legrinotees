"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/context/user-context"
import { useCart } from "@/context/cart-context"
import { Package, User, Heart, LogOut, ShoppingBag, Clock } from "lucide-react"

// Añadir estos imports al inicio del archivo
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useState, useEffect } from "react"

// Asegúrate de que estamos usando el hook useLanguage
import { useLanguage } from "@/context/language-context"

// Define the address type
interface Address {
  id: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Define the order item type
interface OrderItem {
  name: string
  quantity: number
  price: number
}

// Define the order type
interface Order {
  id: string
  date: string
  status: string
  total: number
  items: OrderItem[]
}

export default function AccountPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated, isLoading } = useUser()
  const { items: cartItems } = useCart()

  // Dentro de la función AccountPage, añade esta línea después de los otros hooks
  const { t } = useLanguage()

  // Reemplazar el estado activeTab con estos estados
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [addresses, setAddresses] = useState<Address[]>([])
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    // Obtener órdenes del usuario desde localStorage
    if (user && user.id) {
      const userOrders = localStorage.getItem(`orders_${user.id}`)
      if (userOrders) {
        try {
          setOrders(JSON.parse(userOrders))
        } catch (e) {
          console.error("Error parsing user orders:", e)
          setOrders([])
        }
      }
    }
  }, [user])

  // Añadir este useEffect después del useEffect existente para obtener órdenes
  useEffect(() => {
    // Cargar direcciones del usuario
    if (user && user.id) {
      const userAddresses = localStorage.getItem(`addresses_${user.id}`)
      if (userAddresses) {
        try {
          setAddresses(JSON.parse(userAddresses))
        } catch (e) {
          console.error("Error parsing user addresses:", e)
          setAddresses([])
        }
      }

      // Inicializar el formulario de perfil con los datos actuales
      setProfileForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
    }
  }, [user])

  // Añadir este código después de los useEffect existentes para manejar la pestaña activa desde la URL
  useEffect(() => {
    // Obtener la pestaña de la URL si existe
    const searchParams = new URLSearchParams(window.location.search)
    const tabParam = searchParams.get("tab")

    // Si hay un parámetro de pestaña válido, establecerlo como activo
    if (tabParam && ["overview", "orders", "wishlist", "details"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [])

  // Añadir estas funciones antes del return
  const handleEditProfile = () => {
    setIsEditProfileOpen(true)
  }

  // Modificar la función handleSaveProfile para incluir comprobación de user

  const handleSaveProfile = () => {
    if (!user || !user.id) return

    // Actualizar el usuario en localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => {
      if (u.id === user.id) {
        return { ...u, firstName: profileForm.firstName, lastName: profileForm.lastName, email: profileForm.email }
      }
      return u
    })

    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Actualizar el usuario actual
    const updatedUser = {
      ...user,
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      email: profileForm.email,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Cerrar el diálogo
    setIsEditProfileOpen(false)

    // Recargar la página para reflejar los cambios
    window.location.reload()
  }

  // Modificar la función handleSaveAddress para incluir comprobación de user

  const handleSaveAddress = () => {
    if (!user || !user.id) return

    // Crear nueva dirección con ID único
    const newAddress: Address = {
      id: `addr_${Date.now()}`,
      ...addressForm,
    }

    // Añadir a la lista de direcciones
    const updatedAddresses = [...addresses, newAddress]
    setAddresses(updatedAddresses)

    // Guardar en localStorage
    localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses))

    // Limpiar formulario y cerrar diálogo
    setAddressForm({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    })
    setIsAddAddressOpen(false)
  }

  const handleAddAddress = () => {
    setIsAddAddressOpen(true)
  }

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="py-24 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t("account.title")}</h1>
            {user && (
              <p className="text-gray-600 mt-1">
                {t("account.welcomeBack")}, {user.firstName} {user.lastName}
              </p>
            )}
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            {t("account.signOut")}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <TabsTrigger value="overview" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {t("account.overview")}
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              {t("account.orders")}
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              {t("account.wishlist")}
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {t("account.details")}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {t("account.cart")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{cartItems.length}</p>
                  <p className="text-sm text-gray-500">{t("account.itemsInCart")}</p>
                  <Link href="/cart">
                    <Button variant="link" className="px-0 mt-2">
                      {t("account.viewCart")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    {t("account.orders")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{orders.length}</p>
                  <p className="text-sm text-gray-500">{t("account.totalOrders")}</p>
                  <Button variant="link" className="px-0 mt-2" onClick={() => setActiveTab("orders")}>
                    {t("account.viewOrders")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    {t("account.recentActivity")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    {t("account.lastLogin")}: {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t("account.memberSince")}: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("account.recentOrders")}</CardTitle>
                <CardDescription>{t("account.recentPurchases")}</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.slice(0, 2).map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <p
                              className={`text-sm ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"}`}
                            >
                              {order.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("orders")}>
                      {t("account.viewAllOrders")}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">{t("account.noOrders")}</p>
                    <Link href="/shop">
                      <Button variant="link">{t("account.startShopping")}</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{t("account.orderHistory")}</CardTitle>
                <CardDescription>{t("account.viewAllPastOrders")}</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{order.id}</h3>
                            <p className="text-sm text-gray-500">
                              {t("account.placedOn")} {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0 md:text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <p
                              className={`text-sm ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"}`}
                            >
                              {order.status}
                            </p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-2">{t("account.items")}</h4>
                          <ul className="space-y-2">
                            {order.items.map((item, index) => (
                              <li key={index} className="flex justify-between">
                                <span>
                                  {item.name} x{item.quantity}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            {t("account.viewDetails")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t("account.noOrdersYet")}</h3>
                    <p className="text-gray-500 mb-6">{t("account.noOrders")}</p>
                    <Link href="/shop">
                      <Button>{t("account.startShopping")}</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>{t("account.myWishlist")}</CardTitle>
                <CardDescription>{t("account.savedForLater")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">{t("account.wishlistEmpty")}</h3>
                  <p className="text-gray-500 mb-6">{t("account.saveItems")}</p>
                  <Link href="/shop">
                    <Button>{t("account.exploreProducts")}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>{t("account.accountInfo")}</CardTitle>
                <CardDescription>{t("account.personalDetails")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t("account.firstName")}</p>
                      <p>{user.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t("account.lastName")}</p>
                      <p>{user.lastName}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("account.email")}</p>
                    <p>{user.email}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("account.memberSince")}</p>
                    <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="pt-4">
                    <Button onClick={handleEditProfile}>{t("account.editProfile")}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t("account.addresses")}</CardTitle>
                <CardDescription>{t("account.manageAddresses")}</CardDescription>
              </CardHeader>
              <CardContent>
                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <p className="font-medium">{address.street}</p>
                        <p className="text-sm text-gray-500">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-sm text-gray-500">{address.country}</p>
                      </div>
                    ))}
                    <Button onClick={handleAddAddress} className="mt-4">
                      {t("account.addAddress")}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">{t("account.noAddresses")}</p>
                    <Button onClick={handleAddAddress}>{t("account.addAddress")}</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("account.editProfileTitle")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  {t("account.firstName")}
                </label>
                <Input
                  id="firstName"
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  {t("account.lastName")}
                </label>
                <Input
                  id="lastName"
                  value={profileForm.lastName}
                  onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t("account.email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
                {t("account.cancel")}
              </Button>
              <Button onClick={handleSaveProfile}>{t("account.saveChanges")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Address Dialog */}
        <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("account.addNewAddress")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="street" className="text-sm font-medium">
                  {t("account.streetAddress")}
                </label>
                <Input
                  id="street"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">
                  {t("account.city")}
                </label>
                <Input
                  id="city"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-medium">
                    {t("account.stateProvince")}
                  </label>
                  <Input
                    id="state"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="zipCode" className="text-sm font-medium">
                    {t("account.zipCode")}
                  </label>
                  <Input
                    id="zipCode"
                    value={addressForm.zipCode}
                    onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">
                  {t("account.country")}
                </label>
                <Input
                  id="country"
                  value={addressForm.country}
                  onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAddressOpen(false)}>
                {t("account.cancel")}
              </Button>
              <Button onClick={handleSaveAddress}>{t("account.saveAddress")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}
