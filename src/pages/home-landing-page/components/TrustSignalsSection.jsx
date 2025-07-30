import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignalsSection = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const certifications = [
    {
      name: language === 'en' ? 'Gujarat Agriculture Department' : 'ગુજરાત કૃષિ વિભાગ',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      description: language === 'en' ? 'Certified Partner' : 'પ્રમાણિત ભાગીદાર'
    },
    {
      name: language === 'en' ? 'Revenue Department Gujarat' : 'મહેસૂલ વિભાગ ગુજરાત',
      logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      description: language === 'en' ? 'Authorized Platform' : 'અધિકૃત પ્લેટફોર્મ'
    },
    {
      name: language === 'en' ? 'Digital India Initiative' : 'ડિજિટલ ઇન્ડિયા પહેલ',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      description: language === 'en' ? 'Recognized Platform' : 'માન્યતા પ્રાપ્ત પ્લેટફોર્મ'
    },
    {
      name: language === 'en' ? 'ISO 27001 Certified' : 'ISO 27001 પ્રમાણિત',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      description: language === 'en' ? 'Data Security' : 'ડેટા સુરક્ષા'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: language === 'en' ? 'Ramesh Patel' : 'રમેશ પટેલ',
      location: language === 'en' ? 'Ahmedabad' : 'અમદાવાદ',
      role: language === 'en' ? 'Land Buyer' : 'જમીન ખરીદદાર',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      testimonial: language === 'en' 
        ? `Found the perfect agricultural land for my organic farming venture. The platform's verification process gave me complete confidence in the purchase.`
        : `મારા ઓર્ગેનિક ફાર્મિંગ વેન્ચર માટે સંપૂર્ણ કૃષિ જમીન મળી. પ્લેટફોર્મની ચકાસણી પ્રક્રિયાએ મને ખરીદીમાં સંપૂર્ણ વિશ્વાસ આપ્યો.`
    },
    {
      id: 2,
      name: language === 'en' ? 'Priya Shah' : 'પ્રિયા શાહ',
      location: language === 'en' ? 'Vadodara' : 'વડોદરા',
      role: language === 'en' ? 'Land Seller' : 'જમીન વેચનાર',avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      testimonial: language === 'en' ? `Sold my family's agricultural property within 2 weeks. The platform connected me with serious buyers and handled all documentation smoothly.`
        : `2 અઠવાડિયામાં મારા પરિવારની કૃષિ મિલકત વેચી દીધી. પ્લેટફોર્મે મને ગંભીર ખરીદદારો સાથે જોડ્યો અને બધા દસ્તાવેજો સરળતાથી હેન્ડલ કર્યા.`
    },
    {
      id: 3,
      name: language === 'en' ? 'Kiran Desai' : 'કિરણ દેસાઈ',
      location: language === 'en' ? 'Surat' : 'સુરત',
      role: language === 'en' ? 'Agricultural Investor' : 'કૃષિ રોકાણકાર',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      rating: 5,
      testimonial: language === 'en' 
        ? `Excellent platform for agricultural land investment. The detailed property information and location-based search made my decision easy.`
        : `કૃષિ જમીન રોકાણ માટે ઉત્તમ પ્લેટફોર્મ. વિગતવાર પ્રોપર્ટી માહિતી અને સ્થાન-આધારિત શોધે મારો નિર્ણય સરળ બનાવ્યો.`
    }
  ];

  const securityFeatures = [
    {
      icon: 'Shield',
      title: language === 'en' ? 'Secure Transactions' : 'સુરક્ષિત વ્યવહારો',
      description: language === 'en' ? 'End-to-end encrypted payment processing' : 'એન્ડ-ટુ-એન્ડ એન્ક્રિપ્ટેડ પેમેન્ટ પ્રોસેસિંગ'
    },
    {
      icon: 'FileCheck',
      title: language === 'en' ? 'Document Verification' : 'દસ્તાવેજ ચકાસણી',
      description: language === 'en' ? 'Legal document verification by experts' : 'નિષ્ણાતો દ્વારા કાનૂની દસ્તાવેજ ચકાસણી'
    },
    {
      icon: 'UserCheck',
      title: language === 'en' ? 'Identity Verification' : 'ઓળખ ચકાસણી',
      description: language === 'en' ? 'KYC verified users only' : 'માત્ર KYC ચકાસાયેલ વપરાશકર્તાઓ'
    },
    {
      icon: 'Lock',
      title: language === 'en' ? 'Data Protection' : 'ડેટા સુરક્ષા',
      description: language === 'en' ? 'GDPR compliant data handling' : 'GDPR અનુપાલન ડેટા હેન્ડલિંગ'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            {language === 'en' ? 'Trusted by Thousands' : 'હજારો લોકોનો વિશ્વાસ'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' ?'Our platform is certified by government authorities and trusted by agricultural communities across Gujarat' :'અમારું પ્લેટફોર્મ સરકારી સત્તાવાળાઓ દ્વારા પ્રમાણિત છે અને ગુજરાતભરના કૃષિ સમુદાયો દ્વારા વિશ્વસનીય છે'
            }
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-semibold text-center text-foreground mb-8">
            {language === 'en' ? 'Official Certifications' : 'સત્તાવાર પ્રમાણપત્રો'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center group">
                <div className="bg-card rounded-2xl p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-state mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-2">{cert.name}</h4>
                  <p className="text-xs text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-semibold text-center text-foreground mb-8">
            {language === 'en' ? 'Security & Trust' : 'સુરક્ષા અને વિશ્વાસ'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-card rounded-xl p-6 text-center shadow-elevation-1 hover:shadow-elevation-2 transition-state">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                  <Icon name={feature.icon} size={24} />
                </div>
                <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-heading font-semibold text-center text-foreground mb-8">
            {language === 'en' ? 'What Our Users Say' : 'અમારા વપરાશકર્તાઓ શું કહે છે'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card rounded-2xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-state">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.testimonial}"
                </p>

                {/* User Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;