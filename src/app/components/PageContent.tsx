import { sections } from "@/app/constants";
import AboutSection from '@/app/components/AboutSection';
import ClassesSection from '@/app/components/ClassesSection';
import ContactSection from '@/app/components/ContactSection';

export default function PageContent () {

  return (
    <div className="flex flex-col items-center">
      {sections.map((item, index) => {

        // if(item.id === "home") return;
        
        let content = null;

        switch (item.id) {
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
          <section key={index} id={item.id} className="w-full mt-6 lg:mt-20" data-bg={item.dataBg}>
            {content}
          </section>
        );
    })}
    </div>
  )
}
