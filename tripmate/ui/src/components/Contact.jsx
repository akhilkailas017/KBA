import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-800 text-white py-12 px-6 md:px-12">
      <div className="container mx-auto text-center">
        <p className="mb-6 text-lg">
          If you have any ride-related issues or doubts, please don't hesitate to contact us. Our support team is ready to assist you with any concerns you may have.
        </p>
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Contact Us</h3>
          <p className="text-base mb-2">
            Email: <a href="mailto:support@tripmate.com" className="text-blue-400 hover:underline">support@tripmate.com</a>
          </p>
          <p className="text-base">
            Phone: <a href="tel:+1234567890" className="text-blue-400 hover:underline">+123 456 7890</a>
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-3">Follow Us</h3>
          <ul className="flex flex-wrap justify-center gap-4">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Instagram</a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
