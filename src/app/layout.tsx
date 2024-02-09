import './globals.css'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'Casino',
  description: 'Website made for casino televisions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position='bottom-right'
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          transition={Bounce}
        />
        {children}
      </body>
    </html>
  )
}
