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
    <section id="certifications" className="py-8">
      <h2 className="text-3xl font-bold text-foreground text-left mb-8">{t(sectionTitle)}</h2>
      <div className="grid grid-cols-1 gap-4">
        {certificationsData.map((cert) => {
          const Icon = icons[cert.icon];
          return (
            <a key={cert.id} href={cert.link} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="glass-effect rounded-xl overflow-hidden transform transition-all duration-300 hover:border-primary border border-transparent hover:-translate-y-1 h-full">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-secondary p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    {Icon && <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-foreground text-base">{t(cert.title)}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer} - {cert.year}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </section>
  );
}
