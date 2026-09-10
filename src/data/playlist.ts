import track1 from '../assets/music/ae-nazneen-suno-na.mp3'
import track2 from '../assets/music/main-duniya-bhula-doonga.mp3'
import track3 from '../assets/music/bas-ek-sanam-chahiye.mp3'
import type { Track } from '../types/music'

export const playlist: Track[] = [
  {
    id: '1',
    title: 'Ae Nazneen Suno Na',
    artist: 'Abhijeet · A.R. Rahman',
    src: track1,
  },
  {
    id: '2',
    title: 'Main Duniya Bhula Doonga',
    artist: 'Kumar Sanu · Anuradha Paudwal',
    src: track2,
  },
  {
    id: '3',
    title: 'Bas Ek Sanam Chahiye',
    artist: 'Kumar Sanu · Aashiqui',
    src: track3,
  },
]
