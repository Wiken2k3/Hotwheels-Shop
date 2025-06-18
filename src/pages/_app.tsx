// pages/_app.tsx
import '@/styles/globals.css'        // Giữ dòng này nếu bạn có file CSS chính
import type { AppProps } from 'next/app'
import { Fredoka } from '@next/font/google' // 👈 Font Google mới

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '600', '700'],     // 👈 Tuỳ chọn độ dày chữ
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={fredoka.className}>
      <Component {...pageProps} />
    </main>
  )
}
