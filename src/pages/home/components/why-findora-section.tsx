import { CheckCircle } from 'lucide-react'

export const WhyFindoraSection = () => {
  return (
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
  )
}
