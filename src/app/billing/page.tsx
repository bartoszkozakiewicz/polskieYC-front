import React from 'react'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { CheckIcon, ShoppingCartIcon } from 'lucide-react';


export const metadata: Metadata = {
  title: "Next.js Settings Page | NextAdmin - Next.js Dashboard c",
  description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const page = () => {
  return (
    <DefaultLayout>
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Your billing information" link="Billing"/>
      <div className="rounded-[10px] border p-8 border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <h2 className="text-2xl text-black font-bold">Your Plan</h2>
              <p className="text-muted-foreground ">
                Manage your subscription and payment details.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Starter</h3>
                    <div className="rounded-full bg-primary px-3 py-1 text-xs text-white font-medium text-primary-foreground">
                      Current
                    </div>
                  </div>
                  <p className="mt-2 text-4xl font-bold">$9</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    per month
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>1 user</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>1 GB storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>Basic support</span>
                    </div>
                  </div>
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke mt-4 px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                  >
                    Select
                  </button>
                </div>
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <h3 className="text-lg font-medium">Pro</h3>
                  <p className="mt-2 text-4xl font-bold">$29</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    per month
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>5 users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>10 GB storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>Priority support</span>
                    </div>
                  </div>
                  <button
                    className="flex justify-center rounded-[7px] border mt-4 border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                  >
                    Select
                  </button>
                </div>
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <h3 className="text-lg font-medium">Enterprise</h3>
                  <p className="mt-2 text-4xl font-bold">$99</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    per month
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>Unlimited users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>Unlimited storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>Enterprise support</span>
                    </div>
                  </div>
                  <button
                    className="flex justify-center rounded-[7px] border mt-4 border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
    </div>
    </DefaultLayout>

  )
}

export default page