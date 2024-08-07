import React from 'react';

const Contact = () => {
  return (
    <div className=" mx-auto p-6 text-center bg-gray-800 text-white">
      <p className="mb-4">
        If you have any ride-related issues or doubts, please don't hesitate to contact us. Our support team is ready to assist you with any concerns you may have.
      </p>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
        <p>Email: <a href="mailto:support@tripmate.com" >support@tripmate.com</a></p>
        <p>Phone: <a href="tel:+1234567890" >+123 456 7890</a></p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
        <div className=''>
        <ul className="flex justify-between mx-96">
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" >Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
