import type { Metadata } from 'next'
import './globals.css'
import Modal from '@/components/Modal/Modal';



export const metadata: Metadata = {
  title: 'Trello Clone 1.0',
  description: 'Created by Hasnat Ahmed Goheer',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en">
      <body className='bg-[#f5f6f8]'>{children}</body>
      <Modal/>
    </html>
  )
}
