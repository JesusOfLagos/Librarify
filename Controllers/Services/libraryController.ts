
class CustomNode {
    public readonly value: number;
    public next: CustomNode | null = null;

    constructor(value: number) {
        this.value = value;
    }
}

class LinkedList {
    private head: CustomNode | null = null;

    add(value: number): void {
        const newNode = new CustomNode(value);


        if(this.head === null) {
            this.head = newNode;
            return;
        }

        let currentNode = this.head;
        while(currentNode.next != null){
            currentNode = currentNode.next
        }

        currentNode.next = newNode
    }


    addNewHead(value: number): void {
        const newNode = new CustomNode(value);

        newNode.next = this.head
        this.head = newNode
    }
}



function main() {
    const list = new LinkedList();

    list.add(10);
    list.add(20);
    list.add(30);
    list.add(40);
    list.addNewHead(70)

    console.log(list)
}


main()
