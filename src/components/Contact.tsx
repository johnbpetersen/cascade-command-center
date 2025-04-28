
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-cascade-blue text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="opacity-0 animate-slide-up [animation-delay:0.2s] [animation-fill-mode:forwards] [animation-play-state:paused]">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Ready to Transform Your Leadership?</h2>
            <p className="text-white/80 text-lg mb-8">
              Take the first step toward elevating your leadership capabilities and creating positive change throughout your organization.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:contact@trophic-cascade.com" className="hover:text-white/80 transition-colors">contact@trophic-cascade.com</a>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:+18005551234" className="hover:text-white/80 transition-colors">+1 (800) 555-1234</a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg opacity-0 animate-slide-up [animation-delay:0.4s] [animation-fill-mode:forwards] [animation-play-state:paused]">
            <h3 className="font-serif text-cascade-gray-dark text-2xl mb-6">Request a Consultation</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-cascade-gray mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full px-4 py-2 border border-cascade-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-cascade-blue"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-cascade-gray mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full px-4 py-2 border border-cascade-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-cascade-blue"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cascade-gray mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-cascade-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-cascade-blue"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-cascade-gray mb-1">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full px-4 py-2 border border-cascade-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-cascade-blue"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-cascade-gray mb-1">Your Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-2 border border-cascade-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-cascade-blue"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="bg-cascade-blue text-white w-full py-3 rounded-md hover:bg-cascade-blue-light transition-colors focus:outline-none focus:ring-2 focus:ring-cascade-blue focus:ring-offset-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
