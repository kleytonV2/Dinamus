import { navItems } from "@/app/constants";
import AboutSection from '@/app/components/AboutSection';
import ClassesSection from '@/app/components/ClassesSection';
import ContactSection from '@/app/components/ContactSection';

export default function PageContent () {

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      {navItems.map((item, index) => {
        let content = null;
        let sectionId = item.href.replace("#","");

        switch (sectionId) {
            case 'treinos':
                content = <ClassesSection/>;
                break;
            case 'sobre':
                content = <AboutSection/>;
                break;
            case 'contato':
                content = <ContactSection/>;
                break;
            default:
                content = "";
        }
       
        return (
          <section key={index} id={sectionId}>
            {content}
          </section>
        );
    })}
    </div>
  )
}
