// src/components/Contact.js
import React from 'react';

const Contact = () => {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Contact Me</h2>
      <div className="flex flex-col space-y-4">
        <p>Feel free to contact me via email:</p>
        <a href="haniyamumtaj09@gmail.com" className="text-blue-600 hover:underline">haniyamumtaj09@gmail.com</a>
      </div>
    </section>
  );
};

export default Contact;
