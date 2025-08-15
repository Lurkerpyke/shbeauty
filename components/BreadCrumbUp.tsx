'use client';

import React, { useEffect, useState } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type breadcrumbProps = {
    servico: {
        title: string;
    };
    nextService?: {
        title: string;
        id: string;
    };
}

const BreadCrumbUp = ({ servico, nextService }: breadcrumbProps) => {

    const [isDesktop, setIsDesktop] = useState(false);
    
    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
    
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
    
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    if (!isDesktop) return null;

  return (
      <div className="container mx-auto px-4 py-6 z-2">
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                          <Link href="/">Home</Link>
                      </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                      <BreadcrumbPage>{servico.title}</BreadcrumbPage>
                  </BreadcrumbItem>

                  {nextService && (
                      <>
                          <BreadcrumbSeparator>
                              <ChevronRight className="h-4 w-4" />
                          </BreadcrumbSeparator>
                          <BreadcrumbItem>
                              <BreadcrumbLink asChild>
                                  <Link
                                      href={`/services/${nextService.id}`}
                                      className="font-medium text-primary hover:underline"
                                  >
                                      {nextService.title}
                                  </Link>
                              </BreadcrumbLink>
                          </BreadcrumbItem>
                      </>
                  )}
              </BreadcrumbList>
          </Breadcrumb>
      </div>
  )
}

export default BreadCrumbUp