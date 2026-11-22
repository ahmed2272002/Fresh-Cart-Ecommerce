"use client"

import { Separator } from '@/components/ui/separator'
import { ChevronRight, MapPin, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'


export default function ProfileLayout({ children }: { children: ReactNode }) {

  const path = usePathname()

  return (
    <>
    <section className="top bg-green-500">
        <div className="container mx-auto">
          <div className="body py-10">
            <div className="bread-crumb mb-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-white text-md font-bold opacity-80 hover:text-white hover:opacity-100">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white text-md font-bold">My Account</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className=" flex items-center gap-4">
            <div className="icon p-3 bg-[#4bc779] w-fit rounded-xl shadow">
              <User size={30} className="text-white" />
            </div>

            <div className="title">
              <h2 className=" text-3xl text-white font-black">My Account</h2>
              <p className="text-white opacity-75 text-sm">Manage your addresses and account settings</p>
            </div>
          </div>
          </div>
        </div>
      </section>
    
    <section className='my-10'>
        <div className="container mx-auto">
          <div className=" grid grid-cols-12 gap-5">
            <div className=' col-span-4'>
              <div className='w-full bg-white rounded-xl p-3 shadow-2xl'>
                <h2 className='font-bold mb-3'>My Account</h2>
                <Separator />
                <ul className='mt-3 space-y-3'>
                  <li><Link href={"/profile/myAddress"} className={path === '/profile/myAddress' ? 'active' : 'flex items-center gap-2 p-3 hover:bg-gray-100 duration-300 rounded-xl'} ><span className='inline-block bg-gray-200 p-2 rounded-md'><MapPin className='text-gray-500' /></span> <div className='flex items-center justify-between w-full'><h3 className='text-gray-500'>My Address</h3> <ChevronRight className='text-gray-400' /></div></Link></li>
                  <li><Link href={"/profile/myAccount"} className={path === '/profile/myAccount' ? 'active' : 'flex items-center gap-2 p-3 hover:bg-gray-100 duration-300 rounded-xl'} ><span className='inline-block bg-gray-200 p-2 rounded-md'><Settings className='text-gray-500' /></span> <div className='flex items-center justify-between w-full'><h3 className='text-gray-500'>My Account</h3> <ChevronRight className='text-gray-400' /></div></Link></li>
                </ul>
              </div>
            </div>

            <div className='col-span-8'>
              {children}
            </div>
          </div>
        </div>
      </section>
    
    </>
  )
}
