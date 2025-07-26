'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useLocalization } from '@/hooks/use-localization';
import { certificationsData } from '@/lib/data';
import { ExternalLink, GraduationCap, Code, FileText, Link as LinkIcon } from 'lucide-react';

const icons: { [key: string]: React.ElementType } = {
  'graduation-cap': GraduationCap,
  code: Code,
  'file-text': FileText,
  link: LinkIcon,
};

export default function Certifications() {
  const { t } = useLocalization();

  const sectionTitle = {
    pt: 'Formação e Certificações',
    en: 'Education & Certifications',
  };

  return (
    <section id="certifications" className="py-16 md:py-24">
      <h2 className="text-3xl font-bold text-white text-center mb-12">{t(sectionTitle)}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {certificationsData.map((cert) => {
          const Icon = icons[cert.icon];
          return (
            <a key={cert.id} href={cert.link} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="glass-effect rounded-xl overflow-hidden transform transition-all duration-300 hover:border-primary border border-transparent hover:-translate-y-1 h-full">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="bg-slate-700 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    {Icon && <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-white">{t(cert.title)}</h4>
                    <p className="text-sm text-slate-400">{cert.issuer} - {cert.year}</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-slate-500 group-hover:text-primary transition-colors flex-shrink-0" />
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </section>
  );
}
