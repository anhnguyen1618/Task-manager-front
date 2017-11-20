

export const generateRandomImage = () => {
  const images = [
    'http://i0.kym-cdn.com/entries/icons/medium/000/005/180/YaoMingMeme.jpg',
    'https://i.pinimg.com/736x/63/07/16/630716317bb90363142d1cbfdc4d94f8--trump-jokes-debate-meme.jpg',
    'http://i0.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg',
    'https://imgflip.com/s/meme/Face-You-Make-Robert-Downey-Jr.jpg'
  ]

  const index = Math.round(Math.random() * (images.length -1 ))

  return images[index]
}