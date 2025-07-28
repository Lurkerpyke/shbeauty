// app/services/[id]/page.tsx
import { ServiceId, servicesDetails } from '@/data/services';
import { notFound } from 'next/navigation';

type Params = { params: { id: string } };

// Recommended: Generate static paths at build time
export async function generateStaticParams() {
    return Object.keys(servicesDetails).map((id) => ({ id }));
}

// Important: Page must be async even if not fetching data
export default async function ServicePage({ params }: Params) {
    // Params are automatically awaited in async component
    const id = params.id as ServiceId;

    const servico = servicesDetails[id];
    if (!servico) return notFound();

    return (
        <main className="p-10 max-w-3xl mx-auto pt-24 h-[100vh]">
            <h1 className="text-3xl font-bold mb-4">{servico.title}</h1>
            <img
                src={servico.image}
                alt={servico.title}
                className="mb-6 rounded-xl shadow-md"
            />
            <p className="text-lg font-medium text-pink-600 mb-2">{servico.price}</p>
            <p className="text-base text-gray-700">{servico.description}</p>
        </main>
    );
}