import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  1. Introduction
                </h2>
                <p className="leading-relaxed">
                  Welcome to FileTools Pro. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we handle your information when you use our file conversion and editing tools.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  2. Data We Collect
                </h2>
                <p className="leading-relaxed mb-4">
                  We collect minimal data to provide and improve our services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Usage data: Pages visited, tools used, and general analytics</li>
                  <li>Device information: Browser type, operating system, and screen resolution</li>
                  <li>Cookies: For preferences and analytics (you can disable these in your browser)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  3. File Processing
                </h2>
                <p className="leading-relaxed mb-4">
                  Your privacy is our top priority when it comes to file processing:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All file conversions are processed locally in your browser when possible</li>
                  <li>We do not store, save, or have access to your uploaded files</li>
                  <li>Files are never transmitted to our servers unless explicitly required for a specific tool</li>
                  <li>Any temporary processing is immediately deleted after conversion</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  4. How We Use Your Data
                </h2>
                <p className="leading-relaxed mb-4">
                  We use collected data to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain our services</li>
                  <li>Improve user experience and tool functionality</li>
                  <li>Analyze usage patterns to develop new features</li>
                  <li>Communicate important updates or changes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  5. Third-Party Services
                </h2>
                <p className="leading-relaxed">
                  We may use third-party services for analytics and performance monitoring. These services 
                  have their own privacy policies and we encourage you to review them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  6. Your Rights
                </h2>
                <p className="leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the data we collect about you</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of cookies and tracking</li>
                  <li>Request clarification on our data practices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  7. Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement appropriate security measures to protect your data. However, no method of 
                  transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  8. Changes to This Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  9. Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about this privacy policy, please contact us at{' '}
                  <a href="mailto:privacy@filetools.pro" className="text-primary hover:underline">
                    privacy@filetools.pro
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
