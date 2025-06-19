import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p>
        We value your privacy and are committed to protecting your personal information when you use our website and services.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Personal details like name, email, and contact information</li>
          <li>Usage data such as IP address, browser type, and pages visited</li>
          <li>Cookies and tracking technologies to enhance your experience</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To provide and improve our services</li>
          <li>To communicate important updates and offers</li>
          <li>To analyze site usage and enhance user experience</li>
          <li>To comply with legal requirements</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Sharing and Security</h2>
        <p>
          We do not sell your data. We may share information with trusted partners and as required by law. We implement security measures to protect your data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data. You can also opt out of certain uses or revoke consent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
        <p>
          Cookies help us personalize your experience and analyze traffic. You can manage cookie preferences in your browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
        <p>
          We may update this policy occasionally. Please review it regularly to stay informed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>
          For questions or concerns, contact us at <a href="mailto:support@yourwebsite.com" className="text-blue-600 underline">EcoTrack@gmail.com</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
