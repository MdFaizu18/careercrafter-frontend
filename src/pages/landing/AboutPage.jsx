import { Users, Briefcase, Award, Clock, Target, Shield } from 'lucide-react';
import image from '../../assets/images/about.png';
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              About CareerCrafter
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-700">
              We're on a mission to make job searching more human, personalized, and effective.
            </p>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-800">
                We help you <span className="text-purple-600">find the right job</span> with less
                stress
              </h2>
              <p className="mb-6 text-lg text-gray-600">
                CareerCrafter was built on a simple idea: job searching shouldn't be overwhelming.
                We believe that you deserve a job search experience that is human and personal,
                going beyond simple keyword searches.
              </p>
              <p className="text-lg text-gray-600">
                Our platform matches you with opportunities that align with your skills, values, and
                career goals—not just your resume keywords.
              </p>
            </div>
            <div className="p-16">
              <div className="flex aspect-video items-center justify-center rounded-xl">
                <img
                  src={image}
                  alt="CareerCrafter Platform"
                  className="h-auto max-w-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">How CareerCrafter Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our simple three-step process helps you find and land your dream job
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-8 shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                1
              </div>
              <h3 className="mb-4 text-xl font-bold text-purple-700">Update Your Profile</h3>
              <p className="text-gray-600">
                Fill the input fields about your situation and job preferences to help us understand
                your needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                2
              </div>
              <h3 className="mb-4 text-xl font-bold text-indigo-700">Get Matches</h3>
              <p className="text-gray-600">
                Browse personalized results based on our analysis of millions of jobs that match
                your profile.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-8 shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                3
              </div>
              <h3 className="mb-4 text-xl font-bold text-purple-700">Save Favorites</h3>
              <p className="text-gray-600">
                Save jobs to your personalized list and apply when you're ready, all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-purple-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Why Choose CareerCrafter</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our platform offers unique features designed to make your job search easier and more
              effective
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">Personalized Matching</h3>
              <p className="text-gray-600">
                Our App analyzes your skills and preferences to find jobs that truly match your
                career goals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-indigo-100 bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">Flexible Application</h3>
              <p className="text-gray-600">
                Save jobs now and apply later. No more browsing on your phone and losing track of
                opportunities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">Career Community</h3>
              <p className="text-gray-600">
                Connect with professionals in your field and get advice from people who've been
                there.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-indigo-100 bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Briefcase className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">Curated Job Lists</h3>
              <p className="text-gray-600">
                Create your own personalized job lists based on your specific criteria and
                preferences.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">Career Growth Tools</h3>
              <p className="text-gray-600">
                Access resources to help you upskill, prepare for interviews, and advance your
                career.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl border border-indigo-100 bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">Privacy First</h3>
              <p className="text-gray-600">
                Your data is secure and you control who sees your profile and application
                information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">What Our Users Say</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Join thousands of professionals who found their dream jobs with CareerCrafter
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-xl border border-purple-100 bg-white p-8 shadow-xl md:p-10">
            <div className="mb-6">
              <p className="text-lg text-gray-700 italic">
                "CareerCrafter helped me land my dream job within weeks. The platform is intuitive,
                fast, and full of relevant opportunities. I've recommended it to all my friends!"
              </p>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="User"
                className="h-14 w-14 rounded-full border-4 border-purple-200 object-cover"
              />
              <div>
                <p className="font-bold text-purple-700">Aisha Khan</p>
                <p className="text-sm text-gray-500">Software Engineer @ Google</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 px-4 py-16 text-white md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to find your dream job?</h2>
          <p className="mb-8 text-xl opacity-90">
            Join thousands of professionals who are discovering new opportunities every day
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-white px-8 py-3 font-bold text-purple-700 shadow-lg transition-colors hover:bg-purple-50">
              Get Started Now
            </button>
            <button className="rounded-full border-2 border-white bg-transparent px-8 py-3 font-bold transition-colors hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Team/Company Section */}
      {/* <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're a team of career experts, technologists, and job seekers who believe that finding the right job
              should be easier, more personal, and actually enjoyable.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 md:p-12 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
                <p className="text-gray-700 mb-4">
                  CareerCrafter was founded in 2023 by a group of professionals who were frustrated with the traditional
                  job search process. We saw how dehumanizing and inefficient it could be, and we knew there had to be a
                  better way.
                </p>
                <p className="text-gray-700">
                  Today, we're proud to have helped thousands of job seekers find positions that truly match their
                  skills, values, and career aspirations. We're constantly innovating and improving our platform to make
                  job searching less stressful and more successful.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-purple-200 rounded-xl"></div>
                  <div className="absolute -bottom-4 -right-4 w-full h-full bg-indigo-200 rounded-xl"></div>
                  <div className="relative bg-white p-4 rounded-xl shadow-lg">
                    <img src="/placeholder.svg?height=250&width=400" alt="Our Team" className="rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
