import { Card, CardContent } from '@/components/ui/card'
import { Zap, Palette, CreditCard, Smartphone, BarChart3, Users } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: "Easy Store Setup",
    description: "Launch your online store in under 10 minutes with our intuitive setup wizard."
  },
  {
    icon: Palette,
    title: "Customizable Designs",
    description: "Make your store reflect your brand with beautiful, customizable templates."
  },
  {
    icon: CreditCard,
    title: "Multi-Payment Support",
    description: "Accept Multicaixa, bank transfers, cash on delivery, and international payments."
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Your store looks perfect on any device - desktop, tablet, or mobile."
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track sales, understand your customers, and know what sells and when."
  },
  {
    icon: Users,
    title: "No Coding Needed",
    description: "Built for business owners, not developers. Focus on selling, not technical details."
  }
]

export const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Sell Online</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Complete e-commerce solution designed for Angolan entrepreneurs to start, manage, and grow their online business.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
