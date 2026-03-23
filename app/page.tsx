'use client';

import { useState } from 'react';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';

interface BusinessInfo {
  businessName: string;
  email: string;
  address: string;
  phone: string;
}

interface Branding {
  primaryColor: string;
  secondaryColor: string;
  accentColor1: string;
  accentColor2: string;
  logoUrl: string;
}

interface Language {
  language: string;
}

interface AboutUs {
  aboutUs: string;
  vision: string;
  mission: string;
}

interface ProductsServices {
  productsServices: string[];
}

interface ProductImages {
  productImages: string[];
}

interface AboutUsImages {
  aboutUsImages: string[];
}

interface SocialMedia {
  socialMediaLinks: { [key: string]: string };
}

const businessInfo: BusinessInfo = {
  businessName: '{{ $json["Business Name"] }}',
  email: '{{ $json["Business Email"] }}',
  address: '{{ $json["Business Address"] }}',
  phone: '{{ $json["Business Phone"] }}',
};

const branding: Branding = {
  primaryColor: '{{ $json["Primary Color"] || "#3b82f6" }}',
  secondaryColor: '{{ $json["Secondary Color"] || "#1e293b" }}',
  accentColor1: '{{ $json["Accent Color 1"] || "#10b981" }}',
  accentColor2: '{{ $json["Accent Color 2"] || "#f59e0b" }}',
  logoUrl: '{{ $json["Logo URL"] }}',
};

const language: Language = {
  language: '{{ $json["Language"] }}',
};

const aboutUs: AboutUs = {
  aboutUs: '{{ $json["About Us & Vision Mission"] }}',
  vision: '{{ $json["About Us & Vision Mission"].split("Vision:")[1].split("Mission:")[0] }}',
  mission: '{{ $json["About Us & Vision Mission"].split("Mission:")[1] }}',
};

const productsServices: ProductsServices = {
  productsServices: '{{ $json["Products/Services"] }}'.split(','),
};

const productImages: ProductImages = {
  productImages: '{{ $json["Product Images (URLs)"] }}'.split(','),
};

const aboutUsImages: AboutUsImages = {
  aboutUsImages: '{{ $json["About Us Images (URLs)"] }}'.split(','),
};

const socialMedia: SocialMedia = {
  socialMediaLinks: {
    twitter: '{{ $json["Social Media Links"].twitter }}',
    instagram: '{{ $json["Social Media Links"].instagram }}',
    facebook: '{{ $json["Social Media Links"].facebook }}',
  },
};

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(name, email, message);
};

const getLanguageText = (text: string) => {
  if (language.language === 'Bahasa Malaysia') {
    return text;
  } else if (language.language === 'English') {
    return text;
  } else {
    return text;
  }
};

export default function Home() {
  return (
    <div className="max-w-full overflow-hidden">
      {/* Navbar */}
      <nav className={`bg-${branding.primaryColor} sticky top-0 z-10`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="logo">
            <Image src={branding.logoUrl} alt={businessInfo.businessName} width={50} height={50} />
          </div>
          <ul className="nav-links flex items-center">
            <li>
              <a href="#hero" className="text-white hover:text-gray-200">
                {getLanguageText('Home')}
              </a>
            </li>
            <li>
              <a href="#about-us" className="text-white hover:text-gray-200">
                {getLanguageText('About Us')}
              </a>
            </li>
            <li>
              <a href="#products-services" className="text-white hover:text-gray-200">
                {getLanguageText('Products/Services')}
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white hover:text-gray-200">
                {getLanguageText('Contact')}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className={`bg-gradient-to-r from-${branding.primaryColor} to-${branding.secondaryColor} h-screen`}>
        <div className="container mx-auto px-4 py-2 flex justify-center items-center text-white text-center">
          <h1 className="text-5xl">{businessInfo.businessName}</h1>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="bg-white py-20">
        <div className="container mx-auto px-4 py-2">
          <h2 className="text-3xl text-center mb-10">{getLanguageText('About Us')}</h2>
          <div className="about-us-content flex flex-col items-center">
            <div className="about-us-text text-lg text-center mb-10">
              {aboutUs.aboutUs}
            </div>
            <div className="vision-mission flex flex-col items-center">
              <h3 className="text-2xl mb-5">{getLanguageText('Vision')}</h3>
              <p className="text-lg text-center">{aboutUs.vision}</p>
              <h3 className="text-2xl mt-10 mb-5">{getLanguageText('Mission')}</h3>
              <p className="text-lg text-center">{aboutUs.mission}</p>
            </div>
            {aboutUsImages.aboutUsImages.map((image, index) => (
              <Image key={index} src={image} alt="About Us Image" width={500} height={300} />
            ))}
          </div>
        </div>
      </section>

      {/* Products/Services Section */}
      <section id="products-services" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 py-2">
          <h2 className="text-3xl text-center mb-10">{getLanguageText('Products/Services')}</h2>
          <div className="products-services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {productsServices.productsServices.map((product, index) => (
              <div key={index} className="product-card bg-white p-10 shadow-md">
                <h3 className="text-2xl mb-5">{product}</h3>
                {productImages.productImages.map((image, index) => (
                  <Image key={index} src={image} alt="Product Image" width={200} height={150} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-20">
        <div className="container mx-auto px-4 py-2">
          <h2 className="text-3xl text-center mb-10">{getLanguageText('Contact')}</h2>
          <div className="contact-content flex flex-col items-center">
            <form onSubmit={handleSubmit} className="contact-form flex flex-col items-center">
              <input
                type="text"
                placeholder={getLanguageText('Name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field mb-5"
              />
              <input
                type="email"
                placeholder={getLanguageText('Email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field mb-5"
              />
              <textarea
                placeholder={getLanguageText('Message')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field mb-5"
              />
              <button type="submit" className={`bg-${branding.primaryColor} text-white py-2 px-5`}>
                {getLanguageText('Send')}
              </button>
            </form>
            <div className="contact-info mt-10">
              <p>
                {getLanguageText('Address')}: {businessInfo.address}
              </p>
              <p>
                {getLanguageText('Email')}: {businessInfo.email}
              </p>
              <p>
                {getLanguageText('Phone')}: {businessInfo.phone}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={`bg-${branding.primaryColor} py-10`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="social-links flex items-center">
            <a href={socialMedia.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter size={24} color="white" />
            </a>
            <a href={socialMedia.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram size={24} color="white" />
            </a>
            <a href={socialMedia.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
              <Facebook size={24} color="white" />
            </a>
          </div>
          <p className="text-white">
            {getLanguageText('Copyright')} {new Date().getFullYear()} {businessInfo.businessName}. {getLanguageText('All Rights Reserved')}.
          </p>
        </div>
      </footer>
    </div>
  );
}