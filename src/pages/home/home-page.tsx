import {
  HeroSection,
  WhyFindoraSection,
  FeaturesSection,
  HowItWorksSection,
  SocialProofSection,
  FinalCTASection,
  Footer
} from './components'

export const HomePage = () => {
  return (
    <div className="min-h-screen overflow-y-scroll bg-gradient-to-br from-gray-950 via-black to-gray-950">
      <HeroSection />
      <WhyFindoraSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}