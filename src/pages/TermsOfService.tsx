import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing and using FileTools Pro, you accept and agree to be bound by the terms and 
                  provisions of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  2. Use of Services
                </h2>
                <p className="leading-relaxed mb-4">
                  Our services are provided for lawful purposes only. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use our tools for legal file conversion and editing purposes</li>
                  <li>Not attempt to bypass any security features or limitations</li>
                  <li>Not use our services to process illegal, harmful, or copyrighted content without permission</li>
                  <li>Not attempt to overload or disrupt our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  3. Intellectual Property
                </h2>
                <p className="leading-relaxed">
                  All content on FileTools Pro, including but not limited to text, graphics, logos, and software, 
                  is the property of FileTools Pro and is protected by copyright and intellectual property laws. 
                  You retain all rights to the files you upload and process through our tools.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  4. Service Availability
                </h2>
                <p className="leading-relaxed mb-4">
                  We strive to maintain high availability of our services, but we do not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Uninterrupted access to our tools</li>
                  <li>Error-free operation at all times</li>
                  <li>That our services will meet all your specific requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  5. Limitation of Liability
                </h2>
                <p className="leading-relaxed">
                  FileTools Pro and its affiliates shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages resulting from your use or inability to use our services. 
                  This includes, but is not limited to, any loss of data or file corruption.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  6. User Responsibilities
                </h2>
                <p className="leading-relaxed mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintaining backups of your original files</li>
                  <li>Ensuring you have the right to convert or edit uploaded files</li>
                  <li>Verifying the output quality meets your requirements</li>
                  <li>Complying with all applicable laws when using our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  7. Privacy and Data Protection
                </h2>
                <p className="leading-relaxed">
                  Your use of our services is also governed by our Privacy Policy. We process files locally 
                  in your browser whenever possible and do not store your files on our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  8. Modifications to Service
                </h2>
                <p className="leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any 
                  time without prior notice. We may also update these terms from time to time, and your continued 
                  use constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  9. Third-Party Links
                </h2>
                <p className="leading-relaxed">
                  Our services may contain links to third-party websites. We are not responsible for the content, 
                  privacy policies, or practices of any third-party sites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  10. Termination
                </h2>
                <p className="leading-relaxed">
                  We reserve the right to terminate or suspend access to our services immediately, without prior 
                  notice, for any violation of these terms or for any other reason we deem appropriate.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  11. Governing Law
                </h2>
                <p className="leading-relaxed">
                  These terms shall be governed by and construed in accordance with applicable laws, without 
                  regard to conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  12. Contact Information
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:legal@filetools.pro" className="text-primary hover:underline">
                    legal@filetools.pro
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

export default TermsOfService;
