// app/services/[id]/page.tsx
import { ServiceId, servicesDetails } from '@/data/services';
import { notFound } from 'next/navigation';
import ServiceDetails from './ServicesDetails';
import Spot from '@/components/Spot';

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
    return Object.keys(servicesDetails).map((id) => ({ id }));
}

export default async function ServicePage(props: Params) {
    const params = await props.params;
    const id = params.id as ServiceId;

    const servico = servicesDetails[id];
    if (!servico) return notFound();

    return (
        <main className='overflow-hidden'>
            <ServiceDetails service={servico} />
            
            <Spot service={servico}/>
        </main>
    );
}