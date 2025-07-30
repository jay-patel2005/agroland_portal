import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyImageGallery = ({ images, propertyName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-elevation-2">
      {/* Main Image Display */}
      <div className="relative aspect-video bg-muted">
        <Image
          src={images[currentImageIndex]}
          alt={`${propertyName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-caption">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Fullscreen Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-10 h-10"
        >
          <Icon name="Maximize2" size={20} />
        </Button>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="p-4">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => selectImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-micro ${
                  index === currentImageIndex
                    ? 'border-primary' :'border-border hover:border-primary/50'
                }`}
              >
                <Image
                  src={image}
                  alt={`${propertyName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            <Image
              src={images[currentImageIndex]}
              alt={`${propertyName} - Fullscreen`}
              className="max-w-full max-h-full object-contain"
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-12 h-12"
            >
              <Icon name="X" size={24} />
            </Button>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12"
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12"
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;