import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, ExternalLink } from "lucide-react";

const resources = [
  { name: "PubMed Central", url: "https://www.ncbi.nlm.nih.gov/pmc/", description: "Free full-text archive of biomedical and life sciences journal literature." },
  { name: "UpToDate", url: "https://www.uptodate.com/", description: "Evidence-based clinical decision support resource." },
  { name: "Medscape", url: "https://www.medscape.com/", description: "Medical news, drug information, and CME." },
  { name: "Cochrane Library", url: "https://www.cochranelibrary.com/", description: "Collection of databases in medicine and other healthcare specialties." },
];

export default function MedicalResourcesCard() {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Medical Resources</CardTitle>
        <BookMarked className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm mb-4">
          Quick links to essential medical databases and research tools.
        </CardDescription>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div key={resource.name} className="p-3 bg-secondary rounded-md ">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-primary">{resource.name}</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    Visit <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
