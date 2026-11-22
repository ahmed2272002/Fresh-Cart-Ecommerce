import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import {  Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { GetAllBrands } from '@/services/brand.service'
import { BrandIF } from '@/types/brand.type'
import React from 'react'

export default async function Brands() {

  const response = await GetAllBrands()
  const brands : BrandIF[] = response.data
  console.log(brands)

// to get user data from server component
  // const session = await getServerSession(authOptions)
  // console.log(session)


  // to get token from server cookies
  // const decodedToken = await getToken()
  // console.log(decodedToken)

  return (
    <>
    <section className="top bg-linear-to-br from-[#7F22FE] to-[#bc75fe] py-5">
        <div className="container mx-auto">
          <div className="body py-5">
            <div className="bread-crumb mb-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-white text-md font-bold opacity-80 hover:text-white hover:opacity-100">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white text-md font-bold">Brands</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className=" flex items-center gap-4">
            <div className="icon p-3 bg-[#9e65fd]  w-fit rounded-xl shadow">
              <Tag  size={27} className="text-white" />
            </div>

            <div className="title">
              <h2 className=" text-3xl text-white font-black mb-1">Top Brands</h2>
              <p className="text-white opacity-75 text-sm">Shop from your favorite brands</p>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className='mt-7'>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4">
            {brands.map((brand)=><React.Fragment key={brand._id}>
              <div className="col-span-2">
                <Link href={`/brands/${brand._id}`}>
                  <div className='bg-white shadow-2xl rounded-xl p-4'>
                    <div className='bg-gray-100 py-10 px-4'>
                      <Image src={brand.image} width={200} height={200} alt='name'/>
                    </div>
                    <p className=' text-[15px] text-center mt-3'>{brand.name}</p>
                  </div>
                </Link>
              </div>
            </React.Fragment>)}
            
          </div>
        </div>
      </section>
    </>
  )
}
