import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiry_type: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'property', label: 'Property Inquiry' },
    { value: 'selling', label: 'Want to Sell' },
    { value: 'buying', label: 'Want to Buy' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'partnership', label: 'Business Partnership' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiry_type: 'general'
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 shadow-elevation-1">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-foreground mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <Button onClick={() => setSuccess(false)} variant="outline">
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-elevation-1">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
          Send Us a Message
        </h2>
        <p className="text-muted-foreground">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Phone and Inquiry Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Inquiry Type
            </label>
            <select
              name="inquiry_type"
              value={formData.inquiry_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              {inquiryTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject */}
        <Input
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Enter message subject"
          required
        />

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Tell us how we can help you..."
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Icon name="Loader2" size={20} className="animate-spin mr-2" />
              Sending Message...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Icon name="Send" size={20} className="mr-2" />
              Send Message
            </div>
          )}
        </Button>
      </form>

      {/* Additional Help */}
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          Need immediate assistance? Call us at{' '}
          <a href="tel:+919876543210" className="text-primary hover:underline">
            +91 98765 43210
          </a>
          {' '}or email{' '}
          <a href="mailto:support@agrolandportal.com" className="text-primary hover:underline">
            support@agrolandportal.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactForm;