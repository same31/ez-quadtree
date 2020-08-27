function boxCollidesWithArea({x, y, width, height}, area) {
    return x + width >= area.x && x <= area.x + area.width && y + height >= area.y && y <= area.y + area.height;
}

class QuadTree {
    #area;
    #children = [];
    #isDivided = false;

    constructor (x, y, width, height) {
        this.#area = {
            x, y, width, height
        };
    }

    get area() {
        return this.#area;
    }

    toString() {
        return this.#children.map(child => child instanceof QuadTree ? child.toString() : JSON.stringify(child)).filter(s => s).join(', ');
    }

    add (element = {x: 0, y: 0, width: 0, height: 0}) {
        if (!this.#isDivided) {
            if (this.#children.length < 4) {
                this.#children.push(element);
                return;
            }

            // Divide into sub-quadtrees
            const { x, y, width, height } = this.#area;
            const subWidth = width / 2;
            const subHeight = height / 2;
            const subTrees = [
                new QuadTree(x, y, subWidth, subHeight),
                new QuadTree(x, y + subHeight, subWidth, subHeight),
                new QuadTree(x + subWidth, y, subWidth, subHeight),
                new QuadTree(x + subWidth, y + subHeight, subWidth, subHeight),
            ];

            // Re-assign elements into correct sub tree(s)
            this.#children.forEach(element => {
                subTrees.forEach(tree => {
                    const area = tree.area;
                    if (boxCollidesWithArea(element, area)) {
                        tree.add(element);
                    }
                });
            })

            this.#children = subTrees;
            this.#isDivided = true;
        }

        // Assign element into sub tree(s)
        this.#children.forEach(tree => {
            // Check if element intersects with tree area
            const area = tree.area;
            if (boxCollidesWithArea(element, area)) {
                tree.add(element);
            }
        })
    }

    collidingElements(element = {x: 0, y: 0, width: 0, height: 0}) {
        const collidingSet = new Set();
        this.#children.forEach(child => {
            // Check collision with child
            const childIsTree = child instanceof QuadTree;
            const area = childIsTree ? child.area : (({ x, y, width, height }) => ({ x, y, width, height }))(child);

            if (boxCollidesWithArea(element, area)) {
                if (childIsTree) {
                    child.collidingElements(element).forEach(element => {
                        collidingSet.add(element);
                    });
                } else {
                    collidingSet.add(child);
                }
            }
        });

        return Array.from(collidingSet);
    }
}

export default QuadTree;
