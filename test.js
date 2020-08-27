import QuadTree from './index.js';

const qt = new QuadTree(0, 0, 800, 600);

qt.add({x: 29, y: 33, width: 56, height: 56, name: 'A'});
qt.add({x: 29, y: 33, width: 56, height: 56, name: 'A2'});
qt.add({x: 290, y: 330, width: 56, height: 56, name: 'B'});
qt.add({x: 790, y: 533, width: 56, height: 56, name: 'C'});
qt.add({x: 33, y: 36, width: 56, height: 56, name: 'D'});
qt.add({x: 420, y: 420, width: 56, height: 56, name: 'E'});
qt.add({x: 560, y: 360, width: 56, height: 56, name: 'F'});
qt.add({x: 320, y: 480, width: 56, height: 56, name: 'G'});
qt.add({x: 380, y: 280, width: 40, height: 40, name: 'H'});

console.log('1.', qt.toString());

console.log('1.1.', JSON.stringify(qt.elements));

console.log('2.', qt.collidingElements({x: 29, y: 33, width: 56, height: 56}));

console.log('3.', qt.collidingElements({x: 385, y: 285, width: 30, height: 5}));
