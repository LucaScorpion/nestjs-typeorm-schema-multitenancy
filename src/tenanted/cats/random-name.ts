const names = [
  'Whiskers',
  'Luna',
  'Shadow',
  'Mittens',
  'Simba',
  'Cleo',
  'Nibbles',
  'Tiger',
  'Ziggy',
  'Milo',
  'Gizmo',
  'Sasha',
  'Pumpkin',
  'Oreo',
  'Boots',
  'Pebbles',
  'Chester',
  'Smokey',
  'Tigger',
  'Oliver',
];

export function randomName(): string {
  return names[Math.floor(Math.random() * names.length)];
}
