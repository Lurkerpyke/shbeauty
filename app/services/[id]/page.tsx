// app/services/[id]/page.tsx
import { ServiceId, servicesDetails } from '@/data/services';
import { notFound } from 'next/navigation';
import ServiceDetails from './ServicesDetails';
import Spot from '@/components/Spot';
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

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
    return Object.keys(servicesDetails).map((id) => ({ id }));
}

export default async function ServicePage(props: Params) {
    const params = await props.params;
    const id = params.id as ServiceId;

    const servico = servicesDetails[id];
    if (!servico) return notFound();

    // CORREÇÃO: Mapear incluindo os IDs originais
    const serviceEntries = Object.entries(servicesDetails);
    const allServices = serviceEntries
        .map(([serviceId, serviceData]) => ({
            id: serviceId,
            ...serviceData
        }))
        .sort((a, b) => parseInt(a.id) - parseInt(b.id));

    const currentIndex = allServices.findIndex(s => s.id === id);
    const nextService = allServices[currentIndex + 1];
    const previousService = allServices[currentIndex - 1];

    return (
        <main className='overflow-hidden'>
            <ServiceDetails service={servico} />
            <Spot service={servico} />

            <div className="container mx-auto px-4 py-6">
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
        </main>
    );
};