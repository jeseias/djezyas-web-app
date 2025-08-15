import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const FinalCTASection = () => {
  return (
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
  )
}
