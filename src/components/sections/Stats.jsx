import { stats } from '@/lib/data';

export default function Stats() {
    return (
        <section className="bg-[#0D0B09] border-y border-[#2E2A25] overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#2E2A25]">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-[#0D0B09] p-6 sm:p-8 md:p-12 text-center flex flex-col justify-center">
                        <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#C9A96E] mb-2">{stat.num}</p>
                        <p className="font-sans text-[10px] sm:text-[11px] md:text-xs text-[#F5F0E8] uppercase tracking-[0.1em] sm:tracking-[0.15em]">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
