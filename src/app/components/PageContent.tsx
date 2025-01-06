import { sections } from "@/app/constants";
import AboutSection from '@/app/components/AboutSection';
import ClassesSection from '@/app/components/ClassesSection';
import ContactSection from '@/app/components/ContactSection';

export default function PageContent () {

  return (
    <div className="flex flex-col items-center">
      {sections.map((item, index) => {

        if(item.id === "home") return;
        
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
          <section key={index} id={item.id} className="w-full h-auuto lg:h-screen lg:py-40 py-20" data-bg={item.dataBg}>
            <div className="max-w-7xl mx-auto ppt-20 px-6 rounded-3xl">
              <div className="flex flex-col items-center">
                <h2 className="sectionTitle text-2xl font-semibold text-center text-gray-700 mb-6">{item.label}</h2>
                {content}
              </div>
            </div>
          </section>
        );
    })}
    </div>
  )
}
