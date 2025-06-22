
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex K.",
    text: "Improved from 35 to 65 WPM in just 2 weeks! The interactive lessons made all the difference.",
    role: "Software Developer",
    rating: 5
  },
  {
    name: "Sarah M.",
    text: "Finally learned proper finger placement. My accuracy went from 80% to 98%!",
    role: "Student",
    rating: 5
  },
  {
    name: "Mike D.",
    text: "The gamification keeps me motivated. Love earning XP and tracking my progress daily.",
    role: "Content Writer",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">What Our Users Say</h2>
        <p className="text-gray-400">Join thousands who have improved their typing skills</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-gray-950/80 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Quote className="w-5 h-5 text-blue-400 mr-2" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
              
              <div className="border-t border-gray-700 pt-4">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
