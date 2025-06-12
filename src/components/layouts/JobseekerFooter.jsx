const JobseekerFooter = () => {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-gray-50/50 py-6">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <div className="text-sm font-medium text-gray-500">
            © {new Date().getFullYear()} CareerCrafter. All rights reserved.
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <a
              href="/jobseeker/support"
              className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-purple-600"
            >
              Support
            </a>

            <a
              href="/contact"
              className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-purple-600"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default JobseekerFooter;
