'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: 'CareerCrafter helped me land my dream job within weeks. The platform is intuitive, fast, and full of relevant opportunities.',
    name: 'Aisha Khan',
    role: 'Software Engineer @ Google',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    text: 'The AI-powered job matching is incredible! I received personalized recommendations that perfectly aligned with my skills.',
    name: 'Marcus Rodriguez',
    role: 'Product Manager @ Microsoft',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    text: 'From resume optimization to interview prep, CareerCrafter provided everything I needed. Amazing platform!',
    name: 'Sarah Chen',
    role: 'UX Designer @ Apple',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

export default function SimpleTestimonial() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent(prev => (prev + 1) % testimonials.length);
  const prev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-gradient-to-b from-white to-purple-50 px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
          What Our Users Say
        </h2>

        <div className="relative mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
          <div className="transition-all duration-500 ease-in-out">
            <p className="mb-6 text-lg text-gray-600 italic">"{testimonials[current].text}"</p>

            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[current].avatar || '/placeholder.svg'}
                alt={testimonials[current].name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-800">{testimonials[current].name}</p>
                <p className="text-sm text-gray-500">{testimonials[current].role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={prev}
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === current ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
