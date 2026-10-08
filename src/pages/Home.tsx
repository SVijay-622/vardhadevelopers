import { Marquee } from '../components/Marquee'
import { Seo } from '../components/Seo'
import { ApproachProcess } from '../components/sections/ApproachProcess'
import { ExperienceSection } from '../components/sections/ExperienceSection'
import { FinalCta } from '../components/sections/FinalCta'
import { FounderSection } from '../components/sections/FounderSection'
import { HomeHero } from '../components/sections/HomeHero'
import { InsightsSection } from '../components/sections/InsightsSection'
import { OpportunityBand } from '../components/sections/OpportunityBand'
import { PartnershipsSection } from '../components/sections/PartnershipsSection'
import { SelectedProjects } from '../components/sections/SelectedProjects'
import { WhatWeDo } from '../components/sections/WhatWeDo'
import { WhoWeAre } from '../components/sections/WhoWeAre'
import { WhyVardha } from '../components/sections/WhyVardha'
import { images } from '../data/images'
import { services } from '../data/services'

export default function Home() {
  return (
    <>
      <Seo image={images.heroCrane.src} />
      <HomeHero />
      <ExperienceSection id="experience" />
      <Marquee items={services.map((s) => s.title)} />
      <WhoWeAre />
      <WhatWeDo />
      <SelectedProjects />
      <ApproachProcess index="05" />
      <OpportunityBand />
      <PartnershipsSection index="06" />
      <WhyVardha index="07" />
      <FounderSection index="08" />
      <InsightsSection index="09" />
      <FinalCta />
    </>
  )
}
