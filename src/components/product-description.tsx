import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProductDescription() {
  return (
    <section id="description" className="w-full py-12 md:py-24 lg:py-32 bg-muted flex flex-col align-center justify-center items-center ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Learn Programming Through Interactive Games
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines the engaging nature of video games with educational content 
              to make learning programming concepts enjoyable and effective.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Educational Gaming Approach</CardTitle>
              <CardDescription>
                Making complex programming concepts accessible through interactive challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our platform transforms traditional programming education by incorporating game mechanics 
                like levels, achievements, and challenges. Students learn fundamental programming concepts 
                such as loops, conditionals, functions, and object-oriented programming through 
                engaging game scenarios that gradually increase in complexity.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Teacher Dashboard</CardTitle>
              <CardDescription>
                Comprehensive monitoring tools for educators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Educators gain access to detailed dashboards showing student progress, 
                performance metrics, and areas where students may need additional support. 
                The platform provides real-time analytics on student engagement, 
                completed challenges, and skill mastery to help teachers customize instruction.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1. Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Students engage with educational games that introduce programming concepts 
                  in a fun, interactive environment. Each game level focuses on specific 
                  programming skills and concepts.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">2. Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Once introduced to concepts, students apply their knowledge by solving 
                  coding challenges within the game environment, receiving immediate feedback 
                  to reinforce learning.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">3. Master</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Students progress through increasingly complex challenges that build upon 
                  previous skills, while teachers monitor progress and provide guided support 
                  where needed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}