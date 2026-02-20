'use client';
import { useState, useEffect } from 'react';

export function useTypewriter(words, typingSpeed = 100, deletingSpeed = 50, delay = 2000) {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);

    useEffect(() => {
        let timer;
        const current = loopNum % words.length;
        const fullText = words[current];

        if (isDeleting) {
            timer = setTimeout(() => setText(fullText.substring(0, text.length - 1)), deletingSpeed);
        } else {
            timer = setTimeout(() => setText(fullText.substring(0, text.length + 1)), typingSpeed);
        }

        if (!isDeleting && text === fullText) {
            timer = setTimeout(() => setIsDeleting(true), delay);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
        }
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, delay]);

    return text;
}
