import React, { useEffect, useState } from 'react';

const agents = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Real Estate Agent',
    phone: '(123) 456-7890',
    email: 'sarah@realestate.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    description: 'Specializing in luxury properties with over 10 years of experience in the New York market.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Commercial Real Estate Specialist',
    phone: '(123) 456-7891',
    email: 'michael@realestate.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    description: 'Expert in commercial properties and investment opportunities with a proven track record.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'First-Time Homebuyer Consultant',
    phone: '(123) 456-7892',
    email: 'emily@realestate.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    description: 'Dedicated to helping first-time buyers navigate the home purchasing process with ease.'
  }
];


const Agents = () => {



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Our Agents</h2>
        <p className="mt-4 text-lg text-gray-600">
          Meet our team of dedicated real estate professionals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover" src={agent.image} alt={agent.name} />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
              <p className="text-black">{agent.title}</p>
              <p className="mt-4 text-gray-600">{agent.description}</p>
              <div className="mt-6">
                <div className="flex items-center text-gray-500">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {agent.phone}
                </div>
                <div className="flex items-center text-gray-500 mt-2">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {agent.email}
                </div>
              </div>
              <button className="mt-6 w-full bg-gray-950 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition duration-300">
                Contact Agent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;