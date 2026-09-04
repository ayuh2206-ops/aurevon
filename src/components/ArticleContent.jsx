import { parseArticleContent, renderInlineMarkdown } from '@/lib/realEstate';

function InlineText({ text }) {
    return renderInlineMarkdown(text).map((part) => (
        part.type === 'strong'
            ? <strong key={part.key} className="font-semibold text-[#1A1714]">{part.text}</strong>
            : <span key={part.key}>{part.text}</span>
    ));
}

export default function ArticleContent({ content }) {
    return (
        <div>
            {parseArticleContent(content).map((block) => {
                if (block.type === 'h1') {
                    return <h1 key={block.key} className="mt-10 mb-4 font-serif text-3xl text-[#1A1714]"><InlineText text={block.text} /></h1>;
                }
                if (block.type === 'h2' || block.type === 'heading') {
                    return <h2 key={block.key} className="mt-10 mb-4 font-serif text-2xl md:text-3xl text-[#1A1714]"><InlineText text={block.text} /></h2>;
                }
                if (block.type === 'h3') {
                    return <h3 key={block.key} className="mt-8 mb-3 font-serif text-xl text-[#1A1714]"><InlineText text={block.text} /></h3>;
                }
                if (block.type === 'ul') {
                    return (
                        <ul key={block.key} className="mb-6 list-disc space-y-2 pl-6 font-sans text-sm leading-relaxed text-[#3D3830]">
                            {block.items.map((item) => <li key={item}><InlineText text={item} /></li>)}
                        </ul>
                    );
                }
                if (block.type === 'ol') {
                    return (
                        <ol key={block.key} className="mb-6 list-decimal space-y-2 pl-6 font-sans text-sm leading-relaxed text-[#3D3830]">
                            {block.items.map((item) => <li key={item}><InlineText text={item} /></li>)}
                        </ol>
                    );
                }
                return (
                    <p key={block.key} className="mb-5 font-sans text-[15px] leading-[1.85] text-[#3D3830]">
                        <InlineText text={block.text} />
                    </p>
                );
            })}
        </div>
    );
}
