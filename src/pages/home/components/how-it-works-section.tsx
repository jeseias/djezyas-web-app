import { ArrowRight } from 'lucide-react'

const steps = [
  {
    step: "01",
    title: "Sign Up",
    description: "Create your Findora account in seconds with just your email and basic information."
  },
  {
    step: "02",
    title: "Add Your Products",
    description: "Upload photos, set prices, and write descriptions for all your products."
  },
  {
    step: "03",
    title: "Start Selling",
    description: "Share your store link and start receiving orders from customers immediately."
  }
]

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get Started in 3 Simple Steps</h2>
          <p className="text-xl text-gray-300">Your journey to online success starts here</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-emerald-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
