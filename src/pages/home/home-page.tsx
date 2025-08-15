import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Shield, ShoppingCart, Globe, Users, Zap, CheckCircle, Store, Smartphone, BarChart3, Palette, CreditCard } from 'lucide-react'

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23666%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
              <Store className="w-4 h-4 mr-2" />
              E-commerce Platform for Angola
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Create Your Online Store.
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent"> Sell Anywhere in Angola.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Findora gives you the tools to sell your products online, get paid, and grow your business — no coding required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                Start Your Free Store
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
                See How It Works
              </Button>
            </div>
            
            {/* Hero Visual - Store Dashboard Mockup */}
            <div className="relative max-w-5xl mx-auto">
              <div className="relative z-10 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Laptop Mockup */}
                  <div className="flex-1">
                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-gray-400 text-sm">findora.com/store</div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="h-20 bg-gray-700 rounded"></div>
                          <div className="h-20 bg-gray-700 rounded"></div>
                          <div className="h-20 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Mobile Mockup */}
                  <div className="flex-1">
                    <div className="bg-gray-800 rounded-3xl p-4 border border-gray-700 max-w-xs mx-auto">
                      <div className="bg-gray-900 rounded-2xl p-4">
                        <div className="text-center text-white">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Findora Store</h3>
                          <p className="text-sm text-gray-300">Mobile Dashboard</p>
                          <div className="mt-4 space-y-2">
                            <div className="h-2 bg-gray-700 rounded"></div>
                            <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Findora? Problem + Solution */}
      <section className="py-20 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose Findora?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Easy Tools</h3>
                    <p className="text-gray-300">Selling online in Angola is hard — no tools, no easy payment integration, and scattered customer communication.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Complex Setup</h3>
                    <p className="text-gray-300">Traditional e-commerce requires technical knowledge, expensive development, and complex integrations.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-600/20 to-blue-600/20 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Findora Solution</h3>
                  <p className="text-gray-300 mb-6">
                    Findora centralizes your store, payments, and orders in one platform designed specifically for Angolan businesses.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-emerald-400">✓ All-in-One Platform</div>
                    <div className="text-emerald-400">✓ Local Payments</div>
                    <div className="text-emerald-400">✓ No Coding Required</div>
                    <div className="text-emerald-400">✓ Instant Setup</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Sell Online</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete e-commerce solution designed for Angolan entrepreneurs to start, manage, and grow their online business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
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

      {/* How It Works */}
      <section className="py-20 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get Started in 3 Simple Steps</h2>
            <p className="text-xl text-gray-300">Your journey to online success starts here</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((step, index) => (
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

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Angolan Entrepreneurs</h2>
            <p className="text-xl text-gray-300">Join hundreds of sellers who have already discovered success with Findora</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Stores Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$100K+</div>
              <div className="text-gray-300">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
            ].map((testimonial, index) => (
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

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600/20 to-blue-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Hundreds of Angolan Entrepreneurs Already Selling with Findora
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your online business today and reach customers across Angola and beyond.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-4 text-xl">
            Start Selling Today
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Findora</h3>
              <p className="text-gray-400 mb-4">
                Empowering Angolan entrepreneurs with the tools to build successful online businesses and reach customers worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="mailto:support@findora.com" className="hover:text-white transition-colors">support@findora.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Findora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}