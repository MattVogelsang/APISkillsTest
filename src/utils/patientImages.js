export function getPatientImage(patient, index = 0) {
  const name = (patient.name || '').toLowerCase();
  
  if (name.includes('jessica') && name.includes('taylor')) {
    return { src: '/images/JT2@2x.png', srcSet: '/images/JT.png 1x, /images/JT2@2x.png 2x' };
  }
  if (name.includes('emily')) {
    return { src: '/images/Layer 8@2x.png', srcSet: '/images/Layer 8.png 1x, /images/Layer 8@2x.png 2x' };
  }
  if (name.includes('ryan') && name.includes('johnson')) {
    return { src: '/images/Layer 1@2x.png', srcSet: '/images/Layer 1.png 1x, /images/Layer 1@2x.png 2x' };
  }
  if (name.includes('brandon') && name.includes('mitchell')) {
    return { src: '/images/Layer 3@2x.png', srcSet: '/images/Layer 3.png 1x, /images/Layer 3@2x.png 2x' };
  }
  if (name.includes('samantha') && name.includes('johnson')) {
    return { src: '/images/Layer 6@2x.png', srcSet: '/images/Layer 6.png 1x, /images/Layer 6@2x.png 2x' };
  }
  if (name.includes('ashley') && name.includes('martinez')) {
    return { src: '/images/Layer 12@2x.png', srcSet: '/images/Layer 12.png 1x, /images/Layer 12@2x.png 2x' };
  }
  if (name.includes('olivia') && name.includes('brown')) {
    return { src: '/images/Layer 10@2x.png', srcSet: '/images/Layer 10.png 1x, /images/Layer 10@2x.png 2x' };
  }
  if (name.includes('tyler') && name.includes('davis')) {
    return { src: '/images/Layer 9@2x.png', srcSet: '/images/Layer 9.png 1x, /images/Layer 9@2x.png 2x' };
  }
  if (name.includes('dylan') && name.includes('thompson')) {
    return { src: '/images/Layer 5@2x.png', srcSet: '/images/Layer 5.png 1x, /images/Layer 5@2x.png 2x' };
  }
  if (name.includes('nathan')) {
    return { src: '/images/Layer 7@2x.png', srcSet: '/images/Layer 7.png 1x, /images/Layer 7@2x.png 2x' };
  }
  if (name.includes('mike') && name.includes('nolan')) {
    return { src: '/images/pexels-photo-1222271@2x.png', srcSet: '/images/pexels-photo-1222271.png 1x, /images/pexels-photo-1222271@2x.png 2x' };
  }
  
  const fallbackImages = [
    { src: '/images/Layer 4@2x.png', srcSet: '/images/Layer 4.png 1x, /images/Layer 4@2x.png 2x' },
    { src: '/images/Layer 5@2x.png', srcSet: '/images/Layer 5.png 1x, /images/Layer 5@2x.png 2x' },
    { src: '/images/JT2@2x.png', srcSet: '/images/JT.png 1x, /images/JT2@2x.png 2x' },
    { src: '/images/Layer 7@2x.png', srcSet: '/images/Layer 7.png 1x, /images/Layer 7@2x.png 2x' },
    { src: '/images/Layer 9@2x.png', srcSet: '/images/Layer 9.png 1x, /images/Layer 9@2x.png 2x' },
    { src: '/images/Layer 10@2x.png', srcSet: '/images/Layer 10.png 1x, /images/Layer 10@2x.png 2x' },
    { src: '/images/pexels-photo-1222271@2x.png', srcSet: '/images/pexels-photo-1222271.png 1x, /images/pexels-photo-1222271@2x.png 2x' }
  ];
  return fallbackImages[index % fallbackImages.length];
}

