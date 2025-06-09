'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Search,
  Send,
} from 'lucide-react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    priority: '',
    subject: '',
    description: '',
    attachments: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer:
        "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll send you a reset link via email.",
    },
    {
      question: 'Why am I not receiving job matches?',
      answer:
        'Make sure your profile is complete and your job preferences are set. Our AI needs this information to find relevant matches for you.',
    },
    {
      question: 'How do I delete my account?',
      answer:
        'You can delete your account from Settings > Account > Delete Account. Please note this action is irreversible.',
    },
    {
      question: 'Can I change my email address?',
      answer:
        "Yes, you can update your email address in Settings > Profile. You'll need to verify the new email address.",
    },
    {
      question: 'How does the job matching algorithm work?',
      answer:
        'Our AI analyzes your skills, experience, preferences, and behavior to match you with relevant job opportunities from our database.',
    },
  ];

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Ticket Submitted!</h2>
          <p className="mb-6 text-gray-600">
            We've received your support request. Our team will get back to you within 24 hours.
          </p>
          <p className="mb-6 text-sm text-gray-500">
            Ticket ID:{' '}
            <span className="font-mono font-bold">
              #CC-{Math.random().toString(36).substr(2, 8).toUpperCase()}
            </span>
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                category: '',
                priority: '',
                subject: '',
                description: '',
                attachments: null,
              });
            }}
            className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
          >
            Submit Another Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-4 text-4xl font-bold">How can we help you?</h1>
          <p className="mb-8 text-xl opacity-90">
            Get support for your CareerCrafter account and find answers to common questions
          </p>

          {/* Search Bar */}
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full rounded-lg py-3 pr-4 pl-12 text-gray-800 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Support Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Submit a Support Ticket</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Category and Priority */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      <option value="">Select a category</option>
                      <option value="account">Account Issues</option>
                      <option value="technical">Technical Problems</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="jobs">Job Matching</option>
                      <option value="profile">Profile & Settings</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Priority *
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      <option value="">Select priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Brief description of your issue"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Please provide detailed information about your issue..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Attachments (Optional)
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-purple-400">
                    <input
                      type="file"
                      name="attachments"
                      multiple
                      className="hidden"
                      id="file-upload"
                      onChange={e =>
                        setFormData(prev => ({ ...prev, attachments: e.target.files }))
                      }
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-gray-500">
                        <p className="text-sm">Click to upload files or drag and drop</p>
                        <p className="mt-1 text-xs">PNG, JPG, PDF up to 10MB</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:from-purple-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Ticket
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-gray-800">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email Support</p>
                    <p className="text-sm text-gray-600">support@careercrafter.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <Phone className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone Support</p>
                    <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 9 AM - 6 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Times */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-gray-800">Response Times</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Urgent</span>
                  </div>
                  <span className="text-sm text-gray-600">2-4 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <span className="text-sm text-gray-600">4-8 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <span className="text-sm text-gray-600">1-2 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Low</span>
                  </div>
                  <span className="text-sm text-gray-600">2-3 days</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-gray-800">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Account Settings
                </a>
                <a
                  href="#"
                  className="block text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  User Guide
                </a>
                <a
                  href="#"
                  className="block text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  System Status
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
              <HelpCircle className="h-6 w-6 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group rounded-lg border border-gray-200">
                  <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50">
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <span className="text-gray-400 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
