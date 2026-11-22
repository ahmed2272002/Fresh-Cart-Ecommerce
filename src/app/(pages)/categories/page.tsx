import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { GetAllCategories } from '@/services/categories.service'
import { CategoryIF } from '@/types/category.type'
import { ArrowRight, Layers, PackageOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Categories() {

  const response = await GetAllCategories()
  const categories : CategoryIF[] = response.data
  // console.log(response)

  return (
    <>
    <section className="top bg-green-500">
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
                  <BreadcrumbPage className="text-white text-md font-bold">Categories</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className=" flex items-center gap-4">
            <div className="icon p-3 bg-[#4bc779] w-fit rounded-xl shadow">
              <Layers size={30} className="text-white" />
            </div>

            <div className="title">
              <h2 className=" text-3xl text-white font-black">All Categories</h2>
              <p className="text-white opacity-75 text-sm">Browse our wide range of product categories</p>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className='mt-7'>
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {
              categories.map((category)=><React.Fragment key={category._id}>
              <Link href={`/categories/${category._id}`} className='w-[17%] bg-white p-4 rounded-2xl shadow-2xl group duration-300 hover:-translate-y-2'>
                  <Image src={category.image} width={200} height={200} alt={category.name} className='mx-auto rounded-xl aspect-square object-cover' />
                  <p className='font-semibold text-center text-md mt-2 group-hover:text-[#33ae60] duration-300'>{category.name}</p>
                  <span className=' flex items-center gap-2 text-[12px] justify-center text-[#33ae60] opacity-0 group-hover:opacity-100 duration-300'>View Subcategories <ArrowRight size={15} /></span>
                </Link>
              </React.Fragment>)
            }
          </div>
        </div>
      </section>
    </>
  )
}
