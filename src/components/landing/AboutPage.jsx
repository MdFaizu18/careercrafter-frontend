import { Users, Briefcase, Award, Clock, Target, Shield } from 'lucide-react';
import image from '../../assets/images/about.png';
import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* How It Works Section */}
        <section className="bg-white px-4 py-16 md:px-8" id="about">
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
                  Fill the input fields about your situation and job preferences to help us
                  understand your needs.
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
        <section
          id="features"
          className="bg-gradient-to-b from-white to-purple-50 px-4 py-16 md:px-8"
        >
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
      </div>
    </div>
  );
}
