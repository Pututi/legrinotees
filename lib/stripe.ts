import Stripe from "stripe"

// Cliente de Stripe del lado del servidor. Usa la clave secreta, que solo
// existe en el entorno del servidor (nunca se envía al navegador).
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error(
      "Falta STRIPE_SECRET_KEY. Agregala en .env.local (desarrollo) o en las variables de entorno del proyecto en Vercel (producción).",
    )
  }
  // Sin apiVersion explícita: usa la versión con la que viene fijado el
  // SDK instalado (evita hardcodear una fecha de versión que se desactualice).
  return new Stripe(key)
}
