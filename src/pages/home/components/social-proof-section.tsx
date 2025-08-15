import { Card, CardContent } from '@/components/ui/card'

const stats = [
  { value: "500+", label: "Stores Created" },
  { value: "$100K+", label: "Revenue Generated" },
  { value: "99.9%", label: "Uptime" }
]

const testimonials = [
  {
    name: "Maria Santos",
    role: "Fashion Boutique Owner",
    content: "Findora transformed my small boutique into a thriving online business. The setup was incredibly easy!"
  },
  {
    name: "João Silva",
    role: "Electronics Seller",
    content: "Finally, I can reach customers across Angola without the complexity of traditional e-commerce platforms."
  },
  {
    name: "Ana Costa",
    role: "Handmade Crafts",
    content: "Perfect for my handmade business. The payment integration with Multicaixa is seamless."
  }
]

export const SocialProofSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Trusted by Angolan Entrepreneurs</h2>
          <p className="text-xl text-gray-300">Join hundreds of sellers who have already discovered success with Findora</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
