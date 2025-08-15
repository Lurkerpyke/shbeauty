// app/services/[id]/page.tsx
import { ServiceId, servicesDetails } from '@/data/services';
import { notFound } from 'next/navigation';
import ServiceDetails from './ServicesDetails';
import Spot from '@/components/Spot';
import BreadCrumbUp from '@/components/BreadCrumbUp';

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

    return (
        <main className='overflow-hidden h-full flex flex-col'>
            <ServiceDetails service={servico} />
            <Spot service={servico} />

            <BreadCrumbUp 
                servico={servico}
                nextService={nextService}
            />
        </main>
    );
};