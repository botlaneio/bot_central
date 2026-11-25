import Top, { Capabilities } from "./top";
import Challenges from "./challenges";
import Business from "./business";
import Lower, { Footer } from "./lower";

// Homepage order: hero → challenges and the botLane approach → industries → capabilities, workflow demo and
// method → technology and managed automation → questions and responsible automation → assessment CTA.
export default function Page() {
  return <>
    <main>
      <Top />
      <Challenges />
      <Business />
      <Capabilities />
      <Lower />
    </main>
    <Footer />
  </>;
}
