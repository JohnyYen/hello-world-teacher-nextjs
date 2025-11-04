import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Adaptive Learning Path",
      description: "The platform adjusts difficulty based on student performance and learning pace.",
      badge: "Adaptive"
    },
    {
      title: "Engaging Narrative",
      description: "Immersive storylines that make programming concepts relatable and memorable.",
      badge: "Engaging"
    },
    {
      title: "Personalized Feedback",
      description: "Real-time, customized feedback tailored to each student's learning style.",
      badge: "Personalized"
    },
    {
      title: "Teacher Supervision",
      description: "Comprehensive dashboards for educators to monitor student progress.",
      badge: "Supervised"
    },
    {
      title: "Interactive Challenges",
      description: "Game-based exercises that teach programming concepts through play.",
      badge: "Interactive"
    },
    {
      title: "Progress Tracking",
      description: "Detailed analytics showing skill development and learning milestones.",
      badge: "Tracked"
    }
  ];

  const benefits = [
    "Personalized learning experience",
    "Increased student engagement",
    "Immediate feedback on performance",
    "Teacher oversight and insights",
    "Gamified learning environment"
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 flex flex-col align-center justify-center items-center ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Educational Gaming Features
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Innovative tools designed to make programming education engaging and effective
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>{feature.title}</CardTitle>
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-12">
            Why Choose Our Platform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>For Students</CardTitle>
                <CardDescription>Engaging programming education through games</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Interactive programming challenges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Personalized learning paths</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Engaging narrative-based lessons</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Teachers</CardTitle>
                <CardDescription>Monitor and guide student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real-time progress dashboards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Performance analytics and insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Customizable learning assignments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}