import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Store, ShoppingCart } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23666%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Header */}
      <header className="relative z-20 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Findora Brand */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
                Findora
              </Link>
            </div>
            
            {/* Center - Logo */}
            <div className="flex items-center justify-center flex-1">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Right - Login Button */}
            <div className="flex items-center space-x-3">
              <Link to="/login" search={{ message: 'Welcome to Findora' }}>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
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
  )
}
